import { useRecoilValue } from "recoil";
import BottomMenuBox from "./BottomMenuBox";
import { myRole } from "../../store/common/selectors";

function BottomMenu() {
  const role = useRecoilValue(myRole);
  return (
    <div className="mt-12 text-thick">
      {role == "CHILD" && (
        <div>
          <BottomMenuBox link="/parentSetting" text="나의 부모님" />
          <BottomMenuBox link="/kidDemandMoney" text="용돈 조르기" />
          <BottomMenuBox link="/purchase/qrcode/fast" text="QR코드 생성하기" />
        </div>
      )}
      {role == "PARENT" && (
        <div>
          <BottomMenuBox link="/report" text="활동보고서" />
          <BottomMenuBox link="/kidSetting" text="내 아이" />
          <BottomMenuBox link="/sendRegularMoney" text="정기용돈 주기" />
        </div>
      )}
    </div>
  );
}

export default BottomMenu;
