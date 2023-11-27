import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BankDataType } from "../../types/WalletTypes";
import {
  resistRechargeAccountInput,
  sendAccountBank,
  transferData,
} from "../../store/wallet/atoms";
import { BottomSheet } from "../common/BottomSheet";
import BankGridList from "./BankGridList";
import { BottomSheetOpen } from "../../store/common/atoms";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../apis/url/baseUrl";
import { userToken } from "../../store/common/selectors";
import AxiosHeader from "../../apis/axios/AxiosHeader";

interface AccountSelectFormProps {
  btn?: boolean;
  setIsValid?: (isValid: boolean) => void;
}

function AccountSelectForm({
  btn = true,
  setIsValid = () => {},
}: AccountSelectFormProps) {
  const selectedBank = useRecoilValue<BankDataType | null>(sendAccountBank);
  const [accountNumberInput, setAccountNumberInput] = useRecoilState(
    resistRechargeAccountInput
  );

  const [transferAccountData, setTransferAccountData] =
    useRecoilState(transferData);

  const setBottomSheetOpen = useSetRecoilState(BottomSheetOpen);

  const [isValidAccount, setIsValidAccount] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const openSheet = () => setBottomSheetOpen(true);

  const handleAccountNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumberInput(Number(event.target.value));
    setIsChecked(false);
  };

  const token = useRecoilValue(userToken);
  const accountNum = useRecoilValue(resistRechargeAccountInput);
  const bank = useRecoilValue(sendAccountBank);

  useEffect(() => {
    setIsValid(isChecked && isValidAccount);
  }, [isChecked, isValidAccount]);

  const handleCheckAccount = () => {
    axios
      .post(
        baseUrl + `api/account/check`,
        {
          bankCodeStd: bank?.bankId,
          accountNum: accountNum,
        },
        AxiosHeader({ token })
      )
      .then((res) => {
        console.log(res.data);
        setIsChecked(true);
        if (res.data.code === 200) {
          setIsValidAccount(true);
          setTransferAccountData({
            amount: transferAccountData?.amount
              ? transferAccountData?.amount
              : 0,
            account: { ...res.data.data },
          });
        } else {
          setIsValidAccount(false);
        }
      });
  };

  return (
    <div className="my-6">
      <div
        className={`w-full bg-gray flex p-3 px-6 mt-10 rounded-lg text-m ${
          selectedBank?.bankName ? "text-black" : "text-mediumgray"
        } `}
        onClick={openSheet}
      >
        {selectedBank?.bankName ? selectedBank?.bankName : "은행 선택"}
      </div>

      <BottomSheet>
        <BankGridList />
      </BottomSheet>

      <input
        type="number"
        name="account"
        id="account"
        value={accountNumberInput ? accountNumberInput : undefined}
        onChange={handleAccountNumberInput}
        autoComplete="account"
        className="w-full flex-1 border-0 my-6 bg-gray p-3 rounded-lg text-m outline-0 outline outline-main outline-offset-0 focus:outline-2 placeholder:text-gray-400 focus:ring text-main"
        placeholder="계좌 번호를 입력해주세요"
      />
      {btn && (
        <div>
          <div className="flex justify-end">
            <div
              className="bg-light p-3 rounded-lg "
              onClick={handleCheckAccount}
            >
              계좌 확인
            </div>
          </div>
          {isChecked && (
            <div className="text-center my-6">
              {isValidAccount ? (
                <div className="bg-soft p-3 rounded-lg text-main">
                  {transferAccountData?.account?.clientName}님의 계좌입니다
                </div>
              ) : (
                <div className="bg-red-200 p-3 rounded-lg text-red-500">
                  계좌번호가 맞는지 확인해주세요
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AccountSelectForm;
