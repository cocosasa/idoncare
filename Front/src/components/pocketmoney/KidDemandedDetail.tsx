import React from "react";
import { KidDemandedData } from "./TypeDemand";

type KidDemandMoneyDetailProps = {
  data: KidDemandedData;
};

const KidDemandMoneyDetail: React.FC<KidDemandMoneyDetailProps> = ({
  data,
}) => {
  const { child, amount, content, createdAt, cancelDate } = data;

  return (
    <div>
      <div className="text-m mb-10">
        <span className="text-main font-strong">{child.name}</span>님이
        <br />
        용돈을 요청했어요
      </div>

      <div className="bg-gray p-14 rounded-xl mt-5 text-s text-center">
        <div className="flex justify-center items-center">
          <img src="/icons/icon-emoji-1.png" alt="Icon" className="w-32 h-32" />
        </div>
        <div className="text-darkgray">{content}</div>
        <div className="mt-7 font-strong">
          <span className="text-main font-strong">{amount}</span>원이 필요해요
        </div>
      </div>

      <div className="bg-gray p-10 pr-6 rounded-xl mt-14 text-s text-center">
        <div className="flex justify-between mb -2 ">
          <div>요청일</div>
          {new Date(createdAt).toISOString().split("T")[0]}
        </div>

        <div className="flex justify-between">
          <div>취소예정일</div>
          {new Date(cancelDate).toISOString().split("T")[0]}
        </div>
      </div>
    </div>
  );
};

export default KidDemandMoneyDetail;
