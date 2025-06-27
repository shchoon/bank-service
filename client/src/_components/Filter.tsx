import styled from "styled-components";
import BankCodeModal from "./filter/BankCodeModal";
import RateModal from "./filter/RateModal";
import { useState } from "react";
import { FilterContext } from "../hook/useFilterContext";
import type { FilterStateType } from "../hook/useFilterContext";

const FilterContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const RefreshButton = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 9999px;
  background-color: #f2f2f2;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterBox = styled.div`
  position: relative;
`;

const FilterOption = styled.div`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    background-color: #f9f9f9;
  }
`;

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

export default function Filter() {
  const [filterState, setFilterState] =
    useState<FilterStateType>(initialFilterState);

  const toggleFilter = (prev: FilterStateType, key: keyof FilterStateType) => {
    const updateState: FilterStateType = {} as FilterStateType;

    for (const k in prev) {
      updateState[k as keyof FilterStateType] = {
        ...prev[k as keyof FilterStateType],
        isActive:
          k === key ? !prev[k as keyof FilterStateType].isActive : false,
      };
    }

    setFilterState(updateState);
  };

  return (
    <FilterContext.Provider value={{ filterState, setFilterState }}>
      <FilterContainer>
        <RefreshButton
          onClick={() => {
            setFilterState(initialFilterState);
          }}
        >
          ↺
        </RefreshButton>
        <FilterBox>
          <FilterOption
            onClick={() => {
              toggleFilter(filterState, "bank");
            }}
          >
            은행명 🔻
          </FilterOption>
          {filterState.bank.isActive && <BankCodeModal />}
        </FilterBox>
        <FilterBox>
          <FilterOption
            onClick={() => {
              toggleFilter(filterState, "rate");
            }}
          >
            기본금리순 🔻
          </FilterOption>
          {filterState.rate.isActive && <RateModal />}
        </FilterBox>
        <FilterOption>금액 🔻</FilterOption>
      </FilterContainer>
    </FilterContext.Provider>
  );
}
