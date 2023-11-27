import { useRecoilState, useSetRecoilState } from "recoil";
import { createMissionData } from "../../store/mission/atoms";
import { BottomSheetOpen } from "./../../store/common/atoms";

export type MissionCardType = {
  title: string;
  img: string;
};

interface MissionCardProps {
  mission: MissionCardType;
}

function MissionCard({ mission }: MissionCardProps) {
  const [createMissionDataState, setCreateMissionData] =
    useRecoilState(createMissionData);

  const setBottomSheetOpen = useSetRecoilState(BottomSheetOpen);
  return (
    <div
      className="my-4 mx-auto p-4 rounded-3xl w-[35vw] h-[40vw] flex-col shadow-[0_8px_15px_-2px_rgba(0,0,0,0.3)] shadow-blue-300 items-center"
      onClick={() => {
        setCreateMissionData({
          ...createMissionDataState,
          title: mission.title,
        });
        setBottomSheetOpen(false);
      }}
    >
      <div className="mx-auto text-center text-s my-6">{mission.title}</div>
      {/* <img src="/mission/1.png" alt="Icon" className="w-32" /> */}
      <img src={mission.img} alt="MissionIcon" className="w-32" />
    </div>
  );
}

export default MissionCard;
