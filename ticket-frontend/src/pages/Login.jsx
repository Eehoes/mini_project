import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (userId.trim() === "") return alert("아이디를 입력하세요");

    try {
      const res = await axios.post(
        `http://localhost:8081/auth/login?userId=${userId}`
      );

      const user = res.data;

      // 로그인 정보 저장
      localStorage.setItem("loginUser", JSON.stringify(user));

      // 대기열 등록
      const queueRes = await axios.post(
        `http://localhost:8081/queue/enter?userId=${user.userId}`
      );

      const position = queueRes.data;
      navigate("/queue", { state: { position } });

    } catch (err) {
      alert("로그인 실패: 존재하지 않는 사용자입니다.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 0",
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "450px",
          backgroundColor: "#fff",
          padding: "40px",
          border: "1px solid #ddd",
        }}
      >

        {/* 탭 버튼 */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <button
            style={{
              flex: 1,
              height: "48px",
              border: "1px solid #ddd",
              background: "#fff",
              fontSize: "16px",
              borderBottom: "2px solid #1e90ff",
            }}
          >
            회원
          </button>

          <button
            style={{
              flex: 1,
              height: "48px",
              border: "1px solid #ddd",
              background: "#fafafa",
              fontSize: "16px",
              borderLeft: "none",
            }}
          >
            비회원 주문확인
          </button>
        </div>

        {/* 입력창 (너비 줄임) */}
        <input
          type="text"
          placeholder="아이디 입력"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            width: "calc(100% - 30px)",   
            height: "48px",
            padding: "0 14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="비밀번호 입력"
          style={{
            width: "calc(100% - 30px)",  
            height: "48px",
            padding: "0 14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        />

        {/* 체크박스 */}
        <div style={{ marginBottom: "20px", fontSize: "14px" }}>
          <label style={{ marginRight: "20px" }}>
            <input type="checkbox" style={{ marginRight: "4px" }} />
            로그인 상태 유지
          </label>
          <label>
            <input type="checkbox" style={{ marginRight: "4px" }} />
            아이디 저장
          </label>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "48px",
            backgroundColor: "#0074ff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "18px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          로그인
        </button>

        {/* 아이디/비밀번호 찾기 */}
        <div
          style={{
            fontSize: "14px",
            color: "gray",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          아이디 찾기 | 비밀번호 찾기
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div
          style={{
            border: "1px solid #ddd",
            height: "48px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "14px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          네이버 아이디로 로그인
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            height: "48px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "14px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          카카오 아이디로 로그인
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            height: "48px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "14px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          페이스북 아이디로 로그인
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            height: "48px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "14px",
            cursor: "pointer",
          }}
        >
          휴대폰 간편 로그인
        </div>

      </div>
    </div>
  );
}
