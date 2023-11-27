import Header from "../components/common/Header";

import WalletCard from "../components/wallet/WalletCard";
import TradeHistory from "../components/wallet/TradeHistory";
import BottomNav from "../components/common/BottomNav";

const Wallet = () => {
  return (
    <div>
      <Header pageTitle="내 지갑" headerType="normal" headerLink="/" />
      <div className="m-8">
        <WalletCard />
        <TradeHistory />
      </div>
      <BottomNav />
    </div>
  );
};

export default Wallet;
