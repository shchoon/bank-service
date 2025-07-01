import styled from "styled-components";
import Card from "./Card";
import { useDataContext } from "../hook/useDataContext";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개 컬럼, 각각 균등 분할 */
  gap: 16px; /* 카드들 사이 간격 */
`;

export default function CardContainer() {
  const { data } = useDataContext();
  return (
    <Container>
      {data.map((product) => {
        return <Card key={product.id} product={product} />;
      })}
    </Container>
  );
}
