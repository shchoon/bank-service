import "./App.css";
import styled from "styled-components";
import Card from "./_components/Card";
import Filter from "./_components/Filter";

export type BankProduct = {
  id: number;
  companyName: string;
  companyCode: string;
  interestRate: string;
  primeInterestRate: string;
  depositAmount: number;
  name: string;
};

const data = {
  id: 138,
  companyName: "부산은행",
  companyCode: "BS",
  interestRate: "2.50",
  primeInterestRate: "3.10",
  depositAmount: 100000000,
  name: "직장인을 위한 월급 저축",
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function App() {
  const getData = async () => {
    const data = await fetch("http://localhost:3333/bankList");
    console.log(data);
  };
  getData();
  return (
    <Container>
      <Filter />
      <Card product={data} />
    </Container>
  );
}

export default App;
