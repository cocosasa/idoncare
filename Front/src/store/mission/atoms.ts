import { atom } from "recoil";

export interface MissionData {
  missionId: number;
  parentId: number;
  childId: number;
  parentName: string;
  childName: string;
  title: string;
  amount: number;
  type: "REQUEST" | "PROCESS" | "UNPAID" | "COMPLETE";
}


export interface CreateMissionData {
  parentId: number;
  childIds: number[];
  title: string;
  amount: number;
  beforeMessage: string;
}

export const createMissionData = atom<CreateMissionData>({
  key: "createMissionData",
  default: {
    parentId : 0,
    childIds : [],
    title : "",
    amount : 0,
    beforeMessage : "",
},
});



export const selectedChildId = atom<number | null>({
  key: 'selectedChildId',
  default: 0,
});
