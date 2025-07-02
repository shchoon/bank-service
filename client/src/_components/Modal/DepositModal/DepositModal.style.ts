import styled from "styled-components";

export const DepositModalContainer = styled.form`
  border: 1px solid gray;
  padding: 5px;
  width: 300px;
  display: flex;
  position: absolute;
  top: 120%;
  flex-direction: column;
  gap: 5px;
  background: white;
  border-radius: 8px;
`;
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const BtnBox = styled.div`
  display: flex;
  gap: 5px;
`;
export const InputBox = styled.input`
  border: none;
  text-align: right;
  &:focus {
    outline: none;
  }
`;
