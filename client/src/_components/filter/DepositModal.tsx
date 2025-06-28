import styled from "styled-components";
import StyledButton from "../styled/StyledButton";
import { useState } from "react";
import { formatDepositToStr } from "../../utils/formatDepositToStr";
import { formatDepositToNum } from "../../utils/formatDepositToNum";
import UseSafeContext from "../../hook/useSafeContext";
import { FilterContext } from "../../hook/useFilterContext";
import { updateFilterText } from "../../utils/filter";

const Container = styled.form`
  border: 1px solid gray;
  padding: 5px;
  width: 300px;
  display: flex;
  position: absolute;
  top: 120%;
  flex-direction: column;
  gap: 5px;
  background: white;
  border-radius: 8px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const BtnBox = styled.div`
  display: flex;
  gap: 5px;
`;
const InputBox = styled.input`
  border: none;
  text-align: right;
  &:focus {
    outline: none;
  }
`;

export default function DepositModal() {
  const { filterState, setFilterState } = UseSafeContext(FilterContext);
  const initialDeposit =
    filterState.deposit.text === "금액"
      ? ""
      : formatDepositToNum(filterState.deposit.text);
  const [deposit, setDeposit] = useState(initialDeposit);

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault();
        const depositText = deposit ? formatDepositToStr(deposit) : "금액";
        const updateFilter = updateFilterText(
          filterState,
          "deposit",
          undefined,
          depositText
        );
        setFilterState(updateFilter);
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
                const currentDeposit = e.target.value;
                if (Number(currentDeposit) > 1000000000) {
                  setDeposit("1000000000");
                } else {
                  setDeposit(currentDeposit);
                }
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
    </Container>
  );
}
