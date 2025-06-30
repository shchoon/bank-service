import styled from "styled-components";
import UseSafeContext from "../../hook/useSafeContext";
import { DataContext } from "../../hook/useDataContext";
import { FilterContext } from "../../hook/useFilterContext";
import { updateFilterText } from "../../utils/filter";

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
  const { setData } = UseSafeContext(DataContext);
  const { filterState, setFilterState } = UseSafeContext(FilterContext);

  const filterRate = async (orderBy: string) => {
    const reqUrl = orderBy === "basic" ? `` : "primeInterestRate=true";
    const res = await fetch(`http://localhost:3333/?${reqUrl}`);
    const data = await res.json();

    setData(data);
  };

  return (
    <Container>
      <SelectBox
        onClick={() => {
          const updateFilter = updateFilterText(
            filterState,
            "rate",
            undefined,
            "기본금리순"
          );
          filterRate("basic");
          setFilterState(updateFilter);
        }}
      >
        기본금리순
      </SelectBox>
      <SelectBox
        onClick={() => {
          const updateFilter = updateFilterText(
            filterState,
            "rate",
            undefined,
            "최고금리순"
          );
          filterRate("prime");
          setFilterState(updateFilter);
        }}
      >
        최고금리순
      </SelectBox>
    </Container>
  );
}
