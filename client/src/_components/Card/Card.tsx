import { useState } from "react";
import DetailModal from "../Modal/DetailModal/DetailModal";

import { CardBox, CardDetail, HighlightRate } from "./Card.style";

import type { BankProduct } from "../../type";

type Props = {
  product: BankProduct;
  isModal?: boolean;
};

export default function Card({ product, isModal }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = isModal ? true : false;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <CardBox showModal={showModal} onClick={() => setIsModalOpen(true)}>
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
      </CardBox>

      {showModal && isModalOpen && (
        <DetailModal closeModal={handleCloseModal} product={product} />
      )}
    </>
  );
}
