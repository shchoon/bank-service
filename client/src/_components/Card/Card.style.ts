import styled from "styled-components";

export const CardBox = styled.div<{ showModal: boolean }>`
  position: ${(showModal) => (showModal ? "static" : "absolute")};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 8px;
  align-items: flex-start;
  cursor: pointer;
`;

export const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const HighlightRate = styled.strong`
  color: red;
  display: flex;
`;
