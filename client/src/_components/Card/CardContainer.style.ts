import styled from "styled-components";

export const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개 컬럼, 각각 균등 분할 */
  gap: 16px; /* 카드들 사이 간격 */
`;
