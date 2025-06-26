import styled from "styled-components";
import UseSafeContext from "../../hook/useSafeContext";
import { DataContext } from "../../hook/useDataContext";

const Container = styled.div`
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 8px;
  position: absolute;
  top: 120%;
  gap: 5px;
`;
const SelectBox = styled.div`
  cursor: pointer;

  &:hover {
    background: #c6b4ff;
  }
`;

export default function RateModal() {
  const { data, setData } = UseSafeContext(DataContext);

  const filterRate = async (route = "") => {
    const res = await fetch("http://localhost:3333/" + route);
    const data = await res.json();

    setData(data);
  };

  return (
    <Container>
      <SelectBox onClick={() => filterRate()}>기본금리순</SelectBox>
      <SelectBox onClick={() => filterRate("primeInterestRate")}>
        최고금리순
      </SelectBox>
    </Container>
  );
}
