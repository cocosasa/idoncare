import React from "react";
// import KNoBtn from "../connect/KNoBtn";

type DemandConnectListProps = {
  name: string;
  phoneNumber: string;
};

const DemandConnectList: React.FC<DemandConnectListProps> = ({ name, phoneNumber }) => {
  return (
    <div className="p-3 flex justify-between items-center bg-mediumgray rounded-lg">
      <div className="ml-4">
        <span className="text-s mr-5">{name}</span>
        <span className="text-s">{phoneNumber}</span>
      </div>

      {/* <KNoBtn /> */}
    </div>
  );
};

export default DemandConnectList;
