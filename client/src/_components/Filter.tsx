import styled from "styled-components";
import BankCodeModal from "./filter/BankCodeModal";
import RateModal from "./filter/RateModal";
import { useState } from "react";
import { FilterContext } from "../hook/useFilterContext";
import type { FilterStateType } from "../hook/useFilterContext";
import { toggleFilter } from "../utils/filter";
import { BankListContext } from "../hook/useBankListContext";
import type { BankList } from "./filter/BankCodeModal";

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
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
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

const initialBankData: BankList[] = [
  { name: "부산은행", companyCode: "BS", checked: false },
  { name: "씨티은행", companyCode: "CT", checked: false },
  { name: "하나은행", companyCode: "HN", checked: false },
  { name: "국민은행", companyCode: "KB", checked: false },
  { name: "케이뱅크", companyCode: "KBK", checked: false },
  { name: "카카오뱅크", companyCode: "KK", checked: false },
  { name: "SC제일은행", companyCode: "SC", checked: false },
  { name: "신한은행", companyCode: "SH", checked: false },
  { name: "토스뱅크", companyCode: "TS", checked: false },
  { name: "우리은행", companyCode: "WR", checked: false },
];

export default function Filter() {
  const [filterState, setFilterState] =
    useState<FilterStateType>(initialFilterState);
  const [bankListState, setBankListState] = useState<BankList>(initialBankData);

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
        <BankListContext.Provider value={{ bankListState, setBankListState }}>
          <FilterBox>
            <FilterOption
              onClick={() => {
                const updateState = toggleFilter(filterState, "bank");
                setFilterState(updateState);
              }}
            >
              {filterState.bank.text} 🔻
            </FilterOption>
            {filterState.bank.isActive && <BankCodeModal />}
          </FilterBox>
        </BankListContext.Provider>
        <FilterBox>
          <FilterOption
            onClick={() => {
              const updateState = toggleFilter(filterState, "rate");
              setFilterState(updateState);
            }}
          >
            {filterState.rate.text} 🔻
          </FilterOption>
          {filterState.rate.isActive && <RateModal />}
        </FilterBox>
        <FilterOption>{filterState.deposit.text} 🔻</FilterOption>
      </FilterContainer>
    </FilterContext.Provider>
  );
}
