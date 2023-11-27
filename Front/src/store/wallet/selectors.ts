import { selector } from "recoil";
import { bankData, rechargeAccount } from "./atoms";

export const firstBank = selector({
  key: "firstBank",
  get: ({ get }) => {
    const first = get(bankData);

    return first;
  },
});

export const isExistRechargeAccount = selector({
  key: "isExistRechargeAccount",
  get: ({ get }) => {
    const accountData = get(rechargeAccount);

    if (accountData != null) {
      return true;
    } else {
      return false;
    }
  },
});
