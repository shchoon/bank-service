import type { FilterStateType } from "../hook/useFilterContext";
import type { BankList } from "../_components/filter/BankCodeModal";

export const toggleFilter = (
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
export const updateFilterText = (
  prev: FilterStateType,
  key: keyof FilterStateType,
  bankList?: BankList[],
  text?: string
): FilterStateType => {
  if (bankList) {
    let result = "";
    const selectBanks = bankList.filter((bank) => bank.checked);

    selectBanks.forEach((bank, i) => {
      if (i === 0) {
        result += bank.name;
      } else {
        result += `, ${bank.name}`;
      }
    });
    return {
      ...prev,
      [key]: {
        ...prev[key],
        text: result,
        isActive: false,
      },
    };
  }

  if (text) {
    return {
      ...prev,
      [key]: {
        ...prev[key],
        text: text,
        isActive: false,
      },
    };
  }

  return prev;
};
