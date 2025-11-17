import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SeatSelect() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [groupedSeats, setGroupedSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 좌석 데이터 불러오기
  useEffect(() => {
    axios.get(`http://localhost:8081/events/${id}`)
      .then(res => {
        const seatList = res.data.seats;
        setSeats(seatList);

        // 행(rowLabel) 기준으로 좌석 그룹화
        const groups = {};
        seatList.forEach(seat => {
          if (!groups[seat.rowLabel]) groups[seat.rowLabel] = [];
          groups[seat.rowLabel].push(seat);
        });

        // 열(columnNumber) 기준 정렬
        Object.keys(groups).forEach(row => {
          groups[row].sort((a, b) => a.columnNumber - b.columnNumber);
        });

        setGroupedSeats(groups);
      })
      .catch(err => console.error(err));
  }, [id]);

  // 좌석 선택/해제 처리
  const handleSelectSeat = (seat) => {
    if (!seat.available) return;  // 예약된 좌석은 선택 못함

    const exists = selectedSeats.find(s => s.id === seat.id);

    if (exists) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats(prev => [...prev, seat]);
    }
  };

  // 좌석 색상 결정
  const getSeatColor = (seat, isSelected) => {
    if (!seat.available) return "#bfbfbf";       // 회색: 예약됨
    if (isSelected) return "#ff4b4b";            // 빨간색: 선택됨

    switch (seat.grade) {
      case "VIP": return "#d4af37";             // 금색
      case "R": return "#5f8bff";               // 파란색
      case "S": return "#4CAF50";               // 초록색
      default: return "#999";
    }
  };

  // 결제 페이지로 좌석 정보 전달
  const goToPayment = () => {
    navigate("/payment", {
      state: {
        seats: selectedSeats,
        eventId: id
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>좌석 선택</h2>

      {/* 좌석표 전체를 가운데 정렬 */}
      <div style={{ width: "fit-content", margin: "0 auto", textAlign: "center" }}>

        {/* STAGE 박스 */}
        <div style={{
          width: "300px",
          padding: "10px",
          backgroundColor: "#333",
          color: "white",
          borderRadius: "6px",
          margin: "0 auto 30px auto"
        }}>
          STAGE
        </div>

        {/* 좌석표 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {Object.keys(groupedSeats).sort().map(row => (
            <div key={row} style={{ display: "flex", alignItems: "center", gap: "15px" }}>

              {/* 좌측 A/B/C 행 표시 */}
              <div
                style={{
                  width: "20px",
                  fontWeight: "bold",
                  textAlign: "center"
                }}>
                {row}
              </div>

              {/* 좌석 번호 표시 */}
              <div style={{ display: "flex", gap: "10px" }}>
                {groupedSeats[row].map(seat => {
                  const isSelected = selectedSeats.find(s => s.id === seat.id);

                  return (
                    <div
                      key={seat.id}
                      onClick={() => handleSelectSeat(seat)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        backgroundColor: getSeatColor(seat, isSelected),
                        cursor: seat.available ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "13px",
                        userSelect: "none"
                      }}
                    >
                      {seat.columnNumber}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 선택된 좌석 리스트 */}
      <h3 style={{ marginTop: "40px" }}>선택된 좌석</h3>

      {selectedSeats.length === 0 && <p>선택된 좌석 없음</p>}

      <ul>
        {selectedSeats.map(s => (
          <li key={s.id}>
            {s.rowLabel}{s.columnNumber}번 / {s.grade}석 / {s.price.toLocaleString()}원
          </li>
        ))}
      </ul>

      {/* 결제 페이지 이동 버튼 */}
      {selectedSeats.length > 0 && (
        <button
          onClick={goToPayment}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#333",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          결제하기
        </button>
      )}
    </div>
  );
}
