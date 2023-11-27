import DailyTradeList from './DailyTradeList'
import { MonthlyTradeListResponse } from './TradeHistory';

interface TotalTradeListProps {
  tradeList: MonthlyTradeListResponse[];
} 

function TotalTradeList({ tradeList }: TotalTradeListProps) {
  return (
    <div>
      {tradeList && (
        <div>
          {tradeList.map((list, index) => {
            return <DailyTradeList key={index} list={list} />;
          })}
        </div>
      )}
      {!tradeList && (
        <div className="p-10 text-m text-center text-main">
          거래 내역이 없습니다..
        </div>
      )}
    </div>
  );
}

export default TotalTradeList