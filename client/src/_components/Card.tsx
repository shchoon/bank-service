import type { BankProduct } from "../contexts/DataContext";
import { useState } from "react";
import styled from "styled-components";
import DetailModal from "./modal/Detail";

type Props = {
  product: BankProduct;
  isModal?: boolean;
};

const CardContainer = styled.div<{ showModal: boolean }>`
  position: ${(showModal) => (showModal ? "static" : "absolute")};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 8px;
  align-items: flex-start;
  cursor: pointer;
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

export default function Card({ product, isModal }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = isModal ? true : false;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <CardContainer showModal={showModal} onClick={() => setIsModalOpen(true)}>
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

      {showModal && isModalOpen && (
        <DetailModal closeModal={handleCloseModal} product={product} />
      )}
    </>
  );
}
