import { atom } from "recoil";

export type MobileSort = "SK" | "KT" | "LG";

interface AuthenticationData {
  phoneNumber: number | null;
  birth: number | null;
  mobileSort: MobileSort | null;
  name: string | null;
}

interface BankValidationData {
  bankCodeStd: number | null;
  accountNum: number | null;
}

export const authenticationData = atom<AuthenticationData>({
  key: "authenticationData",
  default: {
    phoneNumber: null,
    birth: null,
    mobileSort: null,
    name: "",
  },
});

export const bankValidationData = atom<BankValidationData>({
  key: "bankValidationData",
  default: {
    bankCodeStd: null,
    accountNum: null,
  },
});
