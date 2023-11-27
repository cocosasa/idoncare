import { useSetRecoilState } from "recoil";
import { BottomSheet } from "../common/BottomSheet";
import { BottomSheetOpen } from "../../store/common/atoms";
import MissionBox from "./MissionBox";
import { CreateMissionData } from "../../store/mission/atoms";

interface MissionSetNameProps {
  missionData: CreateMissionData;
  setMissionData: (data: CreateMissionData) => void;
}


function MissionSetName({ missionData, setMissionData }: MissionSetNameProps) {
  const setBottomSheetOpen = useSetRecoilState(BottomSheetOpen);

  return (
    <div>
      <div className="text-l text-center my-6">어떤미션인가요?</div>
      <div className="my-10 bg-gray rounded-3xl p-8 gap-4 flex-col flex text-s">
        <input
          type="text"
          placeholder="미션이름"
          value={missionData.title}
          className="bg-white w-full rounded-xl p-3 text-center"
          onChange={(event) => {
            setMissionData({
              ...missionData,
              title: event.target.value,
            });
          }}
        ></input>
        <div
          className="bg-soft rounded-xl text-center p-3"
          onClick={() => {
            setBottomSheetOpen(true);
          }}
        >
          미션 선택하기
        </div>
      </div>

      <BottomSheet>
        <MissionBox />
      </BottomSheet>
    </div>
  );
}

export default MissionSetName;