export type MissionStateType = "ALL" | "REQUEST" | "PROCESS" | "UNPAID" | "COMPLETE";

export enum MissionStateName {
  ALL = "모든 미션",
  REQUEST = "요청중",
  PROCESS = "진행중",
  UNPAID = "미지급",
  COMPLETE = "완료됨",
}

export type MissionDataType = {
  missionId: number;
  title: string;
  amount: number;
  type: MissionStateType;
  childId: number;
};

export type MissionList = MissionDataType[];

export type MissionResistType = {
  parentId: number;
  childIds: number[];
  title: string;
  amount: number;
  type: "REQUEST";
  beforeMessage?: string;
  afterMessage: string;
};

export type MissionDetailType = {
  missionId: number;
  parentName: string;
  childName: string;
  title: string;
  amount: number;
  type: "REQUEST" | "PROCESS" | "UNPAID" | "COMPLETE";
  message?: string; 
  createdAt: string;
  img?: string; 
};
