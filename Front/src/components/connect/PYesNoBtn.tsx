import React, { useState } from "react";
import Modal from "../common/Modal";
import FullBtn from "../common/FullBtn";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../../store/common/selectors";
import AxiosHeader from "../../apis/axios/AxiosHeader";
import { baseUrl } from "../../apis/url/baseUrl";

type PYesNoBtnProps = {
  relationshipRequestId: number;
  name: string;
};

const PYesNoBtn: React.FC<PYesNoBtnProps> = ({
  relationshipRequestId,
  name,
}) => {
  const token = useRecoilValue(userToken);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const sendRequest = (processType: string) => {
    const bodyData = {
      relationshipRequestId,
      process: processType,
    };

    console.log(bodyData);

    axios
      .put(
        baseUrl + `api/relationship/child/request`,
        bodyData,
        AxiosHeader({ token })
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const handleYesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendRequest("ACCEPT");
    setModalContent("수락");
    setModalIsOpen(true);
  };

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendRequest("REJECT");
    setModalContent("거절");
    setModalIsOpen(true);
  };

  return (
    <div className="flex mt-auto">
      <div className="flex justify-between w-full">
        <button
          onClick={handleYesClick}
          className="inline-block p-2 pl-4 pr-4 text-white bg-main rounded-lg text-s mr-3"
        >
          수락
        </button>
        <button
          onClick={handleNoClick}
          className="inline-block p-2 pl-4 pr-4 text-darkgray bg-white rounded-lg text-s"
        >
          거절
        </button>
      </div>

      {modalIsOpen && (
        <Modal>
          <div className="text-m m-16">
            {name}님의 요청을 <br />
            {modalContent}했습니다.
          </div>
          <FullBtn
            buttonText="확인"
            buttonLink="/"
            onClick={() => setModalIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default PYesNoBtn;
