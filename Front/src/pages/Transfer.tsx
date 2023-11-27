import Header from "../components/common/Header";
import FullBtn from "../components/common/FullBtn";
import MoneyInputForm from "../components/common/MoneyInputForm";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { transferData, userBalanace } from "../store/wallet/atoms";

function Transfer() {
  const navigate = useNavigate();
  const [transferAccountData, setTransferAccountData] =
    useRecoilState(transferData);

  const balance = useRecoilValue(userBalanace);

  const setAmount = (value : number) => {
    setTransferAccountData({ amount: value , account: transferAccountData?.account });
  }
  const params = useParams();
  return (
    <div>
      <Header pageTitle="보내기" />
      <div className="mx-8">
        <MoneyInputForm
          text={"얼마를 보낼래요?"}
          balance={balance}
          amount={transferAccountData.amount}
          setAmount={setAmount}
        />
        <FullBtn
          buttonText="다음"
          onClick={() => {
            navigate(`/transfer/confirm/${params.option}`);
          }}
        />
      </div>
      
    </div>
  );
}

export default Transfer;
