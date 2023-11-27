import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import defaultImg from "/icons/circle-pink.png";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedChildId } from "../../store/mission/atoms";
import { userToken } from "../../store/common/selectors";
import AxiosHeader from "../../apis/axios/AxiosHeader";
import { baseUrl } from "../../apis/url/baseUrl";

interface Child {
  relationshipId: number;
  userId: number;
  userName: string;
  createdAt: string;
}

const TopChildList: React.FC = () => {
  const token = useRecoilValue(userToken);
  const [children, setChildren] = useState<Child[]>([]);
  const setSelectedId = useSetRecoilState(selectedChildId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        baseUrl + `api/relationship`,
        AxiosHeader({ token })
      );

      setChildren(result.data.data.relationList);
    };

    fetchData();
  }, [token]);

  return (
    <div className="m-8 mb-12">
      <div className="flex mx-auto overflow-x-auto no-scrollbar">
      {children.map((child) => (
  <div
    className="flex-none mx-6"
    key={child.relationshipId}
    onClick={() => {
      console.log("Profile clicked, userId:", child.userId);
      setSelectedId(child.userId);
    }}
  >
    <Profile
      profileName={child.userName}
      profileImage={defaultImg}
      size="xsmall"
      type="CHILD"
    />
  </div>
))}

      </div>
    </div>
  );
};

export default TopChildList;
