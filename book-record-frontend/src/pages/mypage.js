import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./register.css";

const MyPage = () => {
  const navigate = useNavigate();

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

  const interestedBooks = [
    { id: 1, title: "사피엔스", author: "유발 하라리" },
    { id: 2, title: "아몬드", author: "손원평" },
    { id: 3, title: "이기적 유전자", author: "리처드 도킨스" },
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
        margin: "0 auto",  // 가로 방향 중앙 정렬
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
          <button
            className="nav-btn"
            onClick={() => navigate("/recommendation")}
          >
            추천
          </button>
        </div>

        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate("/register")}>
            등록하기
          </button>
          <button className="nav-btn active">내 서재</button>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            로그인
          </button>
        </div>
      </nav>

      <Container style={{ marginTop: "40px" }}>
        <h2
          style={{
            textAlign: "center",
            color: "#000080",
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          나의 서재
        </h2>

        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ color: "#000080", marginBottom: "20px", textAlign: "center" }}>읽은 책</h3>
          <BookShelf books={readBooks} isRead={true} />
        </div>

        <div>
          <h3 style={{ color: "#000080", marginBottom: "20px", textAlign: "center" }}>관심 도서</h3>
          <BookShelf books={interestedBooks} isRead={false} />
        </div>
      </Container>
    </div>
  );
};

export default MyPage;
