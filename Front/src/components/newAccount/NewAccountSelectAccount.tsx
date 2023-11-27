import { useState } from "react";
import FullBtn from "../common/FullBtn";
import NewAccountCheckBox from "./common/NewAccountCheckBox";
import NewAccountHeader from "./common/NewAccountHeader";
import { NewAccountCreate } from "../../types/NewAccountCreateProps";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../../store/common/selectors";
import AccountSelectForm from "../wallet/AccountSelectForm";
import {
  resistRechargeAccountInput,
  sendAccountBank,
} from "../../store/wallet/atoms";
import { baseUrl } from "../../apis/url/baseUrl";
import AxiosHeader from "../../apis/axios/AxiosHeader";

const NewAccountSelectAccount = ({ onChangeStep, step }: NewAccountCreate) => {
  const [withdrawServiceAgree, setWithdrawServiceAgree] = useState(false);
  const [finDataAgree, setFinDataAgree] = useState(false);
  const [privateFinDataAgree, setPrivateFinDataAgree] = useState(false);
  const handleWithdrawServiceAgree = () =>
    setWithdrawServiceAgree(!withdrawServiceAgree);
  const handleFinDataAgree = () => setFinDataAgree(!finDataAgree);
  const handlePrivateFinDataAgree = () =>
    setPrivateFinDataAgree(!privateFinDataAgree);

  const token = useRecoilValue(userToken);

  const accountNum = useRecoilValue(resistRechargeAccountInput);
  const bank = useRecoilValue(sendAccountBank);

  const [errorMsg, setErrorMessage] = useState("");

  const accountValidCheck = () => {
    axios
      .post(
        baseUrl + `api/account/valid`,
        {
          bankCodeStd: bank?.bankId,
          bankName: bank?.bankName,
          accountNum: accountNum,
        },
        AxiosHeader({ token })
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.data == null) {
          console.log(res.data.error);
          setErrorMessage(res.data.error);
          return;
        }
        onChangeStep(3);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col text-m">
      <NewAccountHeader step={step} />
      <div className="my-6 text-center text-red-600">{errorMsg}</div>
      <AccountSelectForm btn={false} />
      <NewAccountCheckBox
        text="출금서비스(은행) 약관 동의"
        isCheck={withdrawServiceAgree}
        onToggle={handleWithdrawServiceAgree}
      />
      <NewAccountCheckBox
        text="금융정보조회 이용 동의"
        isCheck={finDataAgree}
        onToggle={handleFinDataAgree}
      />
      <NewAccountCheckBox
        text="금융정보 제3자 제공 동의"
        isCheck={privateFinDataAgree}
        onToggle={handlePrivateFinDataAgree}
      />
      <div
        onClick={() => {
          accountValidCheck();
        }}
      >
        <FullBtn
          buttonText="다음"
          isDone={withdrawServiceAgree && finDataAgree && privateFinDataAgree}
        />
      </div>
    </div>
  );
};

export default NewAccountSelectAccount;
