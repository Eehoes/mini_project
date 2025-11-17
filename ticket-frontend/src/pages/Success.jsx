import { useLocation, Link } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const { seats, totalPrice, event } = location.state || {};

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>

      {/* 상단 완료 문구 */}
      <div
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#2d7be5",
          marginBottom: "30px",
          padding: "15px 0",
          borderBottom: "1px solid #eee",
        }}
      >
        예매/결제가 정상적으로 완료되었습니다.
      </div>

      {/* 예매완료 내역 박스 */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {/* 포스터 */}
        {event?.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{
              width: "90px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        )}

        {/* 공연 이름 */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "6px" }}>
            {event?.title || "공연 제목"}
          </div>
          <div style={{ fontSize: "14px", color: "#777" }}>
            {event?.place || "장소 미등록"}
          </div>
        </div>
      </div>

      {/* 예매 좌석 */}
      <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>예매 좌석</h3>

      <ul style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
        {seats &&
          seats.map((s) => (
            <li key={s.id}>
              {s.rowLabel}
              {s.columnNumber}번 ({s.grade}) – {s.price.toLocaleString()}원
            </li>
          ))}
      </ul>

      {/* 총 결제 금액 */}
      <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>총 결제 금액</h3>

      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        {totalPrice?.toLocaleString()}원
      </div>

      {/* 메인으로 돌아가기 버튼 */}
      <Link
        to="/"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          padding: "14px 0",
          backgroundColor: "#2d7be5",
          color: "#fff",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}
