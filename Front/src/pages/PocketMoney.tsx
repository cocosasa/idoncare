import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import KidDemandedList from "../components/pocketmoney/KidDemandedList";
import RegularMoneyBox from "../components/pocketmoney/RegularBox";
import RegularMoneyBoxEmpty from "../components/pocketmoney/RegularBoxEmpty";
import RegularBoxKid from "../components/pocketmoney/RegularBoxKid";
import SendMoneyBox from "../components/pocketmoney/MenuBox";

import axios from "axios";
import { useRecoilValue } from "recoil";
import { isParent, userToken } from "../store/common/selectors";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { baseUrl } from "../apis/url/baseUrl";
import BottomNav from "../components/common/BottomNav";

type KidDemandedData = {
  pocketMoneyRequestId: number;
  parent: {
    id: number;
    name: string;
  };
  child: {
    id: number;
    name: string;
  };
  amount: number;
  type: string;
};

type RegularMoneyData = {
  regularPocketMoneyId: number;
  childUserId: number;
  childName: string;
  type: string;
  cycle: number;
  amount: number;
  createdAt: string;
};

const PocketMoney: React.FC = () => {
  const token = useRecoilValue(userToken);

  const [kidDemandedList, setKidDemandedList] = useState<KidDemandedData[]>([]);
  const [regularPocketMoneyList, setRegularPocketMoneyList] = useState<
    RegularMoneyData[]
  >([]);

  const roleIsParent = useRecoilValue(isParent);

  const getRegularDate = (type: string, cycle: number) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    switch (type) {
      case "MONTH":
        return `매월 ${cycle}일`;
      case "WEEK":
        return `매주 ${daysOfWeek[cycle % 7]}요일`;
      case "DAY":
        return "매일";
      default:
        return "";
    }
  };

  const getStartDate = (createdAt: string) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 1);

    return date.toLocaleDateString();
  };

  useEffect(() => {
    axios
      .get(
        baseUrl + `api/pocketmoney/request?pageNum=1`,
        AxiosHeader({ token })
      )
      .then((response) => {
        const requestList = response.data.data.list.filter(
          (item: KidDemandedData) => item.type === "REQUEST"
        );
        setKidDemandedList(requestList);
      })
      .catch((error) => console.error("Error:", error));

    axios
      .get(baseUrl + `api/pocketmoney/regular`, AxiosHeader({ token }))
      .then((response) => {
        setRegularPocketMoneyList(response.data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, [token]);

  return (
    <div className="pb-60">
      <Header pageTitle="용돈" headerType="normal" headerLink="back" />
      <div className="m-8">
        {roleIsParent && (
          <div>
            <div className="pt-3 pb-3 mb-5 text-m font-strong">
              자녀가 요청한 용돈
            </div>
            <div className="ml-4">
              {kidDemandedList.map((demand) => (
                <KidDemandedList
                  key={demand.pocketMoneyRequestId}
                  name={demand.child.name}
                  amount={demand.amount.toString()}
                  pocketMoneyRequestId={demand.pocketMoneyRequestId}
                />
              ))}
              {!kidDemandedList.length && (
                <div className="text-center text-main text-s my-8">
                  요청 받은 용돈이 없어요
                </div>
              )}
            </div>

            <div className="flex justify-between text-s text-center">
              <SendMoneyBox
                link="/sendPocketMoney"
                bgColor="bg-yellow"
                textColor="text-white"
                text="용돈주기"
                classes="mr-4"
              />
              <SendMoneyBox
                link="/sendRegularMoney"
                bgColor="bg-sky"
                textColor="text-white"
                text={
                  <>
                    <p>정기용돈 주기</p>
                  </>
                }
              />
            </div>
          </div>
        )}

        {!roleIsParent && (
          <div>
            <div className="pt-3 pb-3 mb-5 text-m font-strong">
              내가 요청중인 용돈
            </div>

            <div className="ml-4">
              {kidDemandedList.map((demand) => (
                <KidDemandedList
                  key={demand.pocketMoneyRequestId}
                  name={demand.parent.name}
                  amount={demand.amount.toString()}
                  pocketMoneyRequestId={demand.pocketMoneyRequestId}
                />
              ))}
            </div>

            <div className="flex justify-between text-s text-center">
              <SendMoneyBox
                link="/kidDemandMoney"
                bgColor="bg-yellow"
                textColor="text-white"
                text="용돈조르기"
                classes="mr-4"
              />
              <SendMoneyBox
                link="/kidDemandMoneyList"
                bgColor="bg-sky"
                textColor="text-white"
                text={
                  <>
                    <p>용돈 요청 조회</p>
                  </>
                }
              />
            </div>
          </div>
        )}

        {roleIsParent && (
          <div>
            <div className="text-m mt-14 font-strong">정기 용돈 목록</div>
            {regularPocketMoneyList.length > 0 ? (
              regularPocketMoneyList.map((money) => (
                <RegularMoneyBox
                  regularPocketMoneyId={money.regularPocketMoneyId}
                  regularDate={getRegularDate(money.type, money.cycle)}
                  cname={money.childName}
                  amount={`${money.amount.toLocaleString()}원`}
                  startDate={getStartDate(money.createdAt)}
                />
              ))
            ) : (
              <RegularMoneyBoxEmpty />
            )}
          </div>
        )}

        {!roleIsParent && (
          <div>
            <div className="text-m mt-14 font-strong">정기 용돈 목록</div>
            {regularPocketMoneyList.length > 0 ? (
              regularPocketMoneyList.map((money) => (
                <RegularBoxKid
                  regularPocketMoneyId={money.regularPocketMoneyId}
                  regularDate={getRegularDate(money.type, money.cycle)}
                  cname={money.childName}
                  amount={`${money.amount.toLocaleString()}원`}
                  startDate={getStartDate(money.createdAt)}
                />
              ))
            ) : (
              <RegularMoneyBoxEmpty />
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default PocketMoney;
