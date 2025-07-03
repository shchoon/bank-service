import { useFetchAndUpdate } from "./useFetchAndUpdate";

import { getCheckedBanks } from "../utils/getCheckedBanks";
import { formatDepositToStr } from "../utils/formatDepositToStr";

import type { BankList } from "../type";
import type { FilterStateType } from "../type";

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
}: {
  currentFilter: T;
}) => {
  const { fetchAndUpdate } = useFetchAndUpdate();

  const filterBankCode: FilterBank = async (e, bankList) => {
    e.preventDefault();

    const { query, text } = getCheckedBanks(bankList);

    fetchAndUpdate(query, currentFilter, text);
  };

  const filterRate: FilterRate = async (orderBy) => {
    const query = orderBy === "prime" ? "primeInterestRate=true&" : "";
    const text = orderBy === "prime" ? "최고금리순" : "기본금리순";

    fetchAndUpdate(query, currentFilter, text);
  };

  const filterDeposit: FilterDeposit = async (e, deposit) => {
    e.preventDefault();
    const query = `deposit=${Number(deposit)}`;
    const text = deposit ? formatDepositToStr(deposit) : "금액";

    fetchAndUpdate(query, currentFilter, text);
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
