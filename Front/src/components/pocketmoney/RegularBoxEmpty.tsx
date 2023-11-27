import React from "react";
import { Link } from "react-router-dom";

const RegularMoneyBoxEmpty: React.FC = () => {
  return (
    <div className="bg-gray p-20 pb-10 rounded-xl mt-5 text-s flex flex-col justify-center items-center">
      <div>등록된 정기용돈이 없습니다.</div>
      <Link to="/sendRegularMoney">
        <img src="/icons/icon-plus.png" alt="Icon" className="mt-2 w-24 h-30" />
      </Link>
    </div>
  );
};

export default RegularMoneyBoxEmpty;
