import { useCallback, useEffect, useState } from "react";

import ProductDetail from "../../Detail/ProductDetail";
import Card from "../../Card/Card";

import type { BankProduct } from "../../../type";

import {
  ModalOverlay,
  ModalContent,
  FavoriteButton,
  CloseButton,
  RecommendProductBox,
  LoadingMessage,
} from "./DetailModal.style";

type Props = {
  closeModal: () => void;
  product: BankProduct;
};

export default function DetailModal({ closeModal, product }: Props) {
  const id = product.id;
  const [favorited, setFavorited] = useState(false);
  const [recommend, setRecommend] = useState<null | BankProduct>(null);

  const handleSubmit = useCallback(() => {
    alert("예금 신청 완료!" + product.id);
  }, [product]);

  useEffect(() => {
    const getRecommendProduct = async () => {
      const res = await fetch(
        "http://localhost:3333/?companyCode=" + product.companyCode
      );
      const data: BankProduct[] = await res.json();

      const idx = Math.floor(Math.random() * (data.length - 1));

      const recommendProduct = data.filter((product) => product.id !== id)[idx];

      setTimeout(() => {
        setRecommend(recommendProduct);
      }, 2000);
    };

    getRecommendProduct();
  }, []);

  return (
    <ModalOverlay onClick={() => closeModal()}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <FavoriteButton
          favorited={favorited}
          onClick={() => setFavorited((f) => !f)}
          aria-label={favorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        >
          {favorited ? "★" : "☆"}
        </FavoriteButton>
        <CloseButton aria-label="닫기" onClick={() => closeModal()}>
          &times;
        </CloseButton>
        <ProductDetail product={product} submit={handleSubmit} />
        <RecommendProductBox>
          <div>
            추천 상품
            <br />
            (동일 은행)
          </div>
          {recommend ? (
            <Card product={recommend} />
          ) : (
            <LoadingMessage>추천 상품을 찾고 있습니다...</LoadingMessage>
          )}
        </RecommendProductBox>
      </ModalContent>
    </ModalOverlay>
  );
}
