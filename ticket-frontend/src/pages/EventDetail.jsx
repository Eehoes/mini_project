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
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "40px" }}>
      
      {/* ====================== 상단 기본 정보 ====================== */}
      <div style={{ display: "flex", gap: "40px" }}>
        
        {/* LEFT: 포스터 */}
        <img
          src={event.imageUrl}
          alt={event.title}
          style={{
            width: "360px",
            height: "520px",
            borderRadius: "10px",
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />

        {/* RIGHT: 상세 정보 */}
        <div style={{ flex: 1 }}>

          {/* 제목 */}
          <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "10px" }}>
            {event.title}
          </h1>

          {/* 기간 + 장소 */}
          <p style={{ color: "#999", fontSize: "14px", marginBottom: "25px" }}>
            {event.period || ""} {event.place || ""}
          </p>

          {/* 테이블처럼 보이게 YES24 스타일 박스 */}
          <div style={{ borderTop: "2px solid #111", paddingTop: "15px" }}>

            {/* 등급 */}
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "120px", color: "#777" }}>등급</div>
              <div style={{ fontWeight: "bold" }}>중학생 이상</div>
            </div>

            {/* 관람시간 */}
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "120px", color: "#777" }}>관람시간</div>
              <div>총 100분 (인터미션 없음)</div>
            </div>

            {/* 출연 */}
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "120px", color: "#777" }}>출연</div>
              <div style={{ lineHeight: "1.5" }}>
                김재범, 유승현, 김지온, 박정혁, 주민진, 최석진, 선한국, 홍기범
              </div>
            </div>

            {/* 가격 */}
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "120px", color: "#777" }}>가격</div>
              <div>
                <div style={{ marginBottom: "6px", fontWeight: "bold" }}>
                  R석 77,000원
                </div>
                <div style={{ fontWeight: "bold" }}>S석 55,000원</div>

                <div style={{ marginTop: "8px", fontSize: "13px", color: "#ff4d00" }}>
                  할인 적용 시 최저가 <b>27,500원</b> ~ 최고가 <b>61,600원</b>
                </div>

                <button
                  style={{
                    marginTop: "8px",
                    padding: "3px 10px",
                    border: "1px solid #ccc",
                    background: "#fff",
                    fontSize: "12px",
                    cursor: "pointer",
                    borderRadius: "3px",
                  }}
                >
                  자세히
                </button>
              </div>
            </div>

            {/* 혜택 */}
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "120px", color: "#777" }}>혜택</div>
              <div style={{ display: "flex", gap: "15px", fontSize: "14px" }}>
                <span style={{ cursor: "pointer" }}>사용가능쿠폰(1)</span>
                <span style={{ cursor: "pointer" }}>무이자할부</span>
                <span style={{ cursor: "pointer" }}>제휴카드할인</span>
              </div>
            </div>

            {/* 구분선 */}
            <div style={{ margin: "25px 0", height: "1px", background: "#eee" }}></div>

            {/* 공연시간 안내 */}
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "120px", color: "#777" }}>공연시간 안내</div>
              <div>
                화·목·금 8시 | 수 4시·8시 | 토 3시·7시 | 일·공휴일 2시·6시
              </div>
            </div>

            {/* 배송정보 */}
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "120px", color: "#777" }}>배송정보</div>
              <div>현장 수령만 가능</div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== 하단 예매 버튼 ====================== */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button
          onClick={() => navigate(`/event/${id}/seat`)}
          style={{
            padding: "16px 50px",
            fontSize: "18px",
            backgroundColor: "#ff3355",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          예매하기
        </button>

        <button
          style={{
            padding: "16px 50px",
            fontSize: "18px",
            backgroundColor: "#fff",
            color: "#444",
            border: "1px solid #ddd",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          GLOBAL BOOKING
        </button>
      </div>
    </div>
  );
}
