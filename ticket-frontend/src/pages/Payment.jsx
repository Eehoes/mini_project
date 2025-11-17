import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { fetchEventDetail } from "../api/eventApi";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { seats, eventId } = location.state || {
    seats: [],
    eventId: null,
  };

  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);

  const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);

  // 이벤트 상세 정보 호출
  useEffect(() => {
    if (eventId) {
      fetchEventDetail(eventId).then((data) => setEvent(data));
    }
  }, [eventId]);

  const handleReservation = async () => {
    if (loading) return;
    setLoading(true);

    try {
      for (const seat of seats) {
        await axios.post(
          "http://localhost:8081/reservations",
          {},
          { params: { eventId, seatId: seat.id } }
        );
      }

      navigate("/success", {
        state: { seats, totalPrice, event },
      });
    } catch (err) {
      console.error(err);
      alert("예매 중 오류 발생! 이미 예약된 좌석일 수 있습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <p style={{ padding: 20 }}>공연 정보를 불러오는 중...</p>;

  return (
    <div style={{ width: "100%", maxWidth: "850px", margin: "0 auto", padding: "30px" }}>
      
      {/* ================= 예매내역 박스 (YES24 스타일) ================= */}
      <div
        style={{
          border: "2px solid #d0d8e5",
          borderRadius: "6px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginBottom: "15px", fontSize: "20px", fontWeight: "bold" }}>
          예매내역
        </h3>

        <div style={{ display: "flex", gap: "20px" }}>
          {/* 포스터 */}
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{
              width: "140px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />

          {/* 공연 정보 */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {event.title}
            </div>

            <table style={{ width: "100%", fontSize: "14px", color: "#444" }}>
              <tbody>
                <tr>
                  <td style={{ width: "120px", color: "#777" }}>공연장</td>
                  <td>{event.place || "장소 미등록"}</td>
                </tr>
                <tr>
                  <td style={{ color: "#777" }}>선택 좌석</td>
                  <td>
                    {seats.map((s) => (
                      <div key={s.id}>
                        {s.grade}석 {s.rowLabel}
                        {s.columnNumber}번 ({s.price.toLocaleString()}원)
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= 결제내역 박스 ================= */}
      <div
        style={{
          border: "2px solid #e3e3e3",
          borderRadius: "6px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ fontSize: "18px", marginBottom: "15px", fontWeight: "bold" }}>
          결제내역
        </h3>

        <table style={{ width: "100%", fontSize: "14px" }}>
          <tbody>
            <tr>
              <td style={{ width: "120px", color: "#777" }}>결제금액</td>
              <td style={{ fontWeight: "bold", fontSize: "16px" }}>
                {totalPrice.toLocaleString()}원
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= 결제하기 버튼 ================= */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleReservation}
          disabled={loading}
          style={{
            width: "240px",
            backgroundColor: "#2d7be5",
            padding: "14px 0",
            color: "#fff",
            border: "none",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "결제 진행 중..." : "결제하기"}
        </button>
      </div>
    </div>
  );
}
