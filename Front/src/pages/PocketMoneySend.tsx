import React, { useState } from "react";
import SendPocketMoneyForm from "../components/pocketmoney/PocketSendForm";
import SendPocketMoneyMsgForm from "../components/pocketmoney/PocketSendMsgForm";
import MoneyDone from "../components/pocketmoney/Done";
// import PasswordForm1 from "../components/common/Password";
import PasswordForm2 from "../components/pocketmoney/MoneyPassword";
import KidSelectForm from "../components/common/KidSelectForm";

const PocketMoneySend: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);

  console.log("Current step:", step);

  let form;
  switch (step) {
    case 1:
      form = <KidSelectForm onNext={nextStep} />;
      break;
    case 2:
      form = <SendPocketMoneyForm onNext={nextStep} />;
      break;
    case 3:
      form = <SendPocketMoneyMsgForm onNext={nextStep} />;
      break;
    case 4:
      form = <PasswordForm2 onNext={nextStep} />;
      break;
    case 5:
      form = (
        <MoneyDone
          title="용돈 보내기 완료"
          content={
            <>
              <div className="text-m">이우철</div>
              <div className="text-m text-main">1,000원</div>
            </>
          }
          ps="남은 잔액:102,000원"
        />
      ); // Step5 
     break;
   default:
     throw new Error("Invalid step");
 }

 return <div>{form}</div>;
};

export default PocketMoneySend;
