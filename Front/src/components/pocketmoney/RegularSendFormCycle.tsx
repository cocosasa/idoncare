import React, { useState } from "react";
import Header from "../common/Header";
import FullBtn from "../common/FullBtn";

interface Props {
  onNext: (type: string, cycle: number) => void;
}

const RegularSendFormCycle: React.FC<Props> = ({ onNext }) => {
  const [type, setType] = useState<string | null>(null);
  const [cycle, setCycle] = useState<number | null>(null);

  const handleTypeChange = (selectedType: string) => {
    setType(selectedType);
    setCycle(null);

    if (selectedType === "DAY") {
      setCycle(1);
    }
  };

  const handleCycleChange = (selectedCycle: number) => {
    setCycle(selectedCycle);
  };

  const handleNextClick = () => {
    if (type && cycle) {
      onNext(type, cycle);
    }
  };

  return (
    <div className="flex flex-col h-screen pb-60">
      <Header pageTitle="정기용돈 등록" headerType="normal" headerLink="/" />
      <div className="mt-52 text-center flex-grow">
        <select
          style={{
            width: "50%",
            height: "40px",
            fontSize: "15px",
            marginBottom: "10px",
          }}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="">이체 주기를 선택해주세요.</option>
          <option value="DAY">매일</option>
          <option value="WEEK">매주</option>
          <option value="MONTH">매월</option>
        </select>

        {type === "WEEK" && (
          <>
            <br />
            <select
              style={{ width: "50%", height: "40px", fontSize: "15px" }}
              onChange={(e) => handleCycleChange(Number(e.target.value))}
            >
              <option value="" disabled selected>
                요일을 선택해주세요.
              </option>
              {[
                "월요일",
                "화요일",
                "수요일",
                "목요일",
                "금요일",
                "토요일",
                "일요일",
              ].map((dayOfWeek, i) => (
                <option key={i} value={i + 1}>
                  {dayOfWeek}
                </option>
              ))}
            </select>
          </>
        )}

        {type === "MONTH" && (
          <>
            <br />
            <select
              style={{ width: "50%", height: "40px", fontSize: "15px" }}
              onChange={(e) => handleCycleChange(Number(e.target.value))}
            >
              {/* disabled와 selected 속성 추가 */}
              <option value="" disabled selected>
                일자를 선택해주세요.
              </option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <FullBtn
        buttonText="다음"
        onClick={handleNextClick}
        isDone={!!(type && cycle)}
      />
    </div>
  );
};

export default RegularSendFormCycle;
