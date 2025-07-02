import styled from "styled-components";

export const RateModalContainer = styled.div`
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 8px;
  position: absolute;
  top: 120%;
  gap: 5px;
`;

export const SelectBox = styled.div`
  cursor: pointer;

  &:hover {
    background: #c6b4ff;
  }
`;
