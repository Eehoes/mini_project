import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventDetail } from "../api/eventApi";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventDetail(id).then((data) => {
      setEvent(data);
    });
  }, [id]);

  if (!event) return <p>이벤트 정보를 불러오는 중...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2>{event.title}</h2>

      <img
        src={event.imageUrl}
        alt={event.title}
        style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }}
      />

      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        {event.description}
      </p>

      <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        카테고리: {event.category?.name || "없음"}
      </p>

      <button
        onClick={() => navigate(`/event/${id}/seat`)}
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "16px",
          fontSize: "18px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        예매하기 →
      </button>
    </div>
  );
}
