import styled from "styled-components";
import UseSafeContext from "../../hook/useSafeContext";
import { DataContext } from "../../hook/useDataContext";
import { FilterContext } from "../../hook/useFilterContext";
import { useState } from "react";
import { updateFilterText } from "../../utils/filter";

type ButtonProps = {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
};

export type BankList = {
  name: string;
  companyCode: string;
  checked: boolean;
};

const Container = styled.form`
  border: 2px solid gray;
  border-radius: 8px;
  position: absolute;
  top: 120%;
  width: 150px;
  background: white;
`;

const CheckContainer = styled.label`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 150px;
  overflow-y: scroll;
`;

const CheckBox = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  border-top: 1px solid gray;
  padding: 10px;
  gap: 10px;
`;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  width: 50%;
  border: 0.5px solid gray;
  background: ${(props) => props.bgColor || "white"};
  color: ${(props) => props.textColor || "black"};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const bankList: BankList[] = [
  { name: "부산은행", companyCode: "BS", checked: false },
  { name: "씨티은행", companyCode: "CT", checked: false },
  { name: "하나은행", companyCode: "HN", checked: false },
  { name: "국민은행", companyCode: "KB", checked: false },
  { name: "케이뱅크", companyCode: "KBK", checked: false },
  { name: "카카오뱅크", companyCode: "KK", checked: false },
  { name: "SC제일은행", companyCode: "SC", checked: false },
  { name: "신한은행", companyCode: "SH", checked: false },
  { name: "토스뱅크", companyCode: "TS", checked: false },
  { name: "우리은행", companyCode: "WR", checked: false },
];

export default function BankCodeModal() {
  const { data, setData } = UseSafeContext(DataContext);
  const { filterState, setFilterState } = UseSafeContext(FilterContext);

  const [bankData, setBankData] = useState<BankList[]>(bankList);

  const onChangeCheckedList = (i: number) => {
    const dupList = [...bankData];
    dupList[i] = { ...dupList[i], checked: !dupList[i].checked };
    setBankData(dupList);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = bankData
      .map((data) => {
        if (data.checked) {
          return "companyCode=" + data.companyCode + "&";
        } else {
          return "";
        }
      })
      .join("");

    const res = await fetch("http://localhost:3333/?" + query);
    const data = await res.json();
    const updateFilter = updateFilterText(filterState, "bank", bankData);
    setData(data);
    setFilterState(updateFilter);
  };

  const cancelChecked = () => {
    setBankData((perv) =>
      perv.map((data) => {
        if (data.checked) {
          return { ...data, checked: false };
        } else {
          return data;
        }
      })
    );
  };

  return (
    <Container
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <CheckContainer>
        {bankData.map((bank, i: number) => {
          return (
            <CheckBox key={i}>
              <input
                type="checkbox"
                checked={bank.checked}
                onChange={() => onChangeCheckedList(i)}
              />
              <div style={{ flex: 1 }}>{bank.name}</div>
            </CheckBox>
          );
        })}
      </CheckContainer>
      <ButtonBox>
        <StyledButton type="button" onClick={cancelChecked}>
          취소
        </StyledButton>
        <StyledButton bgColor="#bfb1e9" textColor="white">
          적용
        </StyledButton>
      </ButtonBox>
    </Container>
  );
}
