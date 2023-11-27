import React from "react";
import PYesNoBtn from "../connect/PYesNoBtn";

type ParentCheckProps = {
  name: string;
  phoneNumber: string;
  relationshipRequestId: number;
};

const ParentCheck: React.FC<ParentCheckProps> = ({
  name,
  phoneNumber,
  relationshipRequestId,
}) => {
  return (
    <div className="p-3 flex justify-between items-center bg-mediumgray rounded-lg">
      <div className="ml-4">
        <span className="text-s mr-5">{name}</span>
        <span className="text-s">{phoneNumber}</span>
      </div>

      <PYesNoBtn relationshipRequestId={relationshipRequestId} name={name} />
    </div>
  );
};

export default ParentCheck;
