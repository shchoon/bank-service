import type { FilterStateType } from "../type";

export const updateFilterText = (
  prev: FilterStateType,
  key: keyof FilterStateType,
  text: string
): FilterStateType => {
  return {
    ...prev,
    [key]: {
      ...prev[key],
      text: text,
      isActive: false,
    },
  };
};
