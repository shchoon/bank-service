import { useCallback, useState } from "react";

import BankCodeModal from "../Modal/BankCodeModal/BankCodeModal";
import RateModal from "../Modal/RateModal/RateModal";
import DepositModal from "../Modal/DepositModal/DepositModal";
import FilterItem from "./FilterItem";
import { toggleFilter } from "../../utils/filter";
import updateReqUrl from "../../utils/updateReqUrl";
import { useReqUrlContext } from "../../hook/useReqUrlContext";
import { useDataContext } from "../../hook/useDataContext";
import { useFilterContext } from "../../hook/useFilterContext";

import { FilterContainer, RefreshButton } from "./Filter.style";

import type { FilterStateType } from "../../type";
import type { BankList } from "../../type";

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
  const { setReqUrlState } = useReqUrlContext();
  const { setData } = useDataContext();
  const [bankListState, setBankListState] =
    useState<BankList[]>(initialBankData);

  const handleCheckBank = (companyCode: string) => {
    const updateBankList = bankListState.map((bank) => {
      if (companyCode === bank.companyCode) {
        return {
          ...bank,
          checked: !bank.checked,
        };
      } else {
        return bank;
      }
    });

    setBankListState(updateBankList);
  };

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
    [filterState, setFilterState]
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
      <FilterItem
        label={filterState.bank.text}
        isActive={filterState.bank.isActive}
        onToggle={() => handleFilterToggle("bank")}
      >
        <BankCodeModal
          bankList={bankListState}
          handleCheckBank={handleCheckBank}
        />
      </FilterItem>
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
