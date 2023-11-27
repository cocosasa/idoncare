import React from "react";
import { Link } from "react-router-dom";

const DemandBox: React.FC = () => {
  return (
    <div className="bg-gray p-12 pl-14 rounded-xl mt-5 text-t text-center flex flex-col justify-center items-c12enter w-64 ml-3 mr-3">
      <div>
        용돈
        <br />
        요청하기
      </div>
      <Link to="/kidDemandMoney" className="self-center">
        <img src="/icons/icon-plus.png" alt="Icon" className="mt-2 w-24 h-30" />
      </Link>
    </div>
  );
};

export default DemandBox;
