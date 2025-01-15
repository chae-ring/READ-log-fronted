import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { fetchBooksByStatus } from "../api/instance";

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState({
    reading: [],
    completed: [],
    abandoned: [],
  });
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState(null); // 드롭다운 항목 hover 상태

  // 사용자 인증 토큰 (예시)
  const token = "사용자_인증_토큰"; // 실제 토큰 값을 사용해야 합니다.

  useEffect(() => {
    fetchBooksByStatus(token, "READING")
      .then((data) => {
        console.log("읽는 중 책:", data); // 데이터 확인용
        setBooks((prevBooks) => ({ ...prevBooks, reading: data }));
      })
      .catch((error) => {
        console.error("읽는 중 책 불러오기 오류:", error);
      });

    fetchBooksByStatus(token, "COMPLETED")
      .then((data) => {
        console.log("완독 책:", data); // 데이터 확인용
        setBooks((prevBooks) => ({ ...prevBooks, completed: data }));
      })
      .catch((error) => {
        console.error("완독 책 불러오기 오류:", error);
      });

    fetchBooksByStatus(token, "ABANDONED")
      .then((data) => {
        console.log("읽기 전 책:", data); // 데이터 확인용
        setBooks((prevBooks) => ({ ...prevBooks, abandoned: data }));
      })
      .catch((error) => {
        console.error("읽기 전 책 불러오기 오류:", error);
      });
  }, [token]);

  // 책 수정 처리 함수
  const handleEditBook = (status, bookId) => {
    setBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks };
      const book = updatedBooks[status].find((b) => b.id === bookId);
      if (book) {
        book.isEditing = !book.isEditing; // 편집 상태 토글
      }
      return updatedBooks;
    });
  };

  // 책 삭제 처리 함수
  const handleDeleteBook = (status, bookId) => {
    setBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks };
      updatedBooks[status] = updatedBooks[status].filter(
        (book) => book.id !== bookId
      );
      return updatedBooks;
    });
  };

  // 책 저장 처리 함수
  const handleSaveEdit = (
    status,
    bookId,
    title,
    author,
    currentPage,
    totalPages
  ) => {
    setBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks };
      const book = updatedBooks[status].find((b) => b.id === bookId);
      if (book) {
        book.title = title;
        book.author = author;
        book.currentPage = currentPage;
        book.totalPages = totalPages;
        book.isEditing = false; // 편집 상태 해제
      }
      return updatedBooks;
    });
  };

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
          <button className="nav-btn" onClick={() => navigate("/mypage")}>
            내 서재
          </button>
        </div>

        <div className="nav-right">
          <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{ position: "relative" }}
          >
            <button className="nav-btn">등록하기</button>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "white",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  borderRadius: "4px",
                  padding: "8px 0",
                  zIndex: 1000,
                  minWidth: "150px",
                }}
              >
                <div
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    backgroundColor:
                      hoveredDropdownItem === "status"
                        ? "rgba(0,0,128,0.08)"
                        : "transparent",
                  }}
                  onMouseEnter={() => setHoveredDropdownItem("status")}
                  onMouseLeave={() => setHoveredDropdownItem(null)}
                  onClick={() => navigate("/register")}
                >
                  독서현황
                </div>
                <div
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    backgroundColor:
                      hoveredDropdownItem === "review"
                        ? "rgba(0,0,128,0.08)"
                        : "transparent",
                  }}
                  onMouseEnter={() => setHoveredDropdownItem("review")}
                  onMouseLeave={() => setHoveredDropdownItem(null)}
                  onClick={() => navigate("/register")}
                >
                  독후감작성
                </div>
              </div>
            )}
          </div>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            로그인
          </button>
        </div>
      </nav>

      <main className="content">
        <section className="reading-status">
          {/* 읽는 중 */}
          <div className="status-card">
            <h2>읽는 중</h2>
            <div>
              {books.reading.map((book) => (
                <div key={book.id} className="book-item">
                  {book.isEditing ? (
                    <div>
                      <input
                        type="text"
                        defaultValue={book.title}
                        onChange={(e) => (book.title = e.target.value)}
                      />
                      <input
                        type="text"
                        defaultValue={book.author}
                        onChange={(e) => (book.author = e.target.value)}
                      />
                      <input
                        type="number"
                        defaultValue={book.currentPage}
                        onChange={(e) => (book.currentPage = e.target.value)}
                      />
                      <input
                        type="number"
                        defaultValue={book.totalPages}
                        onChange={(e) => (book.totalPages = e.target.value)}
                      />
                      <button
                        onClick={() =>
                          handleSaveEdit(
                            "reading",
                            book.id,
                            book.title,
                            book.author,
                            book.currentPage,
                            book.totalPages
                          )
                        }
                      >
                        저장
                      </button>
                      <button
                        onClick={() => handleEditBook("reading", book.id)}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3>{book.title}</h3>
                      <p>저자: {book.author}</p>
                      <p>카테고리: {book.category}</p>
                      <p>
                        진행률:{" "}
                        {Math.round((book.currentPage / book.totalPages) * 100)}
                        %
                      </p>
                      <p>
                        ({book.currentPage}/{book.totalPages} 페이지)
                      </p>
                      <button
                        onClick={() => handleEditBook("reading", book.id)}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteBook("reading", book.id)}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 완료된 책들 */}
          <div className="status-card">
            <h2>완독</h2>
            <div>
              {books.completed.map((book) => (
                <div key={book.id} className="book-item">
                  {book.isEditing ? (
                    <div>
                      <input
                        type="text"
                        defaultValue={book.title}
                        onChange={(e) => (book.title = e.target.value)}
                      />
                      <input
                        type="text"
                        defaultValue={book.author}
                        onChange={(e) => (book.author = e.target.value)}
                      />
                      <input
                        type="number"
                        defaultValue={book.totalPages}
                        onChange={(e) => (book.totalPages = e.target.value)}
                      />
                      <button
                        onClick={() =>
                          handleSaveEdit(
                            "completed",
                            book.id,
                            book.title,
                            book.author,
                            0,
                            book.totalPages
                          )
                        }
                      >
                        저장
                      </button>
                      <button
                        onClick={() => handleEditBook("completed", book.id)}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3>{book.title}</h3>
                      <p>저자: {book.author}</p>
                      <p>카테고리: {book.category}</p>
                      <p>총 {book.totalPages} 페이지</p>
                      <button
                        onClick={() => handleEditBook("completed", book.id)}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteBook("completed", book.id)}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 중단된 책들 */}
          <div className="status-card">
            <h2>읽기 전</h2>
            <div>
              {books.abandoned.map((book) => (
                <div key={book.id} className="book-item">
                  <h3>{book.title}</h3>
                  <p>저자: {book.author}</p>
                  <p>카테고리: {book.category}</p>
                  <p>총 {book.totalPages} 페이지</p>
                  <button onClick={() => handleEditBook("abandoned", book.id)}>
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteBook("abandoned", book.id)}
                  >
                    삭제
                  </button>
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
