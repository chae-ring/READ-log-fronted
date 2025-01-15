import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/instance"; // 사용자 정보 조회 API
import "./register.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("로그인되지 않았습니다.");
      }

      const userInfo = await getUserInfo(token);
      console.log("서버 응답:", userInfo); // 응답 확인
      setNickname(userInfo); // 닉네임 설정
    } catch (err) {
      console.error("사용자 정보 조회 중 오류 발생:", err);
      console.log("에러 메시지:", err); // 에러 메시지 확인
      setError(err.message || "사용자 정보 조회 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); // 요청 완료 후 로딩 상태 변경
    }
  };
  useEffect(() => {
    console.log("마이페이지 데이터 로딩 시작...");
    fetchUserInfo();
  }, []);

  // 임시 데이터
  const readBooks = [
    {
      id: 1,
      title: "클린 코드",
      author: "로버트 C. 마틴",
      readDate: "2023-05",
    },
    { id: 2, title: "1984", author: "조지 오웰", readDate: "2023-06" },
    { id: 3, title: "데미안", author: "헤르만 헤세", readDate: "2023-07" },
  ];

  const BookShelf = ({ books, isRead }) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        background: "#f4ead5", // 책장 색상
        borderRadius: "8px",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
        width: "70%", // 너비를 화면 너비의 80%로 설정
        margin: "0 auto", // 가로 방향 중앙 정렬
      }}
    >
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            width: "150px",
            height: "200px",
            background: "linear-gradient(to right, #2c3e50, #3498db)",
            borderRadius: "2px 8px 8px 2px",
            padding: "10px",
            color: "white",
            position: "relative",
            cursor: "pointer",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
            transform: "rotate(-5deg)",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "rotate(0deg) scale(1.05)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "rotate(-5deg)")
          }
        >
          <div
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              height: "100%",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            {book.title}
            <div
              style={{
                fontSize: "0.7rem",
                marginTop: "10px",
                color: "#ddd",
              }}
            >
              {book.author}
            </div>
            {isRead && book.readDate && (
              <div
                style={{
                  fontSize: "0.6rem",
                  marginTop: "5px",
                  color: "#bbb",
                }}
              >
                {book.readDate}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">READ-log</div>
        </div>

        <div className="nav-center">
          <button className="nav-btn" onClick={() => navigate("/")}>
            독서현황
          </button>
          <button className="nav-btn" onClick={() => navigate("/record")}>
            기록
          </button>
          <button className="nav-btn" onClick={() => navigate("/mypage")}>
            내 서재
          </button>
        </div>

        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate("/register")}>
            등록하기
          </button>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            로그인
          </button>
        </div>
      </nav>

      <Container style={{ marginTop: "40px" }}>
        <h2
          style={{
            border: "2px solid #000080", // 파란색 테두리
            padding: "10px", // 내부 여백
            borderRadius: "10px", // 둥근 테두리
            backgroundColor: "#f0f8ff", // 연한 파란색 배경
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 그림자 효과
            maxWidth: "200px", // 박스 최대 너비
            margin: "0 auto", // 화면 중앙 정렬
            textAlign: "center", // 텍스트 가운데 정렬
            marginBottom: "20px",
          }}
        >
          {loading ? "로딩 중..." : error ? error : `${nickname} 님의 서재`}
        </h2>

        <div style={{ marginBottom: "40px" }}>
          <h3
            style={{
              border: "2px solid #000080", // 파란색 테두리
              padding: "5px", // 내부 여백
              borderRadius: "10px", // 둥근 테두리
              backgroundColor: "#f0f8ff", // 연한 파란색 배경
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 그림자 효과
              maxWidth: "100px", // 박스 최대 너비
              margin: "0 auto", // 화면 중앙 정렬
              textAlign: "center", // 텍스트 가운데 정렬
              marginBottom: "20px",
            }}
          >
            읽은 책
          </h3>
          <BookShelf books={readBooks} isRead={true} />
        </div>
      </Container>
    </div>
  );
};

export default MyPage;
