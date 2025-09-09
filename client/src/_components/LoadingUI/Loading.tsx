import styled, { keyframes } from "styled-components";

// 텍스트가 깜빡이는 애니메이션 정의
const pulse = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`;

// 애니메이션이 적용된 스타일 컴포넌트
const LoadingText = styled.div`
  font-size: 1.2rem;
  color: #555;
  animation: ${pulse} 1.5s infinite ease-in-out;
  text-align: center;
  margin-top: 200px;
`;

export default function LoadingUI() {
  return <LoadingText>조건에 맞는 상품을 찾고 있습니다...</LoadingText>;
}
