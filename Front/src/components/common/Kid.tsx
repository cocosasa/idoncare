import React from "react";
import Profile from "./Profile";

type KidProps = {
  imgSrc?: string;
  is_connect?: boolean;
  kname?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  childUserId?: string;
  isSelected?: boolean;
};

const Kid: React.FC<KidProps> = ({
  is_connect = true,
  kname,
  className,
  onClick,
  isSelected,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (is_connect && onClick) {
      onClick(event);
    }
  };

  const selectedClassName = isSelected ? "scale-105" : "scale-95 grayscale";

  return (
    <div
      className={`mx-4 my-3 ${selectedClassName} ${className}`}
      onClick={handleClick}
    >
      <Profile profileName="" profileImage={""} size="small" type="CHILD" />
      <div className="text-center text-m mt-6 whitespace-nowrap">{kname}</div>
    </div>
  );
};

export default Kid;
