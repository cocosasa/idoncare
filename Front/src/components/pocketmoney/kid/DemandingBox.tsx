import React from "react";
import { Link } from "react-router-dom";

const DemandingBox: React.FC = () => {
  return (
    <div className="bg-gray p-12 pl-14 rounded-xl mt-5 text-t flex flex-col justify-center items-c12enter w-64 ml-3 mr-3">
      <div>엄마</div>
      <div className="text-main font-strong">2,500원</div>
      <Link to="/" className="self-center">
        <img
          src="/icons/icon-emoji-1.png"
          alt="Icon"
          className="mt-2 w-24 h-30"
        />
      </Link>
    </div>
  );
};

export default DemandingBox;
