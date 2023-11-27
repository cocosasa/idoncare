import { MissionStateName, MissionStateType } from "../../types/MissionTypes";

interface MissionStateChipProps {
  state: MissionStateType;
}

enum StateChipStyle {
  REQUEST = "bg-soft text-thick",
  PROCESS = "bg-main text-white",
  UNPAID = "bg-dark text-white",
  COMPLETE = "bg-thick text-white",
  ALL = "bg-light text-white",
}

function MissionStateChip({ state }: MissionStateChipProps) {
  return (
    <div
      className={`w-[16vw] mx-auto text-center rounded-xl ${StateChipStyle[state]}`}
    >
      {MissionStateName[state]}
    </div>
  );
}

export default MissionStateChip;
