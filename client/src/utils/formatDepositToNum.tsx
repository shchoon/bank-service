export const formatDepositToNum = (str: string) => {
  const splitStr = str.split(" ");
  let result = "";
  splitStr.forEach((str) => {
    result += str.slice(0, str.length - 1);
  });

  return result;
};
