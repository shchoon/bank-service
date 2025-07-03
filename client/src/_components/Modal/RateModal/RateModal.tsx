import { useFilterModalController } from "../../../hook/useFilterModalController";

import { RateModalContainer, SelectBox } from "./RateModal.style";

export default function RateModal() {
  const { submitFilter } = useFilterModalController({ currentFilter: "rate" });

  return (
    <RateModalContainer>
      <SelectBox onClick={() => submitFilter("basic")}>기본금리순</SelectBox>
      <SelectBox onClick={() => submitFilter("prime")}>최고금리순</SelectBox>
    </RateModalContainer>
  );
}
