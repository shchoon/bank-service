import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { BankProduct } from "../contexts/DataContext";

const DetailContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function ItemDetail(product: BankProduct) {
  const navigate = useNavigate();

  return (
    <DetailContainer>
      <h2>{product.name}</h2>
      <p>은행명: {product.companyName}</p>
      <p>상품코드: {product.companyCode}</p>
      <p>기본금리: {product.interestRate}%</p>
      <p>최고금리: {product.primeInterestRate}%</p>
      <p>예치금액: {product.depositAmount.toLocaleString()}원</p>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </DetailContainer>
  );
}
