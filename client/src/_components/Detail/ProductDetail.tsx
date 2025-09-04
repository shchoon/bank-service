import { memo } from "react";

import type { BankProduct } from "../../type";

type Props = {
  product: BankProduct;
  submit: (id: number) => void;
};

const ProductDetail = memo(function ProductDetail({ product, submit }: Props) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>
        <strong>은행명:</strong> {product.companyName}
      </p>
      <p>
        <strong>기본금리:</strong> {product.interestRate}%
      </p>
      <p>
        <strong>최고금리:</strong> {product.primeInterestRate}%
      </p>
      <p>
        <strong>예치금액:</strong> {product.depositAmount.toLocaleString()}원
      </p>
      <button type="button" onClick={() => submit(product.id)}>
        신청하기
      </button>
    </div>
  );
});

export default ProductDetail;
