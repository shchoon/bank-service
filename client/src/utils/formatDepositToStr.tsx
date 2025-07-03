export const formatDepositToStr = (deopsit: string) => {
  const len = deopsit.length;
  if (!deopsit) {
    return "금액이 계산됩니다";
  }
  if (deopsit.length < 5) {
    return `${deopsit}원`;
  } else if (deopsit.length < 9) {
    return (
      `${deopsit.slice(0, len - 4)}만 ` + `${deopsit.slice(len - 4, len + 1)}원`
    );
  } else {
    return (
      `${deopsit.slice(0, len - 8)}억 ` +
      `${deopsit.slice(len - 8, len - 4)}만 ` +
      `${deopsit.slice(len - 4, len + 1)}원`
    );
  }
};
