/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../components/common/Header";
import { useEffect, useState } from "react";
import { BarDatum, ResponsiveBar } from "@nivo/bar";
import useComma from "../hooks/useComma";
import axios from "axios";
import { baseUrl } from "../apis/url/baseUrl";
import Kids, { RelationType } from "../components/active/Kids";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { useRecoilValue } from "recoil";
import { userToken } from "../store/common/selectors";
import BottomNav from "../components/common/BottomNav";

type DataScale = "daily" | "monthly";

interface APIResult<T> {
  code: number;
  error: string;
  data: T;
}

interface UserType {
  userId: number;
  nickname: string;
  name: string;
  role: "CHILD" | "PARENT";
  phoneNumber: string;
}

interface DateOptions {
  label: string;
  value: DataScale;
}

const dateOptions: DateOptions[] = [
  { value: "daily", label: "일" },
  { value: "monthly", label: "월" },
];

interface ChartData extends BarDatum {
  day: string;
  earn: number;
  expend: number;
}

function Report() {
  const token = useRecoilValue(userToken);

  const [user, setUser] = useState<UserType>({
    name: "",
    nickname: "",
    phoneNumber: "",
    userId: 1,
    role: "CHILD",
  });
  const [dateScale, setDateScale] = useState<DataScale>("daily");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dailyData, setDailyData] = useState<Array<ChartData>>([]);
  const [monthlyData, setMonthlyData] = useState<Array<ChartData>>([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get<APIResult<UserType>>(
        `${baseUrl}api/user`,
        AxiosHeader({ token })
      );

      const { code, data } = result.data;

      if (code === 200) {
        setUser(data);

        if (data.role === "CHILD") {
          //아이 사용자의 경우 본인의 데이터만 바로 불러오면 된다
          (async () => {
            const result = await axios.get<APIResult<Array<ChartData>>>(
              `${baseUrl}api/virtual/active/daily`,
              AxiosHeader({ token })
            );

            const { code, data } = result.data;
            if (code === 200) {
              setDailyData(data);
            }
          })();

          (async () => {
            const result = await axios.get<APIResult<any>>(
              `${baseUrl}api/virtual/active/monthly`,
              AxiosHeader({ token })
            );

            const { code, data } = result.data;
            if (code === 200) {
              setMonthlyData(data.list);
            }
          })();
        }
      }
    })();
  }, []);

  const onClickChild = (child: RelationType) => {
    //해당 자녀를 선택하면 어떠한 행동을 할지 정의
    // -> 해당 자녀에 대한 일별, 월별 보고서 데이터 불러오기

    //일별 데이터 받아오기
    (async () => {
      const result = await axios.get<APIResult<Array<ChartData>>>(
        `${baseUrl}api/virtual/active/${child.userId}/daily`,
        AxiosHeader({ token })
      );

      const { code, data } = result.data;
      if (code === 200) {
        //성공적으로 불러 왔으면
        setDailyData(data);
      }
    })();

    //월별 데이터 받아오기
    (async () => {
      const result = await axios.get<APIResult<any>>(
        `${baseUrl}api/virtual/active/${child.userId}/monthly`,
        AxiosHeader({ token })
      );

      const { code, data } = result.data;
      if (code === 200) {
        //성공적으로 불러 왔으면
        setMonthlyData(data.list);
      }
    })();
  };

  return (
    <div>
      <Header pageTitle="활동보고서" />

      {user.role === "PARENT" && <Kids onClick={onClickChild} />}
      <div>
        <div className="flex p-2 justify-between">
          <div className="flex ml-5">
            <div className="flex items-center">
              <div className="bg-blue-600 w-4 h-4"></div>수입
            </div>
            <div className="flex items-center ml-2">
              <div className="bg-red-600 w-4 h-4"></div>지출
            </div>
          </div>
          <div className="flex px-2 py-2 bg-main rounded-3xl items-center leading-1">
            {dateOptions.map((item, index) => {
              return (
                <div
                  className={`px-6 py-0 rounded-3xl text-s  ${
                    dateScale == item.value
                      ? "bg-white text-main"
                      : "bg-main text-white"
                  }`}
                  key={index}
                  onClick={() => setDateScale(item.value)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-[40vh]">
          {dailyData.length !== 0 && (
            <BarChart data={dateScale === "daily" ? dailyData : monthlyData} />
          )}
        </div>
        {dailyData.length !== 0 && (
          <Summary
            data={dateScale === "daily" ? dailyData : monthlyData}
            dateScale={dateScale}
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
}

interface BarChartType {
  data: Array<ChartData>;
}

const BarChart = ({ data }: BarChartType) => {
  return (
    <ResponsiveBar
      data={data}
      indexBy="day"
      keys={["earn", "expend"]}
      groupMode="grouped"
      margin={{ top: 10, bottom: 50, left: 60, right: 10 }}
      colors={["rgb(37, 99, 235)", "rgb(220, 38, 38)"]}
      axisLeft={{
        tickSize: 0,
        tickValues: 5,
        format: (num: number) => useComma(num),
      }}
      axisBottom={{
        tickSize: 2,
        tickPadding: 5,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      innerPadding={5}
      padding={0.3}
      isInteractive={false}
      enableLabel={false}
      enableGridY={false}
    />
  );
};

interface SummaryType {
  data: Array<ChartData>;
  dateScale: DataScale;
}

const Summary = ({ data, dateScale }: SummaryType) => {
  const [summary1, setSummary1] = useState<string>("");
  const [summary2, setSummary2] = useState<string>("");
  const [summary3, setSummary3] = useState<string>("");

  const dailyDataSummary = () => {
    //일별 요약
    const earnDiff = data[6].earn - data[5].earn;
    if (earnDiff > 0) {
      setSummary1(`어제보다 ${useComma(earnDiff)}원 더 받았어요`);
    } else if (earnDiff === 0) {
      setSummary1(`어제와 똑같이 받았어요`);
    } else {
      setSummary1(`어제보다 ${useComma(Math.abs(earnDiff))}원 덜 받았어요`);
    }

    const sumOfEarn = data
      .map((d) => d.earn)
      .reduce((accu, curr) => accu + curr, 0);

    setSummary2(`지난 7일동안 ${useComma(sumOfEarn)}원을 벌었어요`);

    const sumOfExpend = data
      .map((d) => d.expend)
      .reduce((accu, curr) => accu + curr, 0);

    setSummary3(`지난 7일동안 ${useComma(sumOfExpend)}원을 사용했어요`);
  };

  const monthlyDataSummary = () => {
    //월별 요약
    const earnDiff = data[4].earn - data[3].earn;
    if (earnDiff > 0) {
      setSummary1(`저번달보다 ${useComma(earnDiff)}원 더 받았어요`);
    } else if (earnDiff === 0) {
      setSummary1(`저번달과 똑같이 받았어요`);
    } else {
      setSummary1(`저번달보다 ${useComma(Math.abs(earnDiff))}원 덜 받았어요`);
    }

    const averageEarn =
      data.map((d) => d.earn).reduce((accu, curr) => accu + curr, 0) / 5;
    setSummary2(
      `5개월 동안 평균 ${useComma(Math.ceil(averageEarn))}원을 받았어요`
    );

    const averageExpend =
      data.map((d) => d.expend).reduce((accu, curr) => accu + curr, 0) / 5;
    setSummary3(
      `5개월 동안 평균 ${useComma(Math.ceil(averageExpend))}원을 사용했어요`
    );
  };

  useEffect(() => {
    if (dateScale === "daily") {
      dailyDataSummary();
    } else {
      monthlyDataSummary();
    }
  }, [data, dateScale]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center bg-gray rounded-3xl h-24 m-3 text-2xl shadow-lg">
        {summary1}
      </div>
      <div className="flex justify-center items-center bg-gray rounded-3xl h-24 m-3 text-2xl shadow-lg">
        {summary2}
      </div>
      <div className="flex justify-center items-center bg-gray rounded-3xl h-24 m-3 text-2xl shadow-lg">
        {summary3}
      </div>
    </div>
  );
};

export default Report;
