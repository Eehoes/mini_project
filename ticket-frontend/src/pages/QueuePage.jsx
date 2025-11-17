import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function QueuePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("loginUser"));

  // 로그인 직후 전달된 초기 대기 번호
  const initialPosition = location.state?.position ?? null;

  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        // 현재 순번 조회
        const res = await axios.get(
          `http://localhost:8081/queue/position?userId=${user.userId}`
        );
        setPosition(res.data);

        // 입장 가능 여부 체크
        const canEnter = await axios.get(
          `http://localhost:8081/queue/canEnter?userId=${user.userId}`
        );

        if (canEnter.data === true) {
          navigate("/events");
        }
      } catch (err) {
        console.error("대기열 에러:", err);
      }
    };

    // 로그인 직후 바로 한 번 실행
    fetchPosition();

    // 이후 1초마다 실행
    const interval = setInterval(fetchPosition, 1000);

    return () => clearInterval(interval);
  }, []);

  // 초기 랜더링 시 undefined 방지
  if (position === null) return <p>대기열 정보를 불러오는 중...</p>;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>대기열 안내</h2>

      <p style={{ fontSize: "22px", marginTop: "20px" }}>
        현재 대기 번호:{" "}
        <strong style={{ fontSize: "26px" }}>{position}</strong> 번
      </p>

      <p style={{ marginTop: "10px", color: "#777" }}>
        잠시만 기다리시면 자동으로 입장됩니다.
      </p>
    </div>
  );
}
