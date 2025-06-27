import { createContext } from "react";

type StateType = { isActive: boolean; text: string };

export type FilterStateType = {
  bank: StateType;
  rate: StateType;
  deposit: StateType;
};

export type FilterContextType = {
  filterState: FilterStateType;
  setFilterState: React.Dispatch<React.SetStateAction<FilterStateType>>;
};

export const FilterContext = createContext<FilterContextType | null>(null);
