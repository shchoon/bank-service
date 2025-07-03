import type { BankList } from "../type";

export const updateBankCheckState = (
  companyCode: string,
  bankCheckState: BankList[]
) => {
  const updateBankList = bankCheckState.map((bank) => {
    if (companyCode === bank.companyCode) {
      return {
        ...bank,
        checked: !bank.checked,
      };
    } else {
      return bank;
    }
  });

  return updateBankList;
};
