import React, { useState, useEffect } from "react";
import Kid from "../../components/common/Kid";
import Modal from "../../components/common/Modal";
import YesNoBtn from "../common/YesNoBtn";
import KidAdd from "../../components/connect/KidAdd";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../../store/common/selectors";

type KidData = {
  relationshipId: number;
  userId: number;
  userName: string;
  createdAt: string;
};

type KidsProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Kids: React.FC<KidsProps> = ({ isOpen, setIsOpen }) => {
  const token = useRecoilValue(userToken);
  const [kidsData, setKidsData] = useState<KidData[]>([]);

  const [selectedRelationshipId, setSelectedRelationshipId] = useState<
    number | null
  >(null);

  useEffect(() => {
    axios
      .get("https://j9d209.p.ssafy.io:9081/api/relationship", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        if (response.data.data && response.data.data.relationList) {
          setKidsData(response.data.data.relationList);
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch((error) => console.error("Error:", error));

    if (!isOpen) setSelectedRelationshipId(null);
  }, [isOpen]);

  const onDelete = () => {
    if (!selectedRelationshipId) return;

    axios
      .delete("https://j9d209.p.ssafy.io:9081/api/relationship", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          relationshipId: selectedRelationshipId,
        },
      })
      .then(() => {
        setKidsData(
          kidsData.filter(
            (kid) => kid.relationshipId !== selectedRelationshipId
          )
        );
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(selectedRelationshipId);
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-wrap justify-center ">
      {kidsData.map((kid) => (
        <Kid
          key={kid.relationshipId}
          className="w-1/4"
          is_connect={true}
          isSelected={selectedRelationshipId === kid.relationshipId}
          kname={kid.userName}
          onClick={() => {
            setSelectedRelationshipId(kid.relationshipId);
            setIsOpen(true);
          }}
        />
      ))}
      <KidAdd className="w-1/4" />

      {isOpen && (
        <Modal>
          <div className="text-m m-16 text-center">
            자녀를 연결을
            <br />
            끊으시겠습니까?
          </div>
          <YesNoBtn
            yesText="확인"
            noText="취소"
            onYesClick={onDelete}
            onNoClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Kids;
