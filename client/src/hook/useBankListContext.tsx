import { createContext } from "react";

export type BankList = {
  name: string;
  companyCode: string;
  checked: boolean;
};

export type BankListContextType = {
  bankListState: BankList[];
  setBankListState: React.Dispatch<React.SetStateAction<BankList[]>>;
};

export const BankListContext = createContext<BankListContextType | null>(null);
