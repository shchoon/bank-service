import { createContext } from "react";

import type { FilterStateType } from "../type";

export type FilterContextType = {
  filterState: FilterStateType;
  setFilterState: React.Dispatch<React.SetStateAction<FilterStateType>>;
};

export const FilterContext = createContext<FilterContextType | null>(null);
