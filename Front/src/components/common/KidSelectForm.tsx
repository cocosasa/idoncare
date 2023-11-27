import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import FullBtn from "../common/FullBtn";
// import MyKidList from "../pocketmoney/MyKidList";
import Kid from "../common/Kid";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../../store/common/selectors";
import AxiosHeader from "../../apis/axios/AxiosHeader";
import { baseUrl } from "../../apis/url/baseUrl";

interface Props {
  onNext: (kidUserId: number, kidUserName: string) => void;
  pageTitle: string;
}

type KidData = {
  relationshipId: number;
  userId: number;
  userName: string;
  createdAt: string;
};

const KidSelectForm: React.FC<Props> = ({ onNext, pageTitle }) => {
  const token = useRecoilValue(userToken);
  const [selectedKidId, setSelectedKidId] = useState<number | null>(null);
  const [selectedKidName, setSelectedKidName] = useState<string | null>(null);

  const [kidsData, setKidsData] = useState<KidData[]>([]);

  useEffect(() => {
    axios
      .get(baseUrl + `api/relationship`, AxiosHeader({ token }))
      .then((response) => {
        if (response.data.data && response.data.data.relationList) {
          setKidsData(response.data.data.relationList);
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [token]);

  const handleKidClick = (id: number, name: string) => {
    if (selectedKidId === id) {
      setSelectedKidId(null);
      setSelectedKidName(null);
    } else {
      setSelectedKidId(id);
      setSelectedKidName(name);
    }
  };

  return (
    <div className="flex flex-col h-screen pb-60">
      <Header pageTitle={pageTitle} headerType="normal" headerLink="/" />

      <div className="m-10 text-center flex-grow ">
        <div className="text-l mt-24 mb-28">자녀를 선택해주세요.</div>

        <div className="flex flex-wrap justify-center">
          {kidsData.map((kid) => (
            <Kid
              key={kid.relationshipId}
              is_connect={true}
              isSelected={selectedKidId === kid.userId}
              kname={kid.userName}
              className=""
              onClick={() => handleKidClick(kid.userId, kid.userName)}
            />
          ))}
        </div>
      </div>
      <FullBtn
        className="mx-8"
        buttonText="다음"
        onClick={() => onNext(selectedKidId!, selectedKidName!)}
        isDone={selectedKidId !== null}
      />
    </div>
  );
};

export default KidSelectForm;
