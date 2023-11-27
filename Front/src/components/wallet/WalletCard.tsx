import Icon, { ICON_NAME } from "../common/Icon";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { userToken } from "../../store/common/selectors";
import useComma from "./../../hooks/useComma";
import { userBalanace } from "../../store/wallet/atoms";
import { baseUrl } from "../../apis/url/baseUrl";
import AxiosHeader from "../../apis/axios/AxiosHeader";

type CardButtonType = {
  text: string;
  icon: ICON_NAME;
  link: string;
};

const cardButton: CardButtonType[] = [
  {
    link: "/wallet",
    text: "거래내역",
    icon: "wallet",
  },
  {
    link: "/wallet/recharge",
    text: "충전",
    icon: "recharge",
  },
  {
    link: "/transfer/account",
    text: "송금",
    icon: "send",
  },
];

interface CardButtonProps {
  item: CardButtonType;
}

const CardButton: React.FC<CardButtonProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="h-10" onClick={() => navigate(item.link)}>
      <div className="px-5">
        <Icon size="small" name={item.icon} />
      </div>
      <div className="w-20 text-t">{item.text}</div>
    </div>
  );
};

function WalletCard() {
  const navigate = useNavigate();

  const token = useRecoilValue(userToken);

  const [balance, setBalance] = useRecoilState(userBalanace);

  useEffect(() => {
    axios
      .get(baseUrl + `api/virtual/balance`, AxiosHeader({ token }))
      .then((res) => {
        console.log(res.data);
        if (res.data.data.balance == null) {
          setBalance(0);
        } else {
          setBalance(res.data.data.balance);
        }
      });
  }, [token, setBalance]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="pt-8 p-6 text-white h-[140px] [background:linear-gradient(270deg,_#1c51ad_20%,_rgba(28,_81,_173,_0.3))]">
        <div
          className="ml-3 text-m whitespace-nowrap"
          onClick={() => {
            navigate("/wallet");
          }}
        >
          <div>잔액</div>
          <div className="text-l">{useComma(balance)} 원</div>
        </div>
        <div className="flex justify-between mx-2 my-4 text-center">
          {cardButton.map((item, index) => {
            return <CardButton item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default WalletCard;
