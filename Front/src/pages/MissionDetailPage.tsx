import Header from "../components/common/Header";
import MissionDetailContent from "../components/mission/MissionDetailContent";
import FullBtn from "../components/common/FullBtn";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken, myRole } from "../store/common/selectors";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { baseUrl } from "../apis/url/baseUrl";
import { MissionDetailType } from "../types/MissionTypes";
import BottomNav from "../components/common/BottomNav";


function MissionDetailPage() {
  const token = useRecoilValue(userToken);
  const role = useRecoilValue(myRole);
  const [missionData, setMissionData] = useState<MissionDetailType | null>(null);
  const { missionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseUrl + `api/mission/${missionId}`, AxiosHeader({ token }))
      .then((response) => {
        setMissionData(response.data.data);
        console.log(response.data.data);
      });
  }, [missionId, token]);

  let buttonText = '확인';
  let buttonLink = '/mission';
  let onClickHandler;

  if (role === 'PARENT' && missionData?.type === 'UNPAID') {
    buttonText = '미션급 지급하기';
    onClickHandler = () => onPay();
    buttonLink="";
    
} else if (role === 'CHILD' && missionData?.type === 'PROCESS') {
    buttonText = '완료하고 미션금 요청하기';
    onClickHandler=()=> onRequest();
    buttonLink="";
}

function onRequest() {
  const data ={
    missionId: missionId,
    afterMessage: "미션을 완료했어요!"
  };

  axios.put(baseUrl + "api/mission/status", data, AxiosHeader({token}))
    .then(() => {
      console.log("Payment successful");
      navigate('/mission');
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function onPay() {
  const data = {
    missionId: missionId,
  };

  axios.put(baseUrl + "api/mission/status", data, AxiosHeader({token}))
    .then(() => {
      console.log("Payment successful");
      // console.log(missionData);
      console.log(data);
      navigate('/mission');
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


  return (
    <div>
      <Header pageTitle="미션 상세보기" />
      <div className="mx-8">
        {missionData ? <MissionDetailContent mission={missionData} /> : null}

        <FullBtn
          buttonText={buttonText}
          buttonLink={buttonLink}
          onClick={onClickHandler}
        />
      </div>
      <BottomNav />
    </div>
  );
}

export default MissionDetailPage;
