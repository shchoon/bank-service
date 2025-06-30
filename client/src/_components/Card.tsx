import type { BankProduct } from "../hook/useDataContext";
import styled from "styled-components";

type Props = {
  product: BankProduct;
};

const CardContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 8px;
  align-items: flex-start;
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const HighlightRate = styled.strong`
  color: red;
  display: flex;
`;

export default function Card({ product }: Props) {
  return (
    <CardContainer>
      <CardDetail>
        <strong>{product.name}</strong>
        <div>
          <div>
            <span>가입</span>
            <span>{product.companyName}</span>
          </div>
          <div>
            <span>금리</span>
            <span>기본 {product.interestRate}%</span>
          </div>
        </div>
      </CardDetail>
      <HighlightRate>최고 {product.primeInterestRate}%</HighlightRate>
    </CardContainer>
  );
}
