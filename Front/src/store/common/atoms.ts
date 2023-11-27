import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserData } from "../../types/UserData";

const { persistAtom } = recoilPersist({
  key: "sessionStorage", // 고유한 key 값
  storage: sessionStorage,
});

export const BottomSheetOpen = atom<boolean>({
  key: "BottomSheetOpen",
  default: false,
});

export const userData = atom<UserData>({
  key: "userData",
  default: {
    nickname: null,
    joined: true,
    userId: "12",
    email: null,
    accessToken: "",
    role: null,
  },
  effects_UNSTABLE: [persistAtom],
});
