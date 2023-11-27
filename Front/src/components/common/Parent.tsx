import React from "react";
import Profile from "./Profile";

type ParentProps = {
  imgSrc?: string;
  is_connect?: boolean;
  pname?: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
};

const Parent: React.FC<ParentProps> = ({
  is_connect = false,
  pname,
  onClick,
  isSelected,
  className="",
}) => {

const selectedClassName = isSelected ? "scale-105" : "scale-95 grayscale";

return (
  <div
    className={`m-3 ${selectedClassName} ${className} ${
      is_connect ? "" : "opacity-50"
    }`}
    onClick={onClick}
  >
    <Profile profileName="" type="PARENT"/>
    <div className="text-center text-m mt-6">{pname}</div>
  </div>
);
};

export default Parent;
