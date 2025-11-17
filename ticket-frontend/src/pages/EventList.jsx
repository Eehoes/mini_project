import { useEffect, useState } from "react";
import { fetchEvents } from "../api/eventApi";
import { Link } from "react-router-dom";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(data => {
      setEvents(data);
    });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "30px" }}>전체 이벤트 목록</h2>

      {events.length === 0 && <p>이벤트를 불러오는 중입니다...</p>}

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {events.map(event => (
          <Link
            key={event.id}
            to={`/event/${event.id}`}
            style={{
              width: "260px",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              textDecoration: "none",
              color: "black",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              transition: "0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* 포스터 */}
            <img
              src={event.imageUrl}
              alt={event.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />

            {/* 정보 */}
            <div style={{ padding: "15px" }}>
              <h3 style={{ marginBottom: "8px" }}>{event.title}</h3>
              <p style={{ fontSize: "14px", color: "#777" }}>
                {event.category ? event.category.name : "카테고리 없음"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
