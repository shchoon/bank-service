import { createContext } from "react";

import type { BankProduct } from "../type";

type DataContextType = {
  data: BankProduct[] | null;
  setData: React.Dispatch<React.SetStateAction<BankProduct[] | null>>;
};

export const DataContext = createContext<DataContextType | null>(null);
