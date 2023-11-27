import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../apis/url/baseUrl";
import AxiosHeader from "../../apis/axios/AxiosHeader";
import { userToken } from "../../store/common/selectors";
import { useRecoilValue } from "recoil";
import Kid from "../common/Kid";

interface APIResult<T> {
  code: number;
  error: string;
  data: T;
}

export interface RelationType {
  relationshipId: number;
  userId: number;
  userName: string;
  createdAt: Date;
}

interface RelationResult {
  relationList: Array<RelationType>;
}

interface Props {
  onClick?: (child: RelationType) => void; //해당 자녀를 클릭했을때 어떤 이벤트를 할 것인지 정의
}

const Kids = ({ onClick }: Props) => {
  const token = useRecoilValue(userToken);
  const [childs, setChilds] = useState<Array<RelationType>>([]);
  const [selectedChildUserId, setSelectedChildUserId] = useState<number>(0);

  const onClickChild = (child: RelationType) => {
    setSelectedChildUserId(child.userId);
    onClick ? onClick(child) : null;
  };

  useEffect(() => {
    //아이 목록 불러오기
    (async () => {
      const result = await axios.get<APIResult<RelationResult>>(
        baseUrl + "api/relationship",
        AxiosHeader({ token })
      );

      const { code, data } = result.data;

      if (code === 200) {
        //제대로 불러왔으면
        setChilds(data.relationList);
      }
    })();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {childs.map((child) => {
        return (
          <Kid
            key={child.relationshipId}
            className=""
            is_connect={true}
            kname={child.userName}
            isSelected={selectedChildUserId === child.userId}
            onClick={() => onClickChild(child)}
          />
        );
      })}
      {
        !childs.length && <div className="text-center text-m text-main my-10">
          연결된 사람이 없습니다
        </div> 
      }
    </div>
  );
};

export default Kids;
