import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import FullBtn from "../common/FullBtn";
import Parent from "../common/Parent";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../../store/common/selectors";
import AxiosHeader from "../../apis/axios/AxiosHeader";
import { baseUrl } from "../../apis/url/baseUrl";

interface Props {
  onNext: (parentUserId: number, parentUserName: string) => void;
}

type ParentData = {
  relationshipId: number;
  userId: number;
  userName: string;
  createdAt: string;
};

const ParentSelectForm: React.FC<Props> = ({ onNext }) => {
  const token = useRecoilValue(userToken);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [selectedParentName, setSelectedParentName] = useState<string | null>(
    null
  );

  const [parentsData, setParentsData] = useState<ParentData[]>([]);

  useEffect(() => {
    axios
      .get(baseUrl + `api/relationship`, AxiosHeader({ token }))
      .then((response) => {
        if (response.data.data && response.data.data.relationList) {
          setParentsData(response.data.data.relationList);
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [token]);

  const handleParentClick = (id: number, name: string) => {
    if (selectedParentId === id) {
      setSelectedParentId(null);
      setSelectedParentName(null);
    } else {
      setSelectedParentId(id);
      setSelectedParentName(name);
    }
  };

  return (
    <div className="flex flex-col h-screen pb-60">
      <Header pageTitle="용돈 조르기" headerType="normal" headerLink="/" />

      <div className="m-10 text-center flex-grow">
        <div className="text-l mt-24 mb-28">부모님을 선택해주세요.</div>

        <div className="m-5 flex flex-wrap justify-center">
          {parentsData.map((parent) => (
            <Parent
              key={parent.relationshipId}
              is_connect={true}
              isSelected={selectedParentId === parent.userId}
              pname={parent.userName}
              className="w-36 mr-6 mb-6"
              onClick={() => handleParentClick(parent.userId, parent.userName)}
            />
          ))}
        </div>
      </div>
      <FullBtn
        buttonText="다음"
        onClick={() => onNext(selectedParentId!, selectedParentName!)}
        isDone={selectedParentId !== null}
      />
    </div>
  );
};

export default ParentSelectForm;
