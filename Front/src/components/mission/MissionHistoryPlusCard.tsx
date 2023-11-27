import { useNavigate } from "react-router-dom";

function MissionHistoryPlusCard() {
  const navigate = useNavigate();
  return (
    <div className="my-4 mx-auto p-4 rounded-3xl w-[35vw] h-[40vw] flex-col shadow-[0_8px_15px_-2px_rgba(0,0,0,0.3)] shadow-blue-300 items-center flex justify-center gap-2" onClick={()=>{navigate("create")}}>
      <div className="text-s">새로운 미션
      </div>
      <div className="text-main text-l">+</div>
    </div>
  );
}

export default MissionHistoryPlusCard