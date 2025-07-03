import styled from "styled-components";

export const FilterBox = styled.div`
  position: relative;
`;

export const FilterOption = styled.div`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: #f9f9f9;
  }
`;
