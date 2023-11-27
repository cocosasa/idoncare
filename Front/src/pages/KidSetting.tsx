import React, { useState } from "react";
import Header from "../components/common/Header";
// import DemandConnectList from "../components/connect/DemandConnectList";
import Kids from "../components/connect/Kids";
import BottomNav from "../components/common/BottomNav";

const KidSetting: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header pageTitle="자녀 관리" headerType="normal" headerLink="/" />

      <div>
        {/* <div className="text-m text-center mt-10 mb-5">내가 보낸 요청</div> */}
        {/* <DemandConnectList name="이우철" phoneNumber="010-1234-1234" /> */}

        <div className="text-m text-center mt-24 mb-5">내 자녀</div>

        <Kids isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <BottomNav />
    </div>
  );
};

export default KidSetting;
