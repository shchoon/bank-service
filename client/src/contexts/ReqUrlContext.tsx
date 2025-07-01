import { createContext } from "react";

export type ReqUrlType = {
  companyCode: string;
  interestRate: string;
  deposit: string;
};

type ReqUrlContextType = {
  reqUrlState: ReqUrlType;
  setReqUrlState: React.Dispatch<React.SetStateAction<ReqUrlType>>;
};

export const ReqUrlContext = createContext<ReqUrlContextType | null>(null);
