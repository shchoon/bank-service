import type { BankList } from "../type";

export const getCheckedBanks = (bankList: BankList[]) => {
  let text = "",
    query = "";

  const selectBanks = bankList.filter((bank) => bank.checked);

  selectBanks.forEach((bank, i) => {
    if (i === 0) {
      text += bank.name;
      query += `companyCode=${bank.companyCode}&`;
    } else {
      text += `, ${bank.name}`;
      query += `companyCode=${bank.companyCode}&`;
    }
  });

  return {
    text,
    query,
  };
};
