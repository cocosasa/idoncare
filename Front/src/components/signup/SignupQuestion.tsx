import pencil from "../../assets/imgs/signup/pencil.png";
import smile from "../../assets/imgs/signup/smile.png";
import { FormEvent, useEffect, useRef, useState } from "react";
import FullBtn from "../common/FullBtn";

type Question = string;
type Answer = string;
type Caption = string;
type Step = number;

interface SignupQuestionProps {
  question: Question;
  answer?: Answer;
  caption?: Caption;
  onNextStep: () => void;
  onSetInfo: (setType: number, value: string) => void;
  step: Step;
}

const SignupQuestion = ({
  onNextStep,
  question,
  answer = "",
  caption = "",
  onSetInfo,
  step,
}: SignupQuestionProps) => {
  const regex = [
    /^.*$/,
    /^.*$/,
    /^[가-힣]{2,6}$/,
    /^[가-힣]{2,6}$/,
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
    /^\d{6}$/,
  ];
  const placeholder = [
    "",
    "",
    "홍길동",
    "닉네임",
    "20101231",
    "example@co.kr",
    "01012345678",
    "123456",
  ];
  const [answerText, setAnswerText] = useState<string>(answer);
  const handleCheckValid = () => {
    if (regex[step].test(answerText)) {
      return true;
    }
    return false;
  };
  const handleSetInfo = (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    if (!handleCheckValid()) {
      return;
    }
    onSetInfo(step, answerText);
    onNextStep();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="relative rounded-[30px] bg-red-50 w-[220px] h-[80px] p-[20px] mb-[40px] flex items-center">
        <img
          className="absolute w-[100px] h-[100px] top-[-80px]"
          src={smile}
          alt="smile img"
        />
        <div className="flex-col">
          <p className="text-m">{question}</p>
          <p className={`${caption === undefined && "hidden"} text-s flex`}>
            {caption}
          </p>
        </div>
      </div>

      <form className="flex justify-end" onSubmit={handleSetInfo}>
        <div className="flex items-center justify-end bg-main rounded-[20px] w-[280px] h-[40px] pl-[10px] pr-[10px]">
          <input
            className="w-full h-full text-white bg-transparent text-m p-[5px] outline-none no-underline px-6"
            type="text"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            maxLength={20}
            placeholder={placeholder[step]}
            ref={inputRef}
          />
          <img className="w-[20px] h-[20px]" src={pencil} alt="편집 이미지" />
        </div>
      </form>
      <div
        className="absolute bottom-0 w-[calc(100%-40px)] left-[20px]"
        onClick={handleSetInfo}
      >
        <FullBtn
          buttonText="다음"
          buttonLink="/signup"
          className="w-full"
          isDone={handleCheckValid()}
        />
      </div>
    </div>
  );
};

export default SignupQuestion;
