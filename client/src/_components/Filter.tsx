import styled from "styled-components";
import BankCodeModal from "./filter/BankCodeModal";

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

const FilerBox = styled.div`
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

export default function Filter() {
  return (
    <FilterContainer>
      <RefreshButton>↺</RefreshButton>
      <FilerBox>
        <FilterOption>은행명 🔻</FilterOption>
        <BankCodeModal />
      </FilerBox>
      <FilterOption>기본금리순 🔻</FilterOption>
      <FilterOption>금액 🔻</FilterOption>
    </FilterContainer>
  );
}
