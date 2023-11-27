import { useNavigate } from "react-router";
import FullBtn from "../common/FullBtn";
import NewAccountInput from "./common/NewAccountInput";
import NewAccountARSHelp from "./NewAccountARS/NewAccountARSHelp";
import NewAccountText from "./NewAccountARS/NewAccountText";
import { useState } from "react";

const NewAccountARS = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (value: string | number) => {
    setEmail(value as string);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    <div className="flex flex-col text-m">
      <NewAccountARSHelp />
      <div className="flex flex-col items-center justify-center bg-gray pt-[20px] pb-[10px] text-s px-[10px] my-[10px]">
        <NewAccountText arsTextIndex={0} />
        <NewAccountInput
          placeholder="example@idoncare.co.kr"
          changeValue={handleEmailChange}
          value={email}
        />
        <NewAccountText arsTextIndex={1} />
      </div>
      <FullBtn
        buttonText="ARS 출금 동의 완료"
        isDone={emailRegex.test(email)}
        className="mb-4"
        onClick={() => {
          navigate(
            {
              pathname: "/done",
            },
            {
              state: {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                title: `충전 계좌 등록 완료`,
                content: "성공적으로 계좌가 등록 되었습니다.",
                ps: "",
              },
            }
          );
        }}
      />
    </div>
  );
};

export default NewAccountARS;
