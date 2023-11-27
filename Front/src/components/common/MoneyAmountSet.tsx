import { useState, useEffect } from "react";
import Number from "../pocketmoney/Number";

interface AmountItem {
  label: string;
  value: number;
}

interface Props {
  onValueChange: (value: number) => void;
}

const amounts: AmountItem[] = [
  { value: 500, label: "5백" },
  { value: 1000, label: "1천" },
  { value: 10000, label: "1만" },
];

const MoneyAmountSet: React.FC<Props> = ({ onValueChange }) => {
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [pendingValue, setPendingValue] = useState<number | null>(null);

  useEffect(() => {
    if (pendingValue !== null) {
      onValueChange(pendingValue);
      setPendingValue(null);
    }
  }, [pendingValue, onValueChange]);

  const handleNumberClick = (num: number | string) => {
    if (typeof num === "number") {
      setMoneyAmount((prevValue) => {
        const newValue = prevValue * 10 + num;
        setPendingValue(newValue);
        return newValue;
      });
    }
  };
  
  const handleDoubleZero = () => {
    setMoneyAmount((prevValue) => {
      const newValue = prevValue * 100;
      setPendingValue(newValue);
      return newValue;
    });
  };
  
  const handleBackspace = () => {
    setMoneyAmount((prevValue) => {
      const newValue = Math.floor(prevValue / 10);
      setPendingValue(newValue);
      return newValue;
    });
  };
  

  return (
    <div>
      <div className="text-l text-main font-strong mb-5">
        {moneyAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
        원
      </div>

      <div className="mt-auto text-center">
        <div className="flex justify-center gap-10">
          {amounts.map((item) => (
            <div
              key={item.label}
              onClick={() =>
                setMoneyAmount((prev) => {
                  const newValue = prev + item.value;
                  setPendingValue(newValue);
                  return newValue;
                })
              }
              className="px-5 py-3 bg-gray rounded-3xl"
            >
              +{item.label}
            </div>
          ))}
        </div>

        <Number
          bottomLeftText="00"
          bottomRightText="<-"
          onNumberClick={handleNumberClick}
          onLeft={handleDoubleZero}
          onRight={handleBackspace}
        />
      </div>
    </div>
  );
};

export default MoneyAmountSet;
