export const limitDepositAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
  const currentDeposit = e.target.value;
  if (Number(currentDeposit) > 1000000000) {
    return "1000000000";
  } else {
    return currentDeposit;
  }
};
