// import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import DemandBox from "../components/pocketmoney/kid/DemandBox";
import DemandingBox from "../components/pocketmoney/kid/DemandingBox";
import BottomNav from "../components/common/BottomNav";

function KidDemandMoneyList() {
  return (
    <div className="pb-60">
      <Header pageTitle="용돈 요청 조회" headerType="normal" headerLink="/" />

      <div className="m-10">
        <div className="flex justify-between">
          <div className="text-m font-strong">기다리는 중</div>
          <Link to="/kidDemanedMoneyList" className="text-main font-strong">
            지난 요청 ▶
          </Link>
        </div>

        <div className="flex justify-between">
          <DemandBox />
          <DemandingBox />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default KidDemandMoneyList;
