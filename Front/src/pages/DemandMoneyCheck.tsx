import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import YesNoBtn from "../components/common/YesNoBtn";
import SmallBtn from "../components/pocketmoney/SmallBtn";
import KidDemandedDetail from "../components/pocketmoney/KidDemandedDetail";
import MoneyDone from "../components/pocketmoney/MoneyDone";
import DemandCheckModal from "../components/pocketmoney/DemandCheckModal";
import { KidDemandedData } from "../components/pocketmoney/TypeDemand";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../store/common/selectors";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { baseUrl } from "../apis/url/baseUrl";
import { userBalanace } from "../store/wallet/atoms";
import BottomNav from "../components/common/BottomNav";

const DemandMoneyCheck: React.FC = () => {
  const token = useRecoilValue(userToken);
  const balance = useRecoilValue(userBalanace)
  const [requestData, setRequestData] = useState<KidDemandedData | null>(null);
  // const { pocketMoneyRequestId } = useParams<{ pocketMoneyRequestId: string }>();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const sendRequest = (type: string) => {
    axios
      .put(
        baseUrl + `api/pocketmoney/request`,
        {
          pocketMoneyRequestId: Number(pocketMoneyRequestId),
          type,
        },
        AxiosHeader({ token })
      )
      .then((response) => {
        // console.log(response);

        if (response.data.code === 200 && type === "ACCEPT") {
          setIsAccepted(true);
          setIsModalOpen(false);
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsSuccess(false);
            });
  };

  const handleAccept = () => {
    sendRequest("ACCEPT");
    setIsAccepted(true);
  };

  const handleOpenModal = () => {
    sendRequest("REJECT");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { pocketMoneyRequestId } = useParams<{
    pocketMoneyRequestId: string;
  }>();

  useEffect(() => {
    axios
      .get(
        baseUrl + `api/pocketmoney/request?pageNum=1`,
        AxiosHeader({ token })
      )
      .then((response) => {
        console.log(response);
        setRequestData(
          response.data.data.list[Number(pocketMoneyRequestId) - 1]
        );
      })
      .catch((error) => console.error("Error:", error));
  }, [pocketMoneyRequestId, token]);

  if (isAccepted && requestData) {
    return (
      <MoneyDone
      title={isSuccess ? "용돈 보내기 완료" : "용돈 보내기 실패"}
      content={
        <>
          <div className="text-m">{requestData.child.name}</div>
          <div className="text-m text-main">{requestData.amount}원</div>
        </>
      }
      ps={isSuccess ? `남은 잔액: ${balance - (requestData.amount || 0)}원` : "통장 잔액이 부족합니다."}
      is_done={isSuccess}
          />
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-60">
      <Header pageTitle="용돈 요청 관리" headerType="normal" headerLink="/" />

      <div className="m-10 text-center flex flex-col flex-grow">
        <SmallBtn text="대기중" classes="mb-10 block mx-auto" />
        {requestData && <KidDemandedDetail data={requestData} />}

        <YesNoBtn
          yesLink=""
          onYesClick={handleAccept}
          onNoClick={handleOpenModal}
        />

{isModalOpen && requestData && (
  <DemandCheckModal onClose={handleCloseModal} name={requestData.child.name} />
)}

      </div>
      <BottomNav />
    </div>
  );
};

export default DemandMoneyCheck;
