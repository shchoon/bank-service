import Card from "./Card";
import { useDataContext } from "../../hook/useDataContext";
import LoadingUI from "../LoadingUI/Loading";

import { StyledCardContainer } from "./CardContainer.style";

export default function CardContainer() {
  const { data } = useDataContext();

  if (!data) {
    return <LoadingUI />;
  }

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
