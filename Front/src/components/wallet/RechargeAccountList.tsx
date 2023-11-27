import { useNavigate } from "react-router-dom";
import { rechargeAccount } from "../../store/wallet/atoms";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { isExistRechargeAccount } from "../../store/wallet/selectors";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import axios from "axios";
import { userToken } from "../../store/common/selectors";
import { RechargeAccountResponse } from "../../types/WalletTypes";
import { baseUrl, imageUrl } from "../../apis/url/baseUrl";
import AxiosHeader from "../../apis/axios/AxiosHeader";
import YesNoBtn from "../common/YesNoBtn";

export const EmptyAccount = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[80px] bg-gray rounded-xl flex-col flex items-center justify-center my-4">
      <div>충전 계좌 추가</div>
      <div
        onClick={() => {
          navigate("/newAccount");
        }}
      >
        +
      </div>
    </div>
  );
};

export const RechargeAccountComponent = () => {
  const myRechargeAccount = useRecoilValue(rechargeAccount);
  const resetRechargeAccount = useResetRecoilState(rechargeAccount);
  const Token = useRecoilValue(userToken);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleDeleteClick = () => {
    setModalIsOpen(true);
  };

  const handleCancelClick = () => {
    setModalIsOpen(false);
  };

  const handleRemoveAccount = () => {
    axios
      .delete(baseUrl + `api/account/`, {
        headers: { Authorization: Token as string },
        data: {
          bankCode: myRechargeAccount?.bankCode,
          realAccountId: myRechargeAccount?.realAccountId
        }
      })
      .then((res) => {
        if (res.data.code == 200) {
          resetRechargeAccount();
          return;
        } else {
          console.log(res.data.error);
        }
      });
    setModalIsOpen(false);
  };
  return (
    <div className="w-full h-[80px] px-8 my-4 bg-gray rounded-xl flex items-center justify-between ">
      <div className="flex">
        <div className="w-[40px] mr-6">
          <img className="" src={imageUrl + `/images/${myRechargeAccount?.bankName}.png`}></img>
        </div>
        <div className="flex flex-col justify-center text-t">
          <div>{myRechargeAccount?.bankName}</div>
          <div>{myRechargeAccount?.realAccountId}</div>
        </div>
      </div>
      <div
        className="flex rounded-md bg-red-50 px-4 p-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
        onClick={() => {
          handleDeleteClick();
        }}
      >
        삭제
      </div>
      {modalIsOpen && (
        <Modal>
          <div className="mt-10 mb-10">
            <p className="text-center text-m">출금 계좌 연결을 해제할까요?</p>
            <YesNoBtn noText="아니오" yesText="네" onNoClick={handleCancelClick} onYesClick={handleRemoveAccount} />
          </div>
        </Modal>
      )}
    </div>
  );
};

function RechargeAccountList() {
  const token = useRecoilValue(userToken);
  const setRechargeAccount = useSetRecoilState(rechargeAccount);
  useEffect(() => {
    if (!isRechargeAccount) {
      axios.get(baseUrl + `api/account/my`, AxiosHeader({ token })).then((res) => {
        console.log(res.data);
        if (res.data.error) {
          return;
        }
        const account: RechargeAccountResponse = res.data.data;
        setRechargeAccount({
          realAccountId: account.realAccountId,
          pinNumber: account.pinNumber,
          bankName: account.bankName,
          bankCode: account.bankCode
        });
      });
    }
  }, []);

  const isRechargeAccount = useRecoilValue(isExistRechargeAccount);

  return (
    <div className="my-6">
      <div className="flex justify-between text-s">
        <div>출금 계좌</div>
      </div>
      <div className="">{!isRechargeAccount ? <EmptyAccount /> : <RechargeAccountComponent />}</div>
      {!isRechargeAccount && <div className="text-center text-red-600">충전 계좌가 등록되지 않았습니다</div>}
    </div>
  );
}

export default RechargeAccountList;
