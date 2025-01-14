import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Dropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import "./record.css";

const RecordPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("statistics");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState(null);

  // 샘플 데이터 - 실제 데이터로 교체 필요
  const monthlyData = [
    { month: "1월", books: 3 },
    { month: "2월", books: 4 },
    { month: "3월", books: 2 },
    { month: "4월", books: 5 },
    { month: "5월", books: 3 },
    { month: "6월", books: 4 },
  ];

  const categoryData = [
    { category: "소설", books: 10 },
    { category: "자기계발", books: 5 },
    { category: "과학", books: 3 },
    { category: "역사", books: 4 },
    { category: "예술", books: 2 },
  ];

  const yearlyData = [
    { year: "2020", books: 15 },
    { year: "2021", books: 20 },
    { year: "2022", books: 25 },
    { year: "2023", books: 30 },
    { year: "2024", books: 5 },
  ];

  const statusData = [
    { name: "읽는 중", value: 3 },
    { name: "읽을 예정", value: 5 },
    { name: "완독", value: 12 },
  ];

  // 독후감 상태
  const [reviews, setReviews] = useState([
    { id: 1, title: "책 제목 1", date: "2024-01-15", content: "독후감 내용 미리보기..." },
    { id: 2, title: "책 제목 2", date: "2024-01-16", content: "독후감 내용 미리보기..." },
  ]);
  const [editReview, setEditReview] = useState(null); // 수정할 독후감 데이터

  // 수정 시작
  const handleEditReview = (review) => {
    setEditReview(review);
  };

  // 수정된 독후감 저장
  const handleSaveEditReview = () => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === editReview.id ? { ...review, ...editReview } : review
      )
    );
    setEditReview(null);
  };

  // 삭제
  const handleDeleteReview = (id) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
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
          <button className="nav-btn active">기록</button>
          <button
            className="nav-btn"
            onClick={() => navigate("/mypage")}
          >
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

      <Container fluid className="mt-4">
        <Row>
          <Col md={2}>
            <div
              className={`side-tab ${activeTab === "statistics" ? "active" : ""}`}
              onClick={() => setActiveTab("statistics")}
            >
              <span className="tab-icon">📊</span>
              <span className="tab-text">독서 통계</span>
            </div>
            <div
              className={`side-tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              <span className="tab-icon">📝</span>
              <span className="tab-text">독후감</span>
            </div>
          </Col>

          <Col md={10}>
            {activeTab === "statistics" ? (
              <div className="d-flex flex-column align-items-center">
                <div
                  className="d-flex justify-content-center flex-wrap"
                  style={{ maxWidth: "1200px" }}
                >
                  <Card className="m-3" style={{ width: "500px" }}>
                    <Card.Header>월별 독서량</Card.Header>
                    <Card.Body>
                      <BarChart width={450} height={300} data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="books" fill="#8884d8" />
                      </BarChart>
                    </Card.Body>
                  </Card>
                  <Card className="m-3" style={{ width: "500px" }}>
                    <Card.Header>카테고리별 통계</Card.Header>
                    <Card.Body>
                      <BarChart width={450} height={300} data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="books" fill="#82ca9d" />
                      </BarChart>
                    </Card.Body>
                  </Card>
                  <Card className="m-3" style={{ width: "500px" }}>
                    <Card.Header>연도별 독서량</Card.Header>
                    <Card.Body>
                      <BarChart width={450} height={300} data={yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="books" fill="#ffc658" />
                      </BarChart>
                    </Card.Body>
                  </Card>
                  <Card className="m-3" style={{ width: "500px" }}>
                    <Card.Header>독서 현황</Card.Header>
                    <Card.Body>
                      <PieChart width={450} height={300}>
                        <Pie
                          data={statusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          label
                        />
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ) : (
              <div>
                <Card>
                  <Card.Body>
                    {/* 독후감 목록을 렌더링 */}
                    {reviews.map((review) => (
                      <div key={review.id} className="review-item" style={{ marginBottom: "15px" }}>
                        {editReview?.id === review.id ? (
                          <div>
                            <Form.Control
                              type="text"
                              value={editReview.title}
                              onChange={(e) => setEditReview({ ...editReview, title: e.target.value })}
                            />
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={editReview.content}
                              onChange={(e) => setEditReview({ ...editReview, content: e.target.value })}
                            />
                            <Button variant="success" onClick={handleSaveEditReview}
                              style={{ padding: "4px 15px", width: "50px"}} 
                              >저장</Button>
                            <Button variant="secondary" onClick={() => setEditReview(null)}
                              style={{ padding: "4px 15px", width: "50px"}} 
                              >취소</Button>
                          </div>
                        ) : (
                          <div>
                            <h4>{review.title}</h4>
                            <p>작성일: {review.date}</p>
                            <p>{review.content}</p>
                            <Button variant="warning" onClick={() => handleEditReview(review)} 
                              style={{ padding: "4px 15px", width: "50px"}} 
                              >수정</Button>
                            <Button variant="danger" onClick={() => handleDeleteReview(review.id)} 
                              style={{ padding: "4px 15px", width: "50px" }} 
                              >삭제</Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecordPage;
