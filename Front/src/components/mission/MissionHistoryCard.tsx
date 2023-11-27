import { MissionDataType } from "../../types/MissionTypes";
import MissionStateChip from "./MissionStateChip";
import { useNavigate } from 'react-router-dom';

function MissionHistoryCard({ mission }: { mission: MissionDataType }) {
  const navigate = useNavigate();
  return (
    <div className="my-4 mx-auto p-4 rounded-3xl w-[35vw] h-[40vw] flex-col shadow-[0_8px_15px_-2px_rgba(0,0,0,0.3)] shadow-blue-300 items-center" onClick={()=>{navigate(`detail/${mission.missionId}`)}}>
      <MissionStateChip state={mission.type} />
      <div className="mx-auto text-center text-s my-6">{mission.title}</div>
      <div className="mx-auto text-center text-m text-main">
        {mission.amount}
      </div>
    </div>
  );
}

export default MissionHistoryCard;
