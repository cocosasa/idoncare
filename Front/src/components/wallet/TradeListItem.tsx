import { TradeItem } from "../../types/WalletTypes";
import Icon from "../common/Icon";

interface TradeItemProps {
  item: TradeItem;
}

function TradeListItem({item}: TradeItemProps) {

  return (
    <div className="flex m-5">
      <div className="flex-none bg-gray w-[40px] h-[40px] p-3 rounded-[50%]">
        <Icon size="small" name="purchase" />
      </div>
      <div className="flex w-full justify-between">
        <div className="ml-10">
          <div>{item.content}</div>
          <div>{item.localTime.substring(0, 5)}</div>
        </div>
        <div className="flex-col flex items-end">
          <div
            className={`text-left ${
              item.cashFlow == "DEPOSIT" ? "text-rose-600" : "text-main"
            }`}
          >
            {item.cashFlow == "DEPOSIT" ? "+" : "-"}
            {item.amount} 원
          </div>
          <div className="text-darkgray text-left">잔액 {item.balance} 원</div>
        </div>
      </div>
    </div>
  );
}

export default TradeListItem;
