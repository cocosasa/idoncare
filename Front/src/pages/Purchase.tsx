import Header from "../components/common/Header";
import BottomNav from "../components/common/BottomNav";
import PurchaseBody from "../components/purchase/PurchaseBody";

function Purchase() {
  return (
    <div>
      <Header pageTitle="결제" headerLink="/" headerType="normal" />
      <div className="mx-8">
        <PurchaseBody />
      </div>
      <BottomNav />
    </div>
  );
}

export default Purchase;
