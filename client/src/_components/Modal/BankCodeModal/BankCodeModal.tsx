import { useFilterContext } from "../../../hook/useFilterContext";
import { useDataContext } from "../../../hook/useDataContext";
import { useReqUrlContext } from "../../../hook/useReqUrlContext";
import { updateFilterText } from "../../../utils/filter";
import updateReqUrl from "../../../utils/updateReqUrl";

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
  const { setData } = useDataContext();
  const { filterState, setFilterState } = useFilterContext();
  const { reqUrlState, setReqUrlState } = useReqUrlContext();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = bankList
      .map((data) => {
        if (data.checked) {
          return "companyCode=" + data.companyCode + "&";
        } else {
          return "";
        }
      })
      .join("");
    const { updatedReqUrl, reqUrl } = updateReqUrl(
      reqUrlState,
      "companyCode",
      query
    );
    const res = await fetch("http://localhost:3333/?" + reqUrl);
    const data = await res.json();
    const updateFilter = updateFilterText(filterState, "bank", bankList);
    setReqUrlState(updatedReqUrl);
    setData(data);
    setFilterState(updateFilter);
  };

  return (
    <BankCodeModalContainer
      onSubmit={(e) => {
        onSubmit(e);
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
