import React, { useState } from "react";
import PocketMoneySendForm from "../components/pocketmoney/PocketSendForm";
import PocketSendMsgForm from "../components/pocketmoney/PocketSendMsgForm";
import MoneyDone from "../components/pocketmoney/MoneyDone";
import MoneyPassword from "../components/pocketmoney/MoneyPassword";
import KidSelectForm from "../components/common/KidSelectForm";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../store/common/selectors";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { baseUrl } from "../apis/url/baseUrl";
import { userBalanace } from "../store/wallet/atoms";

const PocketMoneySend: React.FC = () => {
  const token = useRecoilValue(userToken);
  const balance = useRecoilValue(userBalanace);
  const [step, setStep] = useState(1);
  const [childUserId, setChildUserId] = useState<number | null>(null);
  const [childUserName, setChildUserName] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const onNextKidSelectForm = (childUserId: number, childUserName: string) => {
    console.log("자녀 선택:", childUserId, childUserName);
    setChildUserId(childUserId);
    setChildUserName(childUserName);
    nextStep();
  };

  const onNextSendPocketMoneyForm = (selectedAmount: number) => {
    setAmount(selectedAmount);
    console.log("금액:", selectedAmount);
    nextStep();
  };

  const onNextFormMsg = (message: string) => {
    setComment(message);
    console.log("메세지:", message);
    nextStep();
  };

  const nextStep = () => {
    if (step === 4) {
      axios
        .post(
          baseUrl + "api/pocketmoney/send",
          {
            childUserId,
            amount,
            comment,
          },
          AxiosHeader({ token })
        )
        .then((response) => {
          console.log(response.data);
          setIsSuccess(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsSuccess(false);
        });
    }

    setStep(step + 1);
  };

  console.log("Current step:", step);

  let form;
  switch (step) {
    case 1:
      form = <KidSelectForm 
      onNext={onNextKidSelectForm} 
      pageTitle="용돈 보내기"
      />;
      break;
    case 2:
      form = <PocketMoneySendForm onNext={onNextSendPocketMoneyForm} />;
      break;
    case 3:
      if (childUserName && amount) {
        form = (
          <PocketSendMsgForm
            kname={childUserName}
            smoney={amount}
            onNext={onNextFormMsg}
          />
        );
      } else {
        form = (
          <PocketSendMsgForm kname="자녀" smoney={0} onNext={onNextFormMsg} />
        );
      }
      break;
    case 4:
      form = <MoneyPassword onNext={nextStep} />;
      break;
    case 5:
      form = (
        <MoneyDone
          title={isSuccess ? "용돈 보내기 완료" : "용돈 보내기 실패"}
          content={
            <>
              <div className="text-m">{childUserName}</div>
              <div className="text-m text-main">{amount}원</div>
            </>
          }
          ps={
            isSuccess
              ? `남은 잔액: ${balance - (amount || 0)}원`
              : "계좌 잔고가 부족합니다."
          }
          is_done={isSuccess}
        />
      );
      break;

    default:
      throw new Error("Invalid step");
  }

  return <div>{form}</div>;
};

export default PocketMoneySend;
