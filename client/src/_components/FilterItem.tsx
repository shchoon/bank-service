import styled from "styled-components";
import { memo } from "react";

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
