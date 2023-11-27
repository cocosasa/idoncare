import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Parent from "../components/common/Parent";
import ParentCheck from "../components/connect/ParentCheck";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../store/common/selectors";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { baseUrl } from "../apis/url/baseUrl";
import BottomNav from "../components/common/BottomNav";

type ParentData = {
  relationshipId: number;
  userId: number;
  userName: string;
  createdAt: string;
};

type ParentCheckData = {
  relationshipRequestId: number;
  parentName: string;
  parentPhoneNumber: string;
};

const ParentSetting: React.FC = () => {
  const token = useRecoilValue(userToken);

  const [parentsData, setParentsData] = useState<ParentData[]>([]);
  const [parentCheckRequests, setParentCheckRequests] = useState<
    ParentCheckData[]
  >([]);

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

    axios
      .get(baseUrl + `api/relationship/child/request`, AxiosHeader({ token }))
      .then((response) => {
        setParentCheckRequests(response.data.data.requests);
      })
      .catch((error) => console.error("Error:", error));
  }, [token]);

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <Header pageTitle="부모님" headerType="normal" headerLink="/" />

        <div className="mt-56">
          <div className="text-l text-center">내 보호자</div>
          <div className="m-5 flex flex-wrap justify-center gap-3">
            {parentsData.map((parent) => (
              <Parent
                key={parent.relationshipId}
                is_connect={true}
                isSelected={true}
                pname={parent.userName}
                className="w-36"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-20">
        {parentCheckRequests.map((request, index) => (
          <div
            key={request.relationshipRequestId}
            className={index !== 0 ? "mt-5" : ""}
          >
            <ParentCheck
              name={request.parentName}
              phoneNumber={request.parentPhoneNumber}
              relationshipRequestId={request.relationshipRequestId}
            />
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default ParentSetting;
