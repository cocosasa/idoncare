import React from "react";

type RegularMoneyBoxProps = {
  regularDate: string;
  cname: string;
  amount: string;
  startDate: string;
  regularPocketMoneyId: number;
};

const RegularMoneyBox: React.FC<RegularMoneyBoxProps> = ({
  regularDate,
  cname,
  amount,
  startDate,
}) => {
  return (
    <div className="bg-gray p-10 pr-6 rounded-xl mt-5 text-s">
      <p className="mb-2 text-center">{cname}</p>
      <p className="mb-2">{regularDate}</p>
      <div className="flex justify-between items-center mb-8">
        <span className="text-main text-l font-strong">{amount}</span>
      </div>

      <div className="flex justify-between items-center">
        <div></div>
        <span>시작일: {startDate}</span>
      </div>
    </div>
  );
};

export default RegularMoneyBox;
