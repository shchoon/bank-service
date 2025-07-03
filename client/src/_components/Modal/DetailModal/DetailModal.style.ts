import styled from "styled-components";

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
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

export const FavoriteButton = styled.button<{ favorited: boolean }>`
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

export const CloseButton = styled.button`
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

export const RecommendProductBox = styled.div`
  display: flex;
  gap: 5px;
`;

export const LoadingMessage = styled.div`
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
