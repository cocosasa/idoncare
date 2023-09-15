import { useState } from "react";
import SignupQuestion from "./SignupQuestion";
import { SignupUserInfo } from "../../types/SignupUserInfo";
import SignupTypeSelect from "./SignupTypeSelect";

const SignupForm = () => {
  const [step, setStep] = useState<number>(1);
  const [signupUserInfo, setSignupUserInfo] = useState<SignupUserInfo>();
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const setType = (type: string) => {
    setSignupUserInfo((prev) => ({ ...prev, type }));
  };

  console.log(signupUserInfo);
  return (
    <div className="flex items-center justify-around h-full text-center text-s">
      {step === 1 && (
        <SignupTypeSelect
          userType={signupUserInfo?.type}
          onNextStep={nextStep}
          onSetType={setType}
        />
      )}
      {step === 2 && <SignupQuestion onNextStep={nextStep} question="이름을 알려주세요." />}
    </div>
  );
};

export default SignupForm;
