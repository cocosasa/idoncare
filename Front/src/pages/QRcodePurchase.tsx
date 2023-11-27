import Header from "../components/common/Header";
import QRCode from "react-qr-code";
import { userBalanace } from "../store/wallet/atoms";
import { useRecoilValue } from "recoil";
import useComma from "../hooks/useComma";
import { myId } from "../store/common/selectors";
import { useParams } from "react-router";
import { ChangeEvent, useState } from "react";
import BottomNav from "../components/common/BottomNav";

export interface QRcodeDataPayload {
  userId: number;
  content: string;
  money: number;
  type: "PAYMENT";
}

function QRcodePurchase() {
  const balance = useRecoilValue(userBalanace);

  const userId = useRecoilValue(myId);

  const params = useParams();

  const [amount, setAmount] = useState(0);
  const [ready, setReady] = useState(false);

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <div>
      <Header
        pageTitle="QR 코드 결제"
        headerLink="/purchase"
        headerType="normal"
      />
      <div className="mx-8">
        <div
          className={`flex flex-col justify-center bg-darkgray rounded-2xl py-20 `}
        >
          <div
            className={`mx-auto ${
              amount || params.payType == "slow" ? "" : "opacity-10"
            }`}
          >
            <QRCode
              value={JSON.stringify({
                payType: params.payType,
                userId: userId,
                money: amount,
              })}
              level="L"
              size={200}
            />
          </div>
          {params.payType == "fast" && (
            <div
              className={`text-white text-center mt-4 text-m ${
                amount ? "opacity-0" : ""
              }`}
            >
              금액을 설정해주세요
            </div>
          )}
        </div>
        <div className="text-s">
          <div className="bg-gray flex px-10 py-4 my-6 justify-between rounded-3xl">
            <div className="text-black">지갑잔액</div>
            <div className=" text-main ">{useComma(balance)} 원</div>
          </div>
          {params.payType == "fast" && (
            <div className="w-full h-[10vh] bg-gray  rounded-3xl flex items-center justify-center">
              {!ready ? (
                <div className="text-main" onClick={() => setReady(true)}>
                  눌러서 금액 입력
                </div>
              ) : (
                <div className="flex items-center px-2">
                  <input
                    type="number"
                    className="w-full bg-white rounded-lg text-end outline-0 m-3 p-2"
                    value={amount ? amount : undefined}
                    size={1}
                    maxLength={7}
                    onChange={handleAmount}
                  />{" "}
                  원
                </div>
              )}
            </div>
          )}
          {params.payType == "slow" && (
            <div className="w-full h-[10vh] bg-gray  rounded-3xl flex items-center justify-center">
              QR 코드를 찍어서 금액을 설정해주세요
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default QRcodePurchase;
