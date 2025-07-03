import { useState } from "react";

import { useFilterModalController } from "../../../hook/useFilterModalController";
import { formatDepositToStr } from "../../../utils/formatDepositToStr";
import { limitDepositAmount } from "../../../utils/limitDepositAmount";

import StyledButton from "../../styled/StyledButton";
import {
  DepositModalContainer,
  TextBox,
  InputBox,
  BtnBox,
} from "./DepositModal.style";

export default function DepositModal() {
  const [deposit, setDeposit] = useState("");
  const { submitFilter } = useFilterModalController({
    currentFilter: "deposit",
  });

  return (
    <DepositModalContainer
      onSubmit={(e) => {
        submitFilter(e, deposit);
      }}
    >
      <TextBox>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>예치금액</span>
          <div>
            <InputBox
              type="number"
              placeholder="금액을 입력해주세요"
              value={deposit}
              onChange={(e) => {
                const limitDeposit = limitDepositAmount(e);
                setDeposit(limitDeposit);
              }}
            />
            원
          </div>
        </div>
        <p style={{ width: "100%", height: "0.5px", background: "gray" }} />
        <div style={{ textAlign: "end" }}>{formatDepositToStr(deposit)}</div>
      </TextBox>
      <BtnBox>
        <StyledButton
          type="button"
          onClick={() => {
            setDeposit("");
          }}
        >
          초기화
        </StyledButton>
        <StyledButton bgColor="#bfb1e9" textColor="white">
          적용
        </StyledButton>
      </BtnBox>
    </DepositModalContainer>
  );
}
