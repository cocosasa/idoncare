import useComma from "../../hooks/useComma";

interface TransferMsgProps {
  name : string | undefined;
  amount : number;
}

function TransferMsg({name, amount} : TransferMsgProps) {
  return (
    <div className="flex flex-col h-[50vh]">
      <div className="flex-grow">
        <div>
          <div className="text-m mt-20 text-center">
            <span className="text-main m-2">{name}</span>님에게
            <br />
            <span className="text-main">{useComma(amount)}원</span>을 보낼게요
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferMsg