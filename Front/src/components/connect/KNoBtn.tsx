import React, { useState } from "react";
import Modal from "../common/Modal";
import FullBtn from "../common/FullBtn";

const YesNoBtn: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  return (
    <div className="flex mt-auto">
      <div className="flex justify-between w-full">
        <button
          onClick={handleNoClick}
          className="inline-block p-2 pl-4 pr-4 text-darkgray bg-white rounded-lg text-s"
        >
          취소
        </button>
      </div>

      {modalIsOpen && (
        <Modal>
          <div className="text-m m-16">
            연결 요청을 <br />
            취소했습니다.
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

export default YesNoBtn;
