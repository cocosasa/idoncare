import Header from "../components/common/Header";
import MoneyInputForm from "./../components/common/MoneyInputForm";
import FullBtn from './../components/common/FullBtn';
import { userBalanace } from "../store/wallet/atoms";
import { useRecoilValue } from "recoil";
import { useState } from 'react';

function MissionCreateMoney() {
  const balance = useRecoilValue(userBalanace);
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <Header pageTitle="미션 생성" />
      <div className="mx-8">
        <MoneyInputForm
          balance={balance}
          text="미션금은 얼마로 할까요?"
          amount={amount}
          setAmount={setAmount}
        />
        <FullBtn buttonLink="" isDone={amount>0} />
      </div>
    </div>
  );
}

export default MissionCreateMoney;
