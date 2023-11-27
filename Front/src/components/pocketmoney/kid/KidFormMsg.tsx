import React, { useState } from "react";
import Header from "../../common/Header";
import FullBtn from "../../common/FullBtn";
import MsgBox from "../../common/MsgBox";

interface Props {
  pname: string;
  dmoney: number;
  onNext: (content: string) => void;
}

const KidFormMsg: React.FC<Props> = ({ pname, dmoney, onNext }) => {
  console.log("Rendering KidFormMsg with", { pname, dmoney });
  const [message, setMessage] = useState("");

  const handleNextClick = () => {
    onNext(message);
  };

  return (
    <div className="flex flex-col h-screen pb-60">
      <Header pageTitle="용돈 조르기" headerType="normal" headerLink="/" />
      <div className="flex-grow">
        <div>
          <div className="text-m mt-20 mb-32 text-center">
            <span className="text-main m-2">{pname}</span>님에게
            <br />
            <span className="text-main">{dmoney.toLocaleString()}</span> 원을
            요청할게요
          </div>

          <MsgBox onMessageChange={setMessage} />
        </div>
      </div>
      <FullBtn buttonText="확인" onClick={handleNextClick} />
    </div>
  );
};

export default KidFormMsg;
