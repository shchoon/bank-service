import styled from "styled-components";

const Container = styled.div`
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
const SelectBox = styled.div`
  cursor: pointer;

  &:hover {
    background: #c6b4ff;
  }
`;

export default function RateModal() {
  return (
    <Container>
      <SelectBox>기본금리순</SelectBox>
      <SelectBox>최고금리순</SelectBox>
    </Container>
  );
}
