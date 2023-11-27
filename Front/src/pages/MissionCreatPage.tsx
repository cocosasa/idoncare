import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { userToken } from "../store/common/selectors";
import { myId } from "../store/common/selectors";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { baseUrl } from "../apis/url/baseUrl";
import { createMissionData } from "../store/mission/atoms";
import KidSelectForm from "../components/common/KidSelectForm";
import MissionSetName from "../components/mission/MissionSetName";
import PocketMoneySendForm from "../components/pocketmoney/PocketSendForm";
import MissionMsgForm from "../components/mission/MissionMsgForm";
import FullBtn from "../components/common/FullBtn";
import MoneyDone from "../components/pocketmoney/MoneyDone";
import Header from "../components/common/Header";

const MissionCreate: React.FC = () => {
  const token = useRecoilValue(userToken);
  const parentId = useRecoilValue(myId);
  const [step, setStep] = useState(1);
  const [childUserId, setChildUserId] = useState<number | null>(null);
  const [childUserName, setChildUserName] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [beforeMessage, setBeforeMessage] = useState<string>("");
  const [missionData, setMissionData] = useRecoilState(createMissionData);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const onNextKidSelectForm = (childUserId: number, childUserName: string) => {
    console.log("자녀 선택:", childUserId, childUserName);
    setChildUserId(childUserId);
    setChildUserName(childUserName);
    nextStep();
  };

  const onNextPocketMoneySendForm = (selectedAmount: number) => {
    setAmount(selectedAmount);
    console.log("금액:", selectedAmount);
    nextStep();
  };

  const onNextPocketMsgSetForm = (message: string) => {
    setBeforeMessage(message);
    console.log("메세지:", message);
    nextStep(message);
  };
  
  const nextStep = (message?: string) => {
    if (step === 4) {
      axios
        .post(
          baseUrl + "api/mission/regist",
          {
            parentId,
            childIds: [childUserId],
            title: missionData.title,
            amount,
            beforeMessage: message,
          },
          AxiosHeader({ token })
        )
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data);
            console.log(beforeMessage)
            setIsSuccess(true);
          } else {
            console.error("Server error:", response.data);
            setIsSuccess(false);
          }
        })

        .catch((error) => {
          console.error("Error:", error);
          setIsSuccess(false);
        });
    }

    setStep(step + 1);
  };
  

  let form;
  switch (step) {
    case 1:
      form = (
        <KidSelectForm onNext={onNextKidSelectForm} pageTitle="미션 등록" />
      );
      break;
    case 2:
      form = (
        <div className="flex flex-col h-screen pb-60">
          <Header pageTitle="미션 등록" headerType="normal" headerLink="/" />

          <div className="m-10 text-center flex-grow">
          <MissionSetName
  missionData={missionData}
  setMissionData={(newTitle) => setMissionData({ ...missionData, title: newTitle.title })}
/>


          </div>
          <FullBtn
            isDone={!!missionData.title}
            onClick={() => {
              if (missionData.title) {
                nextStep();
                console.log(missionData.title);
              }
            }}
          />
        </div>
      );
      break;

    case 3:
      form = <PocketMoneySendForm onNext={onNextPocketMoneySendForm} />;
      break;
    case 4:
      if (childUserName && amount) {
        form = (
          <MissionMsgForm
            kname={childUserName}
            smoney={amount}
            onNext={onNextPocketMsgSetForm}
          />
        );
      } else {
        form = (
          <MissionMsgForm
            kname="자녀"
            smoney={0}
            onNext={onNextPocketMsgSetForm}
          />
        );
      }
      break;

    case 5:
      form = (
        <MoneyDone
          title={isSuccess ? "미션 등록 완료" : "미션 등록 실패"}
          content={
            <>
              <div className="text-m mb-6">{childUserName}</div>
              <div className="text-m">{missionData.title}</div>
              {/* <div>{beforeMessage}</div> */}
              <div className="text-m text-main">{amount}원</div>
            </>
          }
          ps={
            isSuccess
              ? "미션 등록을 완료했습니다."
              : "미션 등록에 실패했습니다."
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

export default MissionCreate;
