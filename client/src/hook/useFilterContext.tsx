import { createContext } from "react";

export type FilterType = "bank" | "rate" | "deposit";

export type FilterContextType = {
  activeFilter: FilterType | null;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
};

export const FilterContext = createContext<FilterContextType | null>(null);
