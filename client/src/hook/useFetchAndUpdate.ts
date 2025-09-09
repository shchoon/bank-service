import { useFilterContext } from "./useFilterContext";
import { useDataContext } from "./useDataContext";
import { useReqUrlContext } from "./useReqUrlContext";
import updateReqUrl from "../utils/updateReqUrl";
import { updateFilterText } from "../utils/updateFilterText";

import type { FilterStateType } from "../type";

export const useFetchAndUpdate = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { setData } = useDataContext();
  const { filterState, setFilterState } = useFilterContext();
  const { reqUrlState, setReqUrlState } = useReqUrlContext();

  const fetchAndUpdate = async (
    query: string,
    currentFilter: keyof FilterStateType,
    text: string
  ) => {
    const { updatedReqUrl, reqUrl } = updateReqUrl(
      reqUrlState,
      currentFilter,
      query
    );
    setData(null);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const res = await fetch(baseURL + "/bank_product?" + reqUrl);
    const data = await res.json();
    const updateFilter = updateFilterText(filterState, currentFilter, text);
    setReqUrlState(updatedReqUrl);
    setData(data);
    setFilterState(updateFilter);
  };

  return { fetchAndUpdate };
};
