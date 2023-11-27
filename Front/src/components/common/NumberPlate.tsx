import React from "react";

type ButtonText = string;
0;
interface NumberPlateProps {
  value: number;
  changeNumber: (number: number) => void;
  bottomLeftText?: ButtonText;
  bottomRightText?: ButtonText;
}

const NumberPlate: React.FC<NumberPlateProps> = ({
  value,
  changeNumber,
  bottomLeftText = "",
  bottomRightText = "<-",
}) => {
  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [bottomLeftText, 0, bottomRightText],
  ];

  const changeValue = (key: string | number) => {
    if (key === "<-") {
      changeNumber(Math.floor(value / 10));
    } else if (key === "") {
      return;
    } else if (key === "00") {
      changeNumber(value * 100);
    } else {
      if (typeof key === "number") {
        changeNumber(value * 10 + key);
      }
    }
  };

  return (
    <div className="grid grid-cols-3 gap-10 mt-5 mb-10">
      {numbers.map((row, i) =>
        row.map((num, j) => (
          <div
            key={i * 3 + j}
            className="p-2 text-l"
            onClick={() => {
              changeValue(num);
            }}
          >
            {num}
          </div>
        ))
      )}
    </div>
  );
};

export default NumberPlate;
