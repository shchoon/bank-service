import styled from "styled-components";

const Container = styled.div`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 8px;
  position: absolute;
  top: 40px;
  gap: 5px;
  width: 150px;
  background: white;
`;

const CheckContainer = styled.label`
  display: flex;
  gap: 10px;
`;

export default function BankCodeModal() {
  return (
    <Container>
      <CheckContainer>
        <input type="checkbox" />
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <span>하나은행</span>
        </div>
      </CheckContainer>
    </Container>
  );
}
