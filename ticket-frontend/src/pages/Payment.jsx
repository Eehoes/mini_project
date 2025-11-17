import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { seats, eventId } = location.state || {
    seats: [],
    eventId: null
  };

  const [loading, setLoading] = useState(false);

  const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);

  const handleReservation = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // 좌석 개수만큼 예약 요청
      for (const seat of seats) {
        await axios.post(
          "http://localhost:8081/reservations",
          {},
          {
            params: {
              eventId: eventId,
              seatId: seat.id
            }
          }
        );
      }

      // 결제 완료 후 성공 페이지 이동
      navigate("/success", {
        state: {
          seats,
          totalPrice
        }
      });

    } catch (err) {
      console.error(err);
      alert("예매 중 오류 발생! 이미 예약된 좌석일 수 있습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>결제 페이지</h2>

      <h3>선택한 좌석</h3>

      {seats.length === 0 && <p>선택된 좌석 없음</p>}

      <ul>
        {seats.map(seat => (
          <li key={seat.id}>
            {seat.rowLabel}{seat.columnNumber}번 / {seat.grade}석 / 
            {seat.price.toLocaleString()}원
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "20px" }}>
        총 금액: {totalPrice.toLocaleString()}원
      </h3>

      <button
        onClick={handleReservation}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "14px 30px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? "예매 진행 중..." : "결제하기"}
      </button>
    </div>
  );
}
