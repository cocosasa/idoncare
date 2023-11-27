import React from "react";
import FullBtn from "../common/FullBtn";

type MoneyDoneProps = {
  title: string | undefined;
  content: JSX.Element | string | undefined;
  ps: string | undefined;
  is_done?: boolean;
};

const MoneyDone: React.FC<MoneyDoneProps> = ({
  title,
  content,
  ps,
  is_done = true,
}) => {
  return (
    <div className="pb-60 flex flex-col h-screen justify-between">
      <div className="flex flex-col items-center justify-center flex-grow">
        <img
          src={is_done ? "/icons/icon-check.png" : "/icons/icon-fail.png"}
          alt="Icon"
          className="w-32 h-32 mx-auto block"
        />
        <div className="text-l mt-10">{title}</div>

        <div className="bg-gray p-10 pr-6 rounded-xl mt-16 mb-5 w-5/6 text-center text-s">
          {content}
        </div>

        <div className="text-darkgray text-s">{ps}</div>
      </div>
      <div className="mx-8">
        <FullBtn buttonLink="/" className="mb-6" />
      </div>
    </div>
  );
};

export default MoneyDone;
