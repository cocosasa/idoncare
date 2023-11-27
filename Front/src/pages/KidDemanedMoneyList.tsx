import BottomNav from "../components/common/BottomNav";
import Header from "../components/common/Header";
import DemandingBox from "../components/pocketmoney/kid/DemandingBox";

function KidDemandedMoneyList() {
  return (
    <div className="pb-60">
      <Header pageTitle="지난 용돈 요청" headerType="normal" headerLink="/" />

      <div className="m-10">
        <div className="flex justify-between">
          <div className="text-m font-strong">지난 요청</div>
        </div>

        <div className="flex justify-between">
          <DemandingBox />
          <DemandingBox />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default KidDemandedMoneyList;
