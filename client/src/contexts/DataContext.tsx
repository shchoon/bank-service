import { createContext } from "react";

import type { BankProduct } from "../type";

type DataContextType = {
  data: BankProduct[];
  setData: React.Dispatch<React.SetStateAction<BankProduct[]>>;
};

export const DataContext = createContext<DataContextType | null>(null);
