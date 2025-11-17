import { useEffect, useState } from "react";
import { fetchEvents } from "../api/eventApi";
import { Link } from "react-router-dom";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <div style={{ width: "100%", margin: "0 auto", padding: "40px 60px" }}>
      {/* ======================== 상단 네비게이션 ======================== */}
      <div
        style={{
          width: "100%",
          padding: "18px 0",
          fontSize: "16px",
          fontWeight: "bold",
          borderBottom: "1px solid #eee",
          display: "flex",
          gap: "30px",
        }}
      >
        <div>콘서트</div>
        <div>뮤지컬</div>
        <div>연극</div>
        <div>클래식/무용</div>
        <div>전시/행사</div>
        <div>가족/아동</div>
      </div>

      {/* ======================== WHAT’S HOT ONLY ======================== */}
      <h2
        style={{
          margin: "40px 0 25px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        WHAT’S HOT
      </h2>

      {events.length === 0 && <p>이벤트를 불러오는 중...</p>}

      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
        }}
      >
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/event/${event.id}`}
            style={{
              width: "200px",
              textDecoration: "none",
              color: "black",
              position: "relative",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {/* 할인 뱃지 */}
            {event.discount && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#ff7f00",
                  color: "white",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                  zIndex: 10,
                }}
              >
                {event.discount}%
              </div>
            )}

            {/* 포스터 */}
            <img
              src={event.imageUrl}
              alt={event.title}
              style={{
                width: "100%",
                height: "260px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />

            {/* 텍스트 정보 */}
            <div style={{ marginTop: "10px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                {event.title}
              </h3>

              <p style={{ fontSize: "13px", color: "#666" }}>
                {event.place || ""}
              </p>
              <p style={{ fontSize: "13px", color: "#666" }}>
                {event.period || ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
