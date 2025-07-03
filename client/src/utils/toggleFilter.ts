import type { FilterStateType } from "../type";

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
