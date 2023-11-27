import { atom } from "recoil";
import { AccountDataType, BankDataType, TradeItem, TransferAccountData } from "../../types/WalletTypes";
import { MonthlyTradeListResponse } from "../../components/wallet/TradeHistory";
import { RelationType } from "../../components/active/Kids";

interface BankDataInterface {
  bankList: BankDataType[];
}

export const bankData = atom<BankDataInterface>({
  key: "bankData",
  default: {
    bankList: [
    ],
  },
});

export const userBalanace = atom<number>({
  key: "userBalanace",
  default: 0,
});

export const resistRechargeAccountInput = atom<number | undefined>({
  key: "ResistRechargeAccountInput",
  default: undefined,
});

export const sendAccountBank = atom<BankDataType | null>({
  key: "sendAccountBank",
  default: null,
});

export const rechargeAccount = atom<AccountDataType | null>({
  key: "rechargeAccount",
  default: null,
});

export const selectedFamilyUser = atom<RelationType | null>({
  key: "selectedFamilyUser",
  default: null,
});


export const tradeList = atom<TradeItem[]>({
  key: "tradeList",
  default: [],
});

export const searchResultTradeList = atom<MonthlyTradeListResponse[]>({
  key: "searchResultTradeList",
  default: [],
});

export const transferData = atom<TransferAccountData>({
  key: "transferData",
  default: {
    amount : 0,
    account : null,
  },
});
