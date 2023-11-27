import { atom } from "recoil";

export const SignupCode = atom<string | null>({
  key: "SignupCode",
  default: "",
});
