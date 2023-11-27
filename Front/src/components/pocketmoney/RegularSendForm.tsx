import React, { useState } from "react";
import Header from "../common/Header";
import FullBtn from "../common/FullBtn";
import MoneyAmountSet from "../common/MoneyAmountSet";

interface Props {
  onNext: (amount: number) => void;
}

const RegularSendForm: React.FC<Props> = ({ onNext }) => {
  const [moneyAmount, setMoneyAmount] = useState(0);

  const handleValueChange = (value: number) => {
    setMoneyAmount(value);
  };

  const handleNextClick = () => {
    onNext(moneyAmount);
  };

  return (
    <div className="flex flex-col h-screen pb-60">
      <Header pageTitle="정기용돈 등록" headerType="normal" headerLink="/" />
      <div className="m-10 text-center flex-grow">
        <div className="text-l mt-24 mb-16">얼마를 보낼래요?</div>

        <MoneyAmountSet onValueChange={handleValueChange} />

      </div>
      <FullBtn buttonText="다음" onClick={handleNextClick} isDone={moneyAmount > 0} />
    </div>
  );
};

export default RegularSendForm;
