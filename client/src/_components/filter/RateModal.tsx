import styled from "styled-components";
import UseSafeContext from "../../hook/useSafeContext";
import { DataContext } from "../../hook/useDataContext";
import { FilterContext } from "../../hook/useFilterContext";
import { updateFilterText } from "../../utils/filter";
import { ReqUrlContext } from "../../hook/useReqUrlContext";
import updateReqUrl from "../../utils/updateReqUrl";

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
  const { reqUrlState, setReqUrlState } = UseSafeContext(ReqUrlContext);

  const filterRate = async (orderBy: boolean = false) => {
    const query = orderBy ? "primeInterestRate=true&" : "";
    const { updatedReqUrl, reqUrl } = updateReqUrl(
      reqUrlState,
      "interestRate",
      query
    );
    const res = await fetch("http://localhost:3333/?" + reqUrl);
    const data = await res.json();

    const updateFilter = updateFilterText(
      filterState,
      "rate",
      undefined,
      orderBy ? "최고금리순" : "기본금리순"
    );
    setReqUrlState(updatedReqUrl);
    setFilterState(updateFilter);
    setData(data);
  };

  return (
    <Container>
      <SelectBox
        onClick={() => {
          filterRate();
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
          filterRate(true);
          setFilterState(updateFilter);
        }}
      >
        최고금리순
      </SelectBox>
    </Container>
  );
}
