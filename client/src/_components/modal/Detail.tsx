import styled from "styled-components";
import { useCallback, useState } from "react";
import type { BankProduct } from "../../contexts/DataContext";
import ProductDetail from "../ProductDetail";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative; /* 즐겨찾기, 닫기 버튼 위치를 위한 relative */
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

type Props = {
  closeModal: () => void;
  product: BankProduct;
};

export default function DetailModal({ closeModal, product }: Props) {
  const [favorited, setFavorited] = useState(false);

  const handleSubmit = useCallback(() => {
    alert("예금 신청 완료!" + product.id);
  }, [product]);

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
      </ModalContent>
    </ModalOverlay>
  );
}
