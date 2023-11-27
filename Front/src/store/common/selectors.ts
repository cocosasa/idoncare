import { selector } from "recoil";
import { userData } from "./atoms";

export const isLogin = selector({
  key: "isLogin",
  get: ({ get }) => get(userData)?.accessToken !== null,
});

export const userToken = selector({
  key: "UserToken",
  get: ({ get }) => get(userData).accessToken,
  set: ({ set, get }, newValue) => {
    set(userData, { ...get(userData), accessToken: newValue!.toString() });
  },
});

export const myRole = selector({
  key: "myRole",
  get: ({ get }) => get(userData).role,
});

export const isParent = selector({
  key: "isParent",
  get: ({ get }) => get(userData).role == "PARENT",
});

export const myId = selector({
  key: "myId",
  get: ({ get }) => get(userData).userId,
});
