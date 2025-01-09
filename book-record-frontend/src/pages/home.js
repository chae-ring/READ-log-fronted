import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState({
    reading: [
      {
        title: "아주 작은 습관의 힘",
        author: "제임스 클리어",
        category: "자기계발",
        currentPage: 125,
        totalPages: 312,
      },
      {
        title: "사피엔스",
        author: "유발 하라리",
        category: "역사",
        currentPage: 89,
        totalPages: 524,
      },
    ],
    toRead: [
      {
        title: "총, 균, 쇠",
        author: "재레드 다이아몬드",
        category: "과학",
        totalPages: 420,
      },
      {
        title: "이기적 유전자",
        author: "리처드 도킨스",
        category: "과학",
        totalPages: 386,
      },
    ],
    completed: [
      {
        title: "1984",
        author: "조지 오웰",
        category: "소설",
        totalPages: 328,
      },
      {
        title: "멋진 신세계",
        author: "올더스 헉슬리",
        category: "소설",
        totalPages: 288,
      },
    ],
  });

  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">READ-log</div>
        </div>

        <div className="nav-center">
          <button className="nav-btn">독서현황</button>
          <button className="nav-btn" onClick={() => navigate("/record")}>
            기록
          </button>
          <button className="nav-btn">추천</button>
        </div>

        <div className="nav-right">
          <button className="nav-btn">등록하기</button>
          <button className="nav-btn">내 서재</button>
          <button className="nav-btn">로그인</button>
        </div>
      </nav>

      <main className="content">
        <section className="reading-status">
          <div className="status-card">
            <h2>읽는 중</h2>
            <div>
              {books.reading.map((book, index) => (
                <div key={index} className="book-item">
                  <h3>{book.title}</h3>
                  <p>저자: {book.author}</p>
                  <p>카테고리: {book.category}</p>
                  <p>
                    진행률:{" "}
                    {Math.round((book.currentPage / book.totalPages) * 100)}%
                  </p>
                  <p>
                    ({book.currentPage}/{book.totalPages} 페이지)
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="status-card">
            <h2>읽을 예정</h2>
            <div>
              {books.toRead.map((book, index) => (
                <div key={index} className="book-item">
                  <h3>{book.title}</h3>
                  <p>저자: {book.author}</p>
                  <p>카테고리: {book.category}</p>
                  <p>총 {book.totalPages} 페이지</p>
                </div>
              ))}
            </div>
          </div>

          <div className="status-card">
            <h2>완독</h2>
            <div>
              {books.completed.map((book, index) => (
                <div key={index} className="book-item">
                  <h3>{book.title}</h3>
                  <p>저자: {book.author}</p>
                  <p>카테고리: {book.category}</p>
                  <p>총 {book.totalPages} 페이지</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
