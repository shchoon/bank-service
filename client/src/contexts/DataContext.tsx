import { createContext } from "react";

export type BankProduct = {
  id: number;
  companyName: string;
  companyCode: string;
  interestRate: string;
  primeInterestRate: string;
  depositAmount: number;
  name: string;
};

type DataContextType = {
  data: BankProduct[];
  setData: React.Dispatch<React.SetStateAction<BankProduct[]>>;
};

export const DataContext = createContext<DataContextType | null>(null);
