import { Link } from "react-router-dom";
import Icon, { ICON_NAME } from "../components/common/Icon";
import BottomNav from "../components/common/BottomNav";
import Profile from "./../components/common/Profile";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../apis/url/baseUrl";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { userToken } from "../store/common/selectors";
import Header from "./../components/common/Header";

type Menu = {
  title: string;
  link: string;
  icon: ICON_NAME;
};

interface MyData {
  userId: number;
  nickname: string;
  name: string;
  role: string;
  phoneNumber: string;
}

const boxMenus: Menu[] = [
  {
    title: "내 지갑",
    link: "/wallet",
    icon: "wallet",
  },
  {
    title: "설정",
    link: "/mypage",
    icon: "settings",
  },
  {
    title: "로그아웃",
    link: "/login",
    icon: "logout",
  },
];

const menus: Menu[] = [
  {
    title: "알림확인하기",
    link: "/mypage",
    icon: "alert",
  },
  {
    title: "결제하기",
    link: "/purchase",
    icon: "purchase",
  },
  {
    title: "용돈 관리",
    link: "/pocketMoney",
    icon: "pocketMoney",
  },
  {
    title: "미션 관리",
    link: "/mission",
    icon: "mission",
  },
  {
    title: "충전하기",
    link: "/wallet/recharge",
    icon: "recharge",
  },
  {
    title: "송금하기",
    link: "/transfer/account",
    icon: "send",
  },
  {
    title: "거래내역 검색하기",
    link: "/wallet/search",
    icon: "search",
  },
  {
    title: "활동 보고서",
    link: "/report",
    icon: "report",
  },
  // {
  //   title: "멤버 관리",
  //   link: "/member",
  //   icon: "member",
  // },
  {
    title: "결제 비밀번호 설정하기",
    link: "/mypage",
    icon: "reset",
  },
];

function MyPage() {
  const [myData, setMyData] = useState<MyData | null>(null);
  const token = useRecoilValue(userToken);

  useEffect(() => {
    axios.get(baseUrl + `api/user`, AxiosHeader({ token })).then((res) => {
      console.log(res.data);
      setMyData(res.data.data);
    });
  }, []);

  return (
    <div>
      <Header pageTitle="메뉴" />
      <div className="flex-col">
        <Profile
          size="medium"
          profileImage=""
          type={myData?.role}
          profileName={myData?.name}
        />
      </div>
      <div className="flex-col flex justify-center">

      {/* <div className="bg-soft text-dark rounded-3xl px-4 py-2">
        {myData?.role == "PARENT" ? "부모" : "자녀"}
      </div> */}
      <div className="text-center text-main text-s my-4">
        {myData?.phoneNumber}
      </div>
      </div>
      <div className="flex justify-center gap-5 my-10">
        {boxMenus.map((item, index) => {
          return (
            <Link
              to={item.link}
              key={index}
              className="bg-gray w-[25%] rounded-xl text-center p-2"
            >
              <Icon name={item.icon} className="mx-auto" size="large" />
              <span className="text-2xl">{item.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="my-10 mx-10">
        {menus.map((menu, index) => {
          return (
            <div key={index} className="my-4 text-dark">
              <Link
                to={menu.link}
                className="flex items-center gap-3 shadow p-2"
              >
                <Icon name={menu.icon} size="medium"></Icon>
                <span className="text-2xl text-black">{menu.title}</span>
              </Link>
            </div>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}

export default MyPage;
