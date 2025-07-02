import { useReqUrlContext } from "../../../hook/useReqUrlContext";
import { useDataContext } from "../../../hook/useDataContext";
import { useFilterContext } from "../../../hook/useFilterContext";
import { updateFilterText } from "../../../utils/filter";
import updateReqUrl from "../../../utils/updateReqUrl";

import { RateModalContainer, SelectBox } from "./RateModal.style";

export default function RateModal() {
  const { setData } = useDataContext();
  const { filterState, setFilterState } = useFilterContext();
  const { reqUrlState, setReqUrlState } = useReqUrlContext();

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
    <RateModalContainer>
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
    </RateModalContainer>
  );
}
