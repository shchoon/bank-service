import { useDataContext } from "./useDataContext";
import { useFilterContext } from "./useFilterContext";
import { useReqUrlContext } from "./useReqUrlContext";

import updateReqUrl from "../utils/updateReqUrl";
import { updateFilterText } from "../utils/filter";
import { formatDepositToStr } from "../utils/formatDepositToStr";

import type { BankList } from "../type";
import type { FilterStateType } from "../type";

// type Props = {
//   currentFilter: keyof FilterStateType;
//   bankList?: BankList[];
// };

type FilterBank = (
  e: React.FormEvent<HTMLFormElement>,
  bankList: BankList[]
) => Promise<void>;

type FilterRate = (orderBy: "basic" | "prime") => Promise<void>;

type FilterDeposit = (
  e: React.FormEvent<HTMLFormElement>,
  deposit: string
) => Promise<void>;

export const useFilterModalController = <T extends keyof FilterStateType>({
  currentFilter,
  bankList,
}: {
  currentFilter: T;
  bankList?: BankList[];
}) => {
  const { setData } = useDataContext();
  const { filterState, setFilterState } = useFilterContext();
  const { reqUrlState, setReqUrlState } = useReqUrlContext();

  const filterBankCode: FilterBank = async (e) => {
    e.preventDefault();

    if (!bankList) {
      return;
    }

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

  const filterRate: FilterRate = async (orderBy) => {
    const query = orderBy === "prime" ? "primeInterestRate=true&" : "";
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
      orderBy === "prime" ? "최고금리순" : "기본금리순"
    );
    setReqUrlState(updatedReqUrl);
    setFilterState(updateFilter);
    setData(data);
  };

  const filterDeposit: FilterDeposit = async (e, deposit) => {
    e.preventDefault();
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

  const filterFn: Record<
    keyof FilterStateType,
    FilterBank | FilterRate | FilterDeposit
  > = {
    bank: filterBankCode,
    rate: filterRate,
    deposit: filterDeposit,
  };

  //   T가 bank로 추론되면 FIlterBank 아니면 FilterRate
  const submitFilter = filterFn[currentFilter] as T extends "bank"
    ? FilterBank
    : T extends "rate"
    ? FilterRate
    : FilterDeposit;

  return { submitFilter };
};
