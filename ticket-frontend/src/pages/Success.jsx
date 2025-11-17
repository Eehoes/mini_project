import { useLocation, Link } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const { seats, totalPrice } = location.state || {};

  return (
    <div style={{ padding: "20px" }}>
      <h2>예매 완료</h2>

      <p>예매가 성공적으로 완료되었습니다!</p>

      <h3>예매 좌석</h3>
      <ul>
        {seats && seats.map(s => (
          <li key={s.id}>
            {s.rowLabel}{s.columnNumber}번 ({s.grade}) / {s.price.toLocaleString()}원
          </li>
        ))}
      </ul>

      <h3>총 결제 금액: {totalPrice.toLocaleString()}원</h3>

      <Link to="/" style={{ display: "block", marginTop: "20px" }}>
        메인으로 돌아가기
      </Link>
    </div>
  );
}
