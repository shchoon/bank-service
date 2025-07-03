import { useState } from "react";
import { FilterContext } from "../contexts/FilterContext";

const initialFilterState = {
  bank: {
    isActive: false,
    text: "은행명",
  },
  rate: {
    isActive: false,
    text: "기본금리순",
  },
  deposit: {
    isActive: false,
    text: "금액",
  },
};

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filterState, setFilterState] = useState(initialFilterState);

  return (
    <FilterContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </FilterContext.Provider>
  );
};
