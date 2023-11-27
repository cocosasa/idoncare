import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userBalanace } from "../../store/wallet/atoms";
import useComma from "../../hooks/useComma";
import Icon, { ICON_NAME } from "../common/Icon";

const menus: {
  Title: string;
  subTitle: string;
  link: string;
  icon: ICON_NAME;
}[] = [
  {
    Title: "받는 쪽에서 금액 정하기",
    subTitle: "QR코드 생성해서 빠르게 돈 받기",
    link: "qrcode/fast",
    icon: "qr-code",
  },
  {
    Title: "주는 쪽에서 금액 정하기",
    subTitle: "QR코드 생성해서 돈 받기",
    link: "qrcode/slow",
    icon: "qr-code",
  },
  {
    Title: "카메라로 결제하기",
    subTitle: "QR코드 찍어서 결제",
    link: "camera",
    icon: "camera",
  },
];

function PurchaseBody() {
  const navigate = useNavigate();
  const balance = useRecoilValue(userBalanace);

  return (
    <div className="mt-20">
      <div className="w-[240px] h-[130px] mx-auto p-4 pb-6 rounded-2xl flex-col flex justify-between [background:linear-gradient(270deg,_#1c51ad_20%,_rgba(28,_81,_173,_0.3))] shadow-lg">
        <img
          src="/icons/icon-logo-2.png"
          alt="logo"
          className="w-[60px]"
        />
        <div className="text-end items-end">
          <div className="text-t text-mediumgray">잔액</div>
          <div className="text-white text-m">{useComma(balance)} 원</div>
        </div>
      </div>
      <div className="mt-20 text-xl">
        {menus.map((item, index) => {
          return (
            <div
              className="w-full mt-8 p-6 rounded-xl bg-gray flex shadow-xl"
              key={index}
              onClick={() => navigate(item.link)}
            >
              <div className="mx-4 flex items-center justify-center">
                <Icon name={item.icon} size="medium"/>
              </div>
              <div className="flex-col flex justify-center gap-1">
                <div className="text-gray-700 mb-2">{item.Title}</div>
                <div className="text-gray-500">{item.subTitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PurchaseBody;
