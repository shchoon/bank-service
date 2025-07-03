import styled from "styled-components";

type ButtonProps = {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  width: 50%;
  border: 0.5px solid gray;
  background: ${(props) => props.bgColor || "white"};
  color: ${(props) => props.textColor || "black"};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default StyledButton;
