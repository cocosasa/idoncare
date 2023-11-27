import { useEffect, useState } from "react";
import SignupQuestion from "./SignupQuestion";
import { SignupUserInfo } from "../../types/SignupUserInfo";
import SignupTypeSelect from "./SignupTypeSelect";
import { useRecoilValue } from "recoil";
import { SignupCode } from "../../store/signup/atoms";
import { PostSignupAxios } from "../../apis/axios/PostSignupAxios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignupForm = () => {
  type Data = null | SignupUserInfo;
  type Error = string | null;
  type Code = number;
  interface PostSignup {
    data: Data;
    error: Error;
    code: Code;
  }

  const [step, setStep] = useState<number>(1);
  const [signupUserInfo, setSignupUserInfo] = useState<SignupUserInfo>();
  const userId = useRecoilValue<string | null>(SignupCode);
  const navigate = useNavigate();
  const { mutate } = useMutation<PostSignup>(() => PostSignupAxios(signupUserInfo!), {
    onSuccess: (res) => {
      console.log(res);
      if (res.code === 200) {
        toast('회원가입이 완료되었습니다.');
      } else {
        // alert("Error: " + res.code + " " + res.error);
      }
      navigate("/login");

      console.log(res);
    },
  });

  useEffect(() => {
    console.log(step);
    if (step === 8) {
      mutate();
    }
  }, [step, signupUserInfo]);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handleSetInfo = (setType: number, value: string) => {
    if (setType === 1) {
      setSignupUserInfo((prev) => ({ ...prev, role: value }));
      setSignupUserInfo((prev) => ({ ...prev, userId: userId! }));
      setSignupUserInfo((prev) => ({ ...prev, password: "000000" }));
    } else if (setType === 2) {
      setSignupUserInfo((prev) => ({ ...prev, name: value }));
    } else if (setType === 3) {
      setSignupUserInfo((prev) => ({ ...prev, nickName: value }));
    } else if (setType === 4) {
      setSignupUserInfo((prev) => ({ ...prev, birth: value }));
    } else if (setType === 5) {
      setSignupUserInfo((prev) => ({ ...prev, email: value }));
    } else if (setType === 6) {
      setSignupUserInfo((prev) => ({ ...prev, phoneNumber: value }));
    } else if (setType === 7) {
      setSignupUserInfo((prev) => ({ ...prev, code: value }));
    }
  };

  return (
    <div className="flex items-center mx-8 justify-around h-full text-center text-s">
      {step === 1 && (
        <SignupTypeSelect
          userType={signupUserInfo?.role}
          onNextStep={nextStep}
          onSetInfo={handleSetInfo}
          step={step}
        />
      )}
      {step === 2 && (
        <SignupQuestion
          onNextStep={nextStep}
          question="이름을 알려주세요."
          onSetInfo={handleSetInfo}
          step={step}
        />
      )}
      {step === 3 && (
        <SignupQuestion
          onNextStep={nextStep}
          question="닉네임을 알려주세요."
          onSetInfo={handleSetInfo}
          step={step}
        />
      )}
      {step === 4 && (
        <SignupQuestion
          onNextStep={nextStep}
          question="생년월일을 알려주세요."
          caption="예) 20101231"
          onSetInfo={handleSetInfo}
          step={step}
        />
      )}
      {step === 5 && (
        <SignupQuestion
          onNextStep={nextStep}
          question="이메일 주소를 알려주세요."
          onSetInfo={handleSetInfo}
          step={step}
        />
      )}
      {step === 6 && (
        <SignupQuestion
          onNextStep={nextStep}
          question="전화번호를 알려주세요."
          caption="예) 01012345678"
          onSetInfo={handleSetInfo}
          step={step}
        />
      )}
      {step === 7 && (
        <SignupQuestion
          onNextStep={nextStep}
          question="인증번호를 입력하세요."
          onSetInfo={handleSetInfo}
          step={step}
        />
      )}
    </div>
  );
};

export default SignupForm;
