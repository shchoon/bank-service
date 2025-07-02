import { useState } from "react";

import { useDataContext } from "../../../hook/useDataContext";
import { useFilterContext } from "../../../hook/useFilterContext";
import { useReqUrlContext } from "../../../hook/useReqUrlContext";
import { formatDepositToStr } from "../../../utils/formatDepositToStr";
import { formatDepositToNum } from "../../../utils/formatDepositToNum";
import { updateFilterText } from "../../../utils/filter";
import updateReqUrl from "../../../utils/updateReqUrl";

import StyledButton from "../../styled/StyledButton";
import {
  DepositModalContainer,
  TextBox,
  InputBox,
  BtnBox,
} from "./DepositModal.style";

export default function DepositModal() {
  const { filterState, setFilterState } = useFilterContext();
  const { reqUrlState, setReqUrlState } = useReqUrlContext();
  const { data, setData } = useDataContext();
  const initialDeposit =
    filterState.deposit.text === "금액"
      ? ""
      : formatDepositToNum(filterState.deposit.text);
  const [deposit, setDeposit] = useState(initialDeposit);

  const filterDeposit = async () => {
    const query = `deposit=${Number(deposit)}`;
    const { updatedReqUrl, reqUrl } = updateReqUrl(
      reqUrlState,
      "deposit",
      query
    );
    const res = await fetch("http://localhost:3333/?" + reqUrl);
    const data = await res.json();

    const depositText = deposit ? formatDepositToStr(deposit) : "금액";
    const updateFilter = updateFilterText(
      filterState,
      "deposit",
      undefined,
      depositText
    );
    setReqUrlState(updatedReqUrl);
    setData(data);
    setFilterState(updateFilter);
  };

  console.log("data", data);
  console.log("filterState", filterState);

  return (
    <DepositModalContainer
      onSubmit={(e) => {
        e.preventDefault();
        filterDeposit();
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
    </DepositModalContainer>
  );
}
