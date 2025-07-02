import { memo } from "react";

import { FilterBox, FilterOption } from "./FilterItem.style";

type Props = {
  label: string;
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

const FilterItem = memo(function FilterItem({
  label,
  isActive,
  onToggle,
  children,
}: Props) {
  console.log("filterItem");
  return (
    <FilterBox>
      <FilterOption onClick={onToggle}>{label}</FilterOption>
      {isActive && children}
    </FilterBox>
  );
});

export default FilterItem;
