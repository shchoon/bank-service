import Card from "./Card";
import { useDataContext } from "../../hook/useDataContext";

import { StyledCardContainer } from "./CardContainer.style";

export default function CardContainer() {
  const { data } = useDataContext();

  return (
    <>
      {data.length > 0 ? (
        <StyledCardContainer>
          {data.map((product) => {
            return <Card key={product.id} product={product} isModal={true} />;
          })}
        </StyledCardContainer>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </>
  );
}
