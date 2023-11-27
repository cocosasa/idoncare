import React, { useState } from "react";
import PasswordForm from "../common/PasswordForm";
import FullBtn from "../common/FullBtn";
import Modal from "../common/Modal";

interface Props {
  onNext?: () => void;
}

const ParentComponent: React.FC<Props> = ({ onNext }) => {
  const [password, setPassword] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleNoClick = () => {
    setModalIsOpen(true);
  };

  return (
    <div>
      <PasswordForm password={password} handleSetPassword={setPassword} />
      <FullBtn
        onClick={() => {
          if (password.length === 6) {
            if (onNext) onNext();
            console.log(password);
          } else {
            handleNoClick();
          }
        }}
      />
      {modalIsOpen && (
        <Modal>
          <div className="text-m m-16">
            비밀번호는 <br />
            6자리입니다.
          </div>
          <FullBtn buttonText="확인" onClick={() => setModalIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ParentComponent;
