import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./recommendation.css";

const RecommendationPage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 샘플 데이터 - 실제 데이터로 교체 필요
  const authorBasedRecommendations = [
    {
      title: "멋진 신세계",
      author: "올더스 헉슬리",
      category: "소설",
      description: "당신이 읽은 '1984'의 작가와 유사한 디스토피아 소설입니다.",
      imageUrl: "https://example.com/book1.jpg", // 추후 실제 이미지로 교체 필요
    },
    {
      title: "동물농장",
      author: "조지 오웰",
      category: "소설",
      description: "'1984'의 작가 조지 오웰의 다른 대표작입니다.",
      imageUrl: "https://example.com/book2.jpg", // 추후 실제 이미지로 교체 필요
    },
  ];

  const categoryBasedRecommendations = [
    {
      title: "이기적 유전자",
      author: "리처드 도킨스",
      category: "과학",
      description: "당신이 관심있는 과학 분야의 또다른 명저입니다.",
      imageUrl: "https://example.com/book3.jpg", // 추후 실제 이미지로 교체 필요
    },
    {
      title: "코스모스",
      author: "칼 세이건",
      category: "과학",
      description: "과학에 관심이 있는 당신을 위한 우주 과학 명저입니다.",
      imageUrl: "https://example.com/book4.jpg", // 추후 실제 이미지로 교체 필요
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // 검색 로직 구현
    console.log("Searching for:", searchTerm);
  };

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
          <button className="nav-btn active">추천</button>
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
          <button className="nav-btn" onClick={() => navigate("/mypage")}>
            내 서재
          </button>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            로그인
          </button>
        </div>
      </nav>

      <Container className="recommendation-container">
        <section className="recommendation-section">
          <h2>작가 기반 추천</h2>
          <p className="section-description">
            당신이 읽은 작가의 다른 작품과 유사한 작가들의 작품을
            추천해드립니다.
          </p>
          <Row>
            {authorBasedRecommendations.map((book, index) => (
              <Col md={6} key={index}>
                <Card className="book-card">
                  <div className="book-image">
                    {/* <img src={book.imageUrl} alt={book.title} /> */}
                  </div>
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author}
                    </Card.Subtitle>
                    <Card.Text>{book.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="recommendation-section">
          <h2>카테고리 기반 추천</h2>
          <p className="section-description">
            당신이 관심있는 카테고리의 다른 책들을 추천해드립니다.
          </p>
          <Row>
            {categoryBasedRecommendations.map((book, index) => (
              <Col md={6} key={index}>
                <Card className="book-card">
                  <div className="book-image">
                    {/* <img src={book.imageUrl} alt={book.title} /> */}
                  </div>
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author}
                    </Card.Subtitle>
                    <Card.Text>{book.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <div
          className="search-section"
          style={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Form
            onSubmit={handleSearch}
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                placeholder="도서를 검색해보세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <Button variant="primary" type="submit">
                검색
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default RecommendationPage;
