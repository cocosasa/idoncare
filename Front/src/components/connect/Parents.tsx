import React, { useState, useEffect } from "react";
import Parent from "../../components/common/Parent";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../../store/common/selectors";
import AxiosHeader from "../../apis/axios/AxiosHeader";
import { baseUrl } from "../../apis/url/baseUrl";

interface Relation {
  relationshipId: number;
  userId: number;
  userName: string;
  createdAt: Date;
}

interface Props {
  onParentSelected?: (selected: boolean) => void;
  onSelectedParentChange?: (parentName: string | null) => void;
}

const Parents: React.FC<Props> = ({
  onParentSelected,
  onSelectedParentChange,
}) => {
  const token = useRecoilValue(userToken);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [relationList, setRelationList] = useState<Relation[] | null>(null);

  const handleParentClick = (parentName: string) => {
    setSelectedParent(parentName);
    if (onSelectedParentChange) {
      onSelectedParentChange(parentName);
    }
    if (onParentSelected) {
      onParentSelected(true);
    }
  };

  useEffect(() => {
    axios
      .get(baseUrl + `api/relationship`, AxiosHeader({ token }))
      .then((response) => {
        setRelationList(response.data.relationList);

        if (onParentSelected) {
          onParentSelected(
            response.data.relationList && response.data.relationList.length > 0
          );
        }
      })
      .catch((error) => console.error("Error:", error));

    if (onSelectedParentChange && selectedParent === null) {
      onSelectedParentChange(null);
      if (onParentSelected) {
        onParentSelected(true);
      }
    }
  }, [selectedParent, onSelectedParentChange, onParentSelected, token]);

  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex">
        {relationList ? (
          relationList.length > 0 ? (
            relationList.map((relation) => (
              <Parent
                key={relation.relationshipId}
                is_connect={true}
                pname={relation.userName}
                onClick={() => handleParentClick(relation.userName)}
                isSelected={selectedParent === relation.userName}
              />
            ))
          ) : (
            <div>관계 없음</div>
          )
        ) : (
          <div className="text-m text-darkgray mt-72 ml-20">
            연결된 보호자가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default Parents;
