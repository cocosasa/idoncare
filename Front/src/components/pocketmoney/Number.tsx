import React from "react";

type ButtonText = string;

interface NumberProps {
  bottomLeftText?: ButtonText | null;
  bottomRightText?: ButtonText | null;
  onNumberClick?: ((num: number | string) => void) | null;
  onLeft?: (() => void) | null;
  onRight?: (() => void) | null;
}

const Number: React.FC<NumberProps> = ({
  bottomLeftText = null,
  bottomRightText = null,
  onNumberClick = null,
  onLeft = null,
  onRight = null,
}) => {
  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [bottomLeftText || "", 0, bottomRightText || "<-"],
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mt-5 mb-10">
      {numbers.map((row, i) =>
        row.map((num, j) => (
          <button
            key={i * 3 + j}
            className="p-2 text-l"
            onClick={() => {
              if (typeof num === "number" && onNumberClick) {
                onNumberClick(num);
              } else if (num === bottomLeftText && onLeft) {
                onLeft();
              } else if (num === bottomRightText && onRight) {
                onRight();
              }
            }}
          >
            {num}
          </button>
        ))
      )}
    </div>
  );
};

export default Number;
