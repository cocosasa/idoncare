import React from "react";
import Modal from "../common/Modal";
import FullBtn from "../common/FullBtn";

type DemandCheckModalProps = {
  onClose: () => void;
  name: string;
};

const DemandCheckModal: React.FC<DemandCheckModalProps> = ({ onClose, name }) => {
  return (
    <Modal>
      <div className="text-m m-16">
        {name}님의 <br />
        요청을 거절했습니다.
      </div>
      <FullBtn buttonText="확인" buttonLink="/" onClick={onClose} />
    </Modal>
  );
};

export default DemandCheckModal;
