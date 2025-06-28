import "./App.css";
import styled from "styled-components";
import Card from "./_components/Card";
import Filter from "./_components/Filter";
import { DataContext } from "./hook/useDataContext";
import { useEffect, useState } from "react";
import type { BankProduct } from "./hook/useDataContext";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개 컬럼, 각각 균등 분할 */
  gap: 16px; /* 카드들 사이 간격 */
`;

function App() {
  const [data, setData] = useState<BankProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3333/");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <Container>
        <Filter />
        <CardContainer>
          {data.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </CardContainer>
      </Container>
    </DataContext.Provider>
  );
}

export default App;
