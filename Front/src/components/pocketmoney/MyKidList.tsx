import React, { useState, useEffect } from 'react';
import Kid from "../common/Kid"
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../../store/common/selectors";
import AxiosHeader from "../../apis/axios/AxiosHeader";
import { baseUrl } from "../../apis/url/baseUrl";

interface Relation {
  relationshipId: number;
  userId: number;
  userName: string;
  createdAt: Date;
}

interface Props {
  onKidsSelected?: (count: number) => void;
}

const MyKidList: React.FC<Props> = ({ onKidsSelected }) => {
  const token = useRecoilValue(userToken);
  const [selectedKids, setSelectedKids] = useState<string[]>([]);
  const [relationList, setRelationList] = useState<Relation[] | null>(null);

   const handleKidClick = (kidName: string) => {
    if (selectedKids.includes(kidName)) {
      setSelectedKids(selectedKids.filter(kid => kid !== kidName));
    } else {
      setSelectedKids([...selectedKids, kidName]);
    }
   }

   useEffect(() => {
    axios.get(baseUrl + "api/relationship", AxiosHeader({ token }))
      .then(response => {
        console.log(response.data);
        setRelationList(response.data.relationList);
      })
      .catch(error => console.error('Error:', error));
      
    if (onKidsSelected) onKidsSelected(selectedKids.length);
}, [selectedKids, token, onKidsSelected]);


   if (!relationList || relationList.length === 0) return <div className="text-m text-darkgray mt-72">연결된 자녀가 없습니다.</div>;

   return (
     <div className="flex">
       {relationList.map(relation =>
         <Kid 
           key={relation.relationshipId}
           onClick={() => handleKidClick(relation.userName)} 
           isSelected={selectedKids.includes(relation.userName)} 
           kname={relation.userName}
         />
       )}
     </div>
   );
}

export default MyKidList;
