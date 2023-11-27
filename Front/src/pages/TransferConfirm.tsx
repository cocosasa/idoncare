import Header from "../components/common/Header";
import TransferMsg from "./../components/wallet/TransferMsg";
import FullBtn from "./../components/common/FullBtn";
import axios from "axios";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userToken } from "../store/common/selectors";
import { selectedFamilyUser, transferData } from "../store/wallet/atoms";
import { baseUrl } from "../apis/url/baseUrl";
import AxiosHeader from "../apis/axios/AxiosHeader";
import useComma from "../hooks/useComma";
import { useNavigate, useParams } from "react-router";
import BottomNav from "../components/common/BottomNav";

function TransferConfirm() {
  const transferAccountData = useRecoilValue(transferData);
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();
  const params = useParams();
  const selectedFamilyData = useRecoilValue(selectedFamilyUser);
  const resetSelectedFamily = useResetRecoilState(selectedFamilyUser);

  const transferToFamily = () => {
    axios
      .post(
        baseUrl + `api/virtual`,
        {
          userId: selectedFamilyData?.userId,
          content: selectedFamilyData?.userName + "에게 입금",
          money: transferAccountData.amount,
          type: "TRANSFER",
        },
        AxiosHeader({ token })
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          navigate(
            {
              pathname: "/done",
            },
            {
              state: {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                title: `${useComma(transferAccountData.amount)} 원`,
                content: "송금 완료",
                ps: "성공적으로 송금되었습니다.",
              },
            }
          );
        } else if (res.data.code == 404) {
          navigate(
            {
              pathname: "/done",
            },
            {
              state: {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                title: `${useComma(transferAccountData.amount)} 원`,
                content: "송금 실패",
                ps: res.data.error,
                is_done: false,
              },
            }
          );
        }
        resetSelectedFamily()
      });
  };

  const transferMoney = () => {
    axios
      .post(
        baseUrl + `api/account/pay`,
        {
          name: transferAccountData?.account?.clientName,
          bankCode: transferAccountData?.account?.bankCodeStd,
          accountNum: transferAccountData?.account?.accountNum,
          printContent: transferAccountData?.account?.clientName + "에게 입금",
          tranAmt: transferAccountData.amount,
          type: "TRANSFER",
        },
        AxiosHeader({ token })
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          navigate(
            {
              pathname: "/done",
            },
            {
              state: {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                title: `${useComma(transferAccountData.amount)} 원`,
                content: "송금 완료",
                ps: "성공적으로 송금되었습니다.",
              },
            }
          );
        } else if (res.data.code == 404) {
          navigate(
            {
              pathname: "/done",
            },
            {
              state: {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                title: `${useComma(transferAccountData.amount)} 원`,
                content: "송금 실패",
                ps: res.data.error,
                is_done: false,
              },
            }
          );
        }
      });
  };
  return (
    <div>
      <Header pageTitle="보내기" />
      <div className="mx-8">
        <TransferMsg
          name={
            params.option == "family"
              ? selectedFamilyData?.userName
              : transferAccountData?.account?.clientName
          }
          amount={transferAccountData.amount}
        />
        <FullBtn
          buttonText="보내기"
          onClick={() => {
            if (params.option == "family") {
              transferToFamily();
            } else {
              transferMoney();
            }
          }}
        />
      </div>
      <BottomNav />
    </div>
  );
}

export default TransferConfirm;
