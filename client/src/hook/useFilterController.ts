import { useState, useCallback } from "react";

import { useFilterContext } from "./useFilterContext";
import { useReqUrlContext } from "./useReqUrlContext";
import { useDataContext } from "./useDataContext";
import { updateBankCheckState } from "../utils/updateBankCheckState";
import { initialBankData } from "../constants/initalBankData";
import { initialFilterState } from "../constants/initialFilterState";
import updateReqUrl from "../utils/updateReqUrl";

import type { BankList } from "../type";
import type { FilterStateType } from "../type";

const toggleFilter = (
  prev: FilterStateType,
  key: keyof FilterStateType
): FilterStateType => {
  const updateState: FilterStateType = {} as FilterStateType;

  for (const k in prev) {
    updateState[k as keyof FilterStateType] = {
      ...prev[k as keyof FilterStateType],
      isActive: k === key ? !prev[k as keyof FilterStateType].isActive : false,
    };
  }

  return updateState;
};

export const useFilterController = () => {
  const { filterState, setFilterState } = useFilterContext();
  const { setReqUrlState } = useReqUrlContext();
  const { setData } = useDataContext();

  const [bankListState, setBankListState] =
    useState<BankList[]>(initialBankData);
  const [depositText, setDepositText] = useState("금액");

  const handleCheckBank = (companyCode: string) => {
    const updateBankList = updateBankCheckState(companyCode, bankListState);

    setBankListState(updateBankList);
  };

  const handleClickRefresh = async () => {
    const { updatedReqUrl } = updateReqUrl(true);

    const res = await fetch("http://localhost:3000/bank_product");
    const data = await res.json();

    setDepositText("금액");
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

  return {
    handleCheckBank,
    handleClickRefresh,
    handleFilterToggle,
    filterState,
    bankListState,
    depositText,
  };
};
