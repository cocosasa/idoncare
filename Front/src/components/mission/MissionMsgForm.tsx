import React, { useState } from "react";
import Header from "../common/Header";
import FullBtn from "../common/FullBtn";
import MsgBox from "../common/MsgBox";

interface Props {
  kname: string;
  smoney: number;
  onNext: (content: string) => void;
}

const MissionyMsgForm: React.FC<Props> = ({ kname, smoney, onNext }) => {
  const [message, setMessage] = useState("");

  const handleNextClick = () => {
    onNext(message);
  };

  return (
    <div className="flex flex-col h-screen pb-60">
      <Header pageTitle="미션 등록" headerType="normal" headerLink="/" />
      <div className="flex-grow">
        <div>
          <div className="text-m mt-20 mb-32 text-center">
            <span className="text-main m-2">{kname}</span>님에게
            <br />
            <span>미션금 </span>
            <span className="text-main">{smoney.toLocaleString()}</span>원을 등록할게요
          </div>

          <MsgBox onMessageChange={setMessage} />
        </div>
      </div>
      <FullBtn buttonText="확인" onClick={handleNextClick} />
    </div>
  );
};

export default MissionyMsgForm;
``;
