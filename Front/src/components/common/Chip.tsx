import { TradeHistoryCategory } from "../../types/WalletTypes";
import { MissionCategory } from "../mission/MissionBox";

export interface ChipProps {
  isSelected: boolean;
  category: TradeHistoryCategory | MissionCategory;
  handler: (text: string) => void;
}

const Chip = ({ isSelected, category, handler }: ChipProps) => {
  return (
    <div
      className={`rounded-[15px] px-4 h-[25px] text-center text-m ${
        isSelected ? "text-main bg-light" : "text-darkgray bg-gray"
      }`}
      onClick={() => handler(category.type)}
    >
      {category.text}
    </div>
  );
};

export default Chip;
