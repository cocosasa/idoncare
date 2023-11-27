import { useState } from "react";
import Header from "../components/common/Header";
import RechargeInput from "../components/wallet/RechargeInput";
import RechargeAccountList from "../components/wallet/RechargeAccountList";
import FullBtn from "../components/common/FullBtn";
import axios from "axios";
import { userToken } from "../store/common/selectors";
import { useRecoilValue } from "recoil";
import { rechargeAccount } from "../store/wallet/atoms";
import { baseUrl } from "../apis/url/baseUrl";
import AxiosHeader from "../apis/axios/AxiosHeader";
import BottomNav from "../components/common/BottomNav";
import useComma from "../hooks/useComma";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

function WalletRecharge() {
  const token = useRecoilValue(userToken);
  const myRechargeAccount = useRecoilValue(rechargeAccount);
  const [rechargeAmount, setRechargeAmount] = useState(0);

  const navigate = useNavigate();

  const rechageMoney = () => {
    if (!myRechargeAccount) {
      return;
    }
    axios
      .post(
        baseUrl + `api/account/charge`,
        {
          pinNumber: myRechargeAccount?.pinNumber,
          money: rechargeAmount,
          type: "CHARGE",
        },
        AxiosHeader({ token })
      )
      .then((res) => {
        if (res.data.code == 200) {
          navigate(
            {
              pathname: "/done",
            },
            {
              state: {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                title: `${useComma(rechargeAmount)} 원`,
                content: "충전 완료",
                ps: "성공적으로 충전되었습니다.",
              },
            }
          );
        }
        else if (res.data.code == 404){
          navigate(
            {
              pathname: "/done",
            },
            {
              state: {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                title: `${useComma(rechargeAmount)} 원`,
                content: "충전 실패",
                ps: res.data.error,
                is_done: false,
              },
            }
            );
            toast('충전에 실패하였습니다.');
        }
      });
  };

  return (
    <div>
      <Header pageTitle="계좌 충전" headerLink="back" headerType="normal" />
      <div className="mx-8">
        <RechargeInput
          rechargeAmount={rechargeAmount}
          setRechargeAmount={setRechargeAmount}
        />
        <RechargeAccountList />
        <div onClick={rechageMoney}>
          <FullBtn buttonText="충전" />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default WalletRecharge;
