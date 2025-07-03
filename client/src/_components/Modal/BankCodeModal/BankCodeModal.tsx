import { useFilterModalController } from "../../../hook/useFilterModalController";
import type { BankList } from "../../../type";

import StyledButton from "../../styled/StyledButton";
import {
  BankCodeModalContainer,
  CheckContainer,
  CheckBox,
  ButtonBox,
} from "./BankCodeModal.style";

type Props = {
  bankList: BankList[];
  handleCheckBank: (companyCode: string) => void;
};

export default function BankCodeModal({ bankList, handleCheckBank }: Props) {
  const { submitFilter } = useFilterModalController({
    currentFilter: "bank",
    bankList,
  });

  return (
    <BankCodeModalContainer
      onSubmit={(e) => {
        submitFilter(e, bankList);
      }}
    >
      <CheckContainer>
        {bankList.map((bank, i: number) => {
          return (
            <CheckBox key={i}>
              <input
                type="checkbox"
                checked={bank.checked}
                onChange={() => handleCheckBank(bank.companyCode)}
              />
              <div style={{ flex: 1 }}>{bank.name}</div>
            </CheckBox>
          );
        })}
      </CheckContainer>
      <ButtonBox>
        <StyledButton type="button">취소</StyledButton>
        <StyledButton bgColor="#bfb1e9" textColor="white">
          적용
        </StyledButton>
      </ButtonBox>
    </BankCodeModalContainer>
  );
}
