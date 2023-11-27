import React, { useEffect } from "react";
import { bankData } from "../../store/wallet/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import BankItem from "./BankItem";
import axios from "axios";
import { userToken } from "../../store/common/selectors";
import { baseUrl } from "../../apis/url/baseUrl";
import AxiosHeader from "../../apis/axios/AxiosHeader";

interface BankListInterface {}

const BankGridList: React.FC<BankListInterface> = () => {
  const bankList = useRecoilValue(bankData);

  const token = useRecoilValue(userToken);

  const setBankList = useSetRecoilState(bankData);

  useEffect(() => {
    axios
      .get(baseUrl + `api/account/bank`, AxiosHeader({ token }))
      .then((res) => {
        console.log(res.data);
        setBankList({ bankList: res.data.data });
      });
  }, []);

  return (
    <div className="mb-20">
      <div className="text-m text-center my-6">은행선택</div>
      <div className="grid grid-cols-3 gap-4">
        {bankList.bankList.map((bank, index) => {
          return <BankItem key={index} item={bank} />;
        })}
      </div>
    </div>
  );
};
export default BankGridList;
