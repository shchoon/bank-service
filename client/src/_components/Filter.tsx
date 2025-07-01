import styled from "styled-components";
import BankCodeModal from "./modal/BankCodeModal";
import RateModal from "./modal/RateModal";
import { useCallback, useState } from "react";
import { toggleFilter } from "../utils/filter";
import { BankListContext } from "../hook/useBankListContext";
import type { BankList } from "../hook/useBankListContext";
import DepositModal from "./modal/DepositModal";
import updateReqUrl from "../utils/updateReqUrl";
import { useReqUrlContext } from "../hook/useReqUrlContext";
import FilterItem from "./FilterItem";
import { useDataContext } from "../hook/useDataContext";
import { useFilterContext } from "../hook/useFilterContext";
import type { FilterStateType } from "../contexts/FilterContext";

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
  const { filterState, setFilterState } = useFilterContext();
  const [bankListState, setBankListState] =
    useState<BankList[]>(initialBankData);
  const { setReqUrlState } = useReqUrlContext();
  const { setData } = useDataContext();

  const handleClickRefresh = async () => {
    const { updatedReqUrl } = updateReqUrl(true);

    const res = await fetch("http://localhost:3333/");
    const data = await res.json();

    setData(data);
    setReqUrlState(updatedReqUrl);
    setBankListState(initialBankData);
    setFilterState(initialFilterState);
  };

  const handleFilterToggle = useCallback(
    (key: keyof FilterStateType) => {
      const updateState = toggleFilter(filterState, key);
      setFilterState(updateState);
    },
    [filterState]
  );

  return (
    <FilterContainer>
      <RefreshButton
        onClick={() => {
          handleClickRefresh();
        }}
      >
        ↺
      </RefreshButton>
      <BankListContext.Provider value={{ bankListState, setBankListState }}>
        <FilterItem
          label={filterState.bank.text}
          isActive={filterState.bank.isActive}
          onToggle={() => handleFilterToggle("bank")}
        >
          <BankCodeModal />
        </FilterItem>
      </BankListContext.Provider>
      <FilterItem
        label={filterState.rate.text}
        isActive={filterState.rate.isActive}
        onToggle={() => handleFilterToggle("rate")}
      >
        <RateModal />
      </FilterItem>
      <FilterItem
        label={filterState.deposit.text}
        isActive={filterState.deposit.isActive}
        onToggle={() => handleFilterToggle("deposit")}
      >
        <DepositModal />
      </FilterItem>
    </FilterContainer>
  );
}
