import BankCodeModal from "../Modal/BankCodeModal/BankCodeModal";
import RateModal from "../Modal/RateModal/RateModal";
import DepositModal from "../Modal/DepositModal/DepositModal";
import FilterItem from "./FilterItem";
import { useFilterController } from "../../hook/useFilterController";

import { FilterContainer, RefreshButton } from "./Filter.style";

export default function Filter() {
  const {
    handleFilterToggle,
    handleClickRefresh,
    handleCheckBank,
    filterState,
    bankListState,
  } = useFilterController();

  return (
    <FilterContainer>
      <RefreshButton onClick={handleClickRefresh}>↺</RefreshButton>
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
