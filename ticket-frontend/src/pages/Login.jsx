import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    alert("Login.jsx handleLogin 실행됨!");

    if (userId.trim() === "") return alert("아이디를 입력하세요");

    try {
      const res = await axios.post(
        `http://localhost:8081/auth/login?userId=${userId}`
      );

      const user = res.data;

      // 1) 로그인 정보 저장
      localStorage.setItem("loginUser", JSON.stringify(user));

      // 2) 대기열 등록
      const queueRes = await axios.post(
        `http://localhost:8081/queue/enter?userId=${user.userId}`
      );

      // queue 번호
      const position = queueRes.data;

      // 3) QueuePage로 이동 (초기 순번도 넘김)
      alert("대기열 등록 완료, queue로 이동!");
      navigate("/queue", { state: { position } });


    } catch (err) {
      alert("로그인 실패: 존재하지 않는 사용자입니다.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>로그인</h2>

      <input
        type="text"
        placeholder="user1, user2..."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        로그인
      </button>
    </div>
  );
}
