import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import type { BankProduct } from "../../contexts/DataContext";
import ProductDetail from "../ProductDetail";
import Card from "../Card";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 20px 40px 20px 20px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
`;

const FavoriteButton = styled.button<{ favorited: boolean }>`
  position: absolute;
  top: 12px;
  left: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ favorited }) => (favorited ? "gold" : "#ccc")};
  transition: color 0.2s;

  &:hover {
    color: ${({ favorited }) => (favorited ? "#ffda65" : "#999")};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

const RecommendProductBox = styled.div`
  display: flex;
  gap: 5px;
`;

const LoadingMessage = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  color: #555;
  background: #f8f8f8;
  border: 1px dashed #ddd;
  border-radius: 8px;
  text-align: center;
  animation: blink 1.2s infinite;

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

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
