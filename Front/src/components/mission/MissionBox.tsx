import Chip from "../common/Chip";
import { useState } from "react";
import MissionCard, { MissionCardType } from "./MissionCard";

export type MissionCategoryType =
  | "Recent"
  | "excercise"
  | "study"
  | "family"
  | "living"
  | "pet";

export type MissionCategory = {
  type: MissionCategoryType;
  text: string;
};

const categorys: MissionCategory[] = [
  {
    type: "Recent",
    text: "최근",
  },
  {
    type: "excercise",
    text: "운동하기",
  },
  {
    type: "study",
    text: "공부하기",
  },
  {
    type: "family",
    text: "가족",
  },
  {
    type: "living",
    text: "바른생활",
  },
  {
    type: "pet",
    text: "애완동물",
  },
];

const missionCards: {
  category: MissionCategoryType;
  list: MissionCardType[];
}[] = [
  {
    category: "Recent",
    list: [
      {
        title: "설거지하기",
        img: "/mission/1.png",
      },
    ],
  },
  {
    category: "excercise",
    list: [
      {
        title: "운동하기",
        img: "/mission/2.png",
      },
      {
        title: "자전거 타기",
        img: "/mission/3.png",
      },
      {
        title: "태권도 학원가기",
        img: "/mission/4.png",
      },
      {
        title: "수영장 가기",
        img: "/mission/5.png",
      },
    ],
  },
  {
    category: "family",
    list: [
      {
        title: "동생 돌보기",
        img: "/mission/6.png",
      },
      {
        title: "커피 타주기",
        img: "/mission/7.png",
      },
      {
        title: "안마해주기",
        img: "/mission/8.png",
      },
      {
        title: "포옹하기",
        img: "/mission/9.png",
      },
    ],
  },
  {
    category: "study",
    list: [
      {
        title: "숙제하기",
        img: "/mission/10.png",
      },
      {
        title: "책 읽기",
        img: "/mission/11.png",
      },
      {
        title: "학습지 풀기",
        img: "/mission/12.png",
      },
      {
        title: "영단어 외우기",
        img: "/mission/13.png",
      },
    ],
  },
  {
    category: "living",
    list: [
      {
        title: "양치질 하기",
        img: "/mission/14.png",
      },
      {
        title: "설거지 하기",
        img: "/mission/15.png",
      },
      {
        title: "빨래 하기",
        img: "/mission/16.png",
      },
      {
        title: "요리해서 밥차리기",
        img: "/mission/17.png",
      },
    ],
  },
  {
    category: "pet",
    list: [
      {
        title: "강아지 산책시키기",
        img: "/mission/18.png",
      },
      {
        title: "강아지 밥 주기",
        img: "/mission/19.png",
      },
      {
        title: "강아지 목욕 시키기",
        img: "/mission/20.png",
      },
      {
        title: "고양이 놀아주기",
        img: "/mission/21.png",
      },
    ],
  },
];

function MissionBox() {
  const [currentCategory, setCurrentCategory] = useState(categorys[0].type);

  const handleCategory = (category: string) => {
    setCurrentCategory(category as MissionCategoryType);
  };
  return (
    <div>
      <div className="text-m text-center my-6">미션함</div>
      <div className="flex gap-5 overflow-x-auto no-scrollbar my-6">
        {categorys.map((category) => (
          <div className="flex-none">
            <Chip
              key={category.type}
              isSelected={currentCategory === category.type}
              category={category}
              handler={handleCategory}
            />
          </div>
        ))}
      </div>
      <div>
        {missionCards.map(
          (list, listIndex) =>
            list.category == currentCategory && (
              <div
                className="grid grid-cols-2 items-center px-4"
                key={listIndex}
              >
                {list.list.map((mission, index) => (
                  <div key={index}>
                    <MissionCard key={index} mission={mission} />
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default MissionBox;
