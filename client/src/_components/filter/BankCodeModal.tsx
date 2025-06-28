import styled from "styled-components";
import UseSafeContext from "../../hook/useSafeContext";
import { DataContext } from "../../hook/useDataContext";
import { FilterContext } from "../../hook/useFilterContext";
import { updateFilterText } from "../../utils/filter";
import { BankListContext } from "../../hook/useBankListContext";
import StyledButton from "../styled/StyledButton";

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

export default function BankCodeModal() {
  const { data, setData } = UseSafeContext(DataContext);
  const { filterState, setFilterState } = UseSafeContext(FilterContext);
  const { bankListState, setBankListState } = UseSafeContext(BankListContext);

  const onChangeCheckedList = (i: number) => {
    const dupList = [...bankListState];
    dupList[i] = { ...dupList[i], checked: !dupList[i].checked };
    setBankListState(dupList);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = bankListState
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
    const updateFilter = updateFilterText(filterState, "bank", bankListState);
    setData(data);
    setFilterState(updateFilter);
  };

  const cancelChecked = () => {
    setBankListState((perv) =>
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
        {bankListState.map((bank, i: number) => {
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
