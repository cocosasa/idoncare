// import TopMenuBox from "../main/TopMenuBox";
import { Link } from "react-router-dom";
import WalletCard from "../wallet/WalletCard";

function TopMenu() {
  return (
    <div
      className="bg-main rounded-b-3xl flex flex-col items-center px-6 pb-16 shadow-2xl"
      style={{
        borderBottomLeftRadius: "60px",
        borderBottomRightRadius: "60px",
      }}
    >
      <div>
        <img
          src="/icons/icon-logo-2.png"
          alt="logo"
          className="w-36 h-28 p-3 mt-2"
        />
      </div>
      <div className="w-full">
        <div className="w-full pt-4 pb-5">
          <WalletCard />
        </div>
        <div className="flex justify-between w-full gap-4 pb-4">
          <Link to="/pocketMoney" className="bg-sky text-center text-m text-white bg-opacity-90 box-content rounded-xl p-12 mt-4 w-48 flex flex-col justify-center items-center">
              용돈
              <img src="/icons/icon-money.png" alt="Icon" className="w-24 h-20 mt-5"/>
            </Link>

            <Link to="/mission" className="bg-pi text-center text-m text-white bg-opacity-90 box-content rounded-xl p-12 mt-4 w-48 flex flex-col justify-center items-center">
              미션 
              <img src="/icons/icon-mission.png" alt="Icon" className="w-20 h-20 mt-5"/>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
