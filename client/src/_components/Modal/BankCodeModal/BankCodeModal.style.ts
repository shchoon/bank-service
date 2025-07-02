import styled from "styled-components";

export const BankCodeModalContainer = styled.form`
  border: 2px solid gray;
  border-radius: 8px;
  position: absolute;
  top: 120%;
  width: 150px;
  background: white;
`;

export const CheckContainer = styled.label`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 150px;
  overflow-y: scroll;
`;

export const CheckBox = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  border-top: 1px solid gray;
  padding: 10px;
  gap: 10px;
`;
