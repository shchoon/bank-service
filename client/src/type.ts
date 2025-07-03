export type BankProduct = {
  id: number;
  companyName: string;
  companyCode: string;
  interestRate: string;
  primeInterestRate: string;
  depositAmount: number;
  name: string;
};

type StateType = { isActive: boolean; text: string };

export type FilterStateType = {
  bank: StateType;
  rate: StateType;
  deposit: StateType;
};

export type ReqUrlType = {
  bank: string;
  rate: string;
  deposit: string;
};

export type BankList = {
  name: string;
  companyCode: string;
  checked: boolean;
};
