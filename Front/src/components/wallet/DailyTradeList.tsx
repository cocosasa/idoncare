import { CashFlow } from "../../types/WalletTypes";
import { MonthlyTradeListResponse } from "./TradeHistory";
import TradeListItem from "./TradeListItem";

interface DailyTradeListProps {
  list: MonthlyTradeListResponse;
  showCategory?: CashFlow;
}

function DailyTradeList({ list, showCategory = "ALL" }: DailyTradeListProps) {
  const dateString = list.historyList[0].localDate;
  const dateParts = dateString.split("-");

  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  const filteringList = () => {
    if (showCategory === "ALL") {
      return list.historyList;
    } else {
      return list.historyList.filter((item) => item.cashFlow === showCategory);
    }
  };

  const filteredList = filteringList();
  if (filteredList.length === 0) {
    return null;
  }
  return (
    <div className="">
      <div className="px-4 my-4">
        <div>
          {month}월{day}일
        </div>
        <hr />
      </div>
      {/* 항목 */}
      <div className="">
        {filteredList?.map((item, index) => (
          <TradeListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default DailyTradeList;
