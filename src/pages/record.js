import React, { useState, useEffect } from "react"; // Add useEffect
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
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
import {
  updateReview,
  deleteReview,
  getYearlyData,
  getMonthlyData,
  getCategoryData,
  getStatusData,
} from "../api/instance";

const RecordPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("statistics");
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);

  // API 호출 및 데이터 세팅
  useEffect(() => {
    const fetchData = async () => {
      try {
        setYearlyData(await getYearlyData());
        setMonthlyData(await getMonthlyData());
        setCategoryData(await getCategoryData());
        setStatusData(await getStatusData());
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditReview = (review) => setEditReview(review);

  const handleSaveEditReview = async () => {
    try {
      const { id, title, content } = editReview;
      const response = await updateReview({ id, title, content });

      if (response.status === 200 || response.success) {
        alert("독후감이 성공적으로 수정되었습니다.");
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === editReview.id ? { ...review, ...editReview } : review
          )
        );
        setEditReview(null);
      } else {
        throw new Error(
          response.data?.message || "독후감 수정에 실패했습니다."
        );
      }
    } catch (error) {
      console.error("독후감 수정 실패:", error);
      alert(error.message || "독후감 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await deleteReview(id);

        if (response.status === 200 || response.success) {
          alert("독후감이 성공적으로 삭제되었습니다.");
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review.id !== id)
          );
        } else {
          throw new Error(
            response.data?.message || "독후감 삭제에 실패했습니다."
          );
        }
      } catch (error) {
        console.error("독후감 삭제 실패:", error);
        alert(error.message || "독후감 삭제 중 오류가 발생했습니다.");
      }
    }
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

      <Container fluid className="mt-4">
        <Row>
          <Col md={2}>
            <div
              className={`side-tab ${
                activeTab === "statistics" ? "active" : ""
              }`}
              onClick={() => setActiveTab("statistics")}
            >
              <span className="tab-icon">📊</span>
              <span className="tab-text">독서 통계</span>
            </div>
            <div
              className={`side-tab ${activeTab === "record" ? "active" : ""}`}
              onClick={() => setActiveTab("record")}
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
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="review-item"
                        style={{ marginBottom: "15px" }}
                      >
                        {editReview?.id === review.id ? (
                          <div>
                            <Form.Control
                              type="text"
                              value={editReview.title}
                              onChange={(e) =>
                                setEditReview({
                                  ...editReview,
                                  title: e.target.value,
                                })
                              }
                            />
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={editReview.content}
                              onChange={(e) =>
                                setEditReview({
                                  ...editReview,
                                  content: e.target.value,
                                })
                              }
                            />
                            <Button
                              variant="success"
                              onClick={handleSaveEditReview}
                              style={{ padding: "4px 15px", width: "50px" }}
                            >
                              저장
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => setEditReview(null)}
                              style={{ padding: "4px 15px", width: "50px" }}
                            >
                              취소
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <h4>{review.title}</h4>
                            <p>작성일: {review.date}</p>
                            <p>{review.content}</p>
                            <Button
                              variant="warning"
                              onClick={() => handleEditReview(review)}
                              style={{ padding: "4px 15px", width: "50px" }}
                            >
                              수정
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteReview(review.id)}
                              style={{ padding: "4px 15px", width: "50px" }}
                            >
                              삭제
                            </Button>
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
