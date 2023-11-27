import MissionStateChip from './MissionStateChip';
import { MissionDetailType } from "../../types/MissionTypes";
// import useComma from '../../hooks/useComma';

function MissionDetailContent({ mission }: { mission: MissionDetailType | null }) {
  const missionImageMap = {
    "설거지하기": "/mission/1.png",
    "운동하기": "/mission/2.png",
    "자전거 타기": "/mission/3.png",
    "태권도 학원가기": "/mission/4.png",
    "수영장 가기": "/mission/5.png",
    "동생 돌보기": "/mission/6.png",
    "커피 타주기": "/mission/7.png",
    "안마해주기": "/mission/8.png",
    "포옹하기": "/mission/9.png",
    "숙제하기": "/mission/10.png",
    "책 읽기": "/mission/11.png",
    "학습지 풀기": "/mission/12.png", 
    "영단어 외우기":"/mission/13.png", 
    '양치질 하기':"/missions14/png", 
     '설거지 하기':"/missions15/png", 
     '빨래 하기':"/missions16/png", 
     '요리해서 밥차리기':"/missions17/png", 
     '강아지 산책시키기':"/missions18/png", 
     '강아지 밥 주기':"/missions19/png",  
     '강아지 목욕 시키 기' : '/missions20/png',  
      '고양이 놀아주 기' : '/missions21/png',
  };  

  if (!mission) return <div>No mission data</div>;

  const imagePath = mission.title && (missionImageMap as {[key: string]: string})[mission.title]
    ? (missionImageMap as {[key: string]: string})[mission.title]
    : '/icons/icon-emoji-1.png';
  
  return (
    <div className="mx-6 my-10">
      <div className="flex-col flex justify-center items-center gap-5">
      <MissionStateChip state={mission.type} />
        <div className="text-m">{mission.title}</div>

        {/* <img src={mission.img} alt="MissionIcon" className="w-32" /> */}
        {/* <img src={missionImageMap[mission.title]} alt="MissionIcon" className="w-32" /> */}
        <img src={imagePath} alt="MissionIcon" className="w-32" />


        {/* <div className="text-s text-thick">{useComma(mission.amount)} 원</div> */}
        <div className="text-s text-thick">{mission.amount} 원</div>
      </div>
      <div className="my-10 bg-gray rounded-3xl p-12 text-center text-m">
        {mission.message}
      </div>
      <div className="overflow-hidden rounded-3xl my-10">
        <div className="bg-mediumgray p-4 text-s text-center">{mission.childName}</div>
        <div className="py-4 bg-gray ">
  <table className="flex-col w-full text-center">
    <tbody>
      <tr>
        <td>요청일 </td>
        <td>{mission.createdAt}</td>
      </tr>
    </tbody>
  </table>


        </div>
      </div>
    </div>
  );
}

export default MissionDetailContent;
