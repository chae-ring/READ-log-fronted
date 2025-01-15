import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { postReview, postStatus } from "../api/instance";


const RegisterPage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState(null);
  const [activeTab, setActiveTab] = useState("status");
  const [showConfirm, setShowConfirm] = useState(false);

  const [reviewFormData, setReviewFormData] = useState({
    title: "",
    author: "",
    rating: 5,
    content: ""
  });

  const [statusFormData, setStatusFormData] = useState({
    title: "",
    author: "",
    status: "읽기 시작",
    category: "소설",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      let response;
      
      if (activeTab === "review") {
        response = await postReview(reviewFormData);
      } else {
        response = await postStatus(statusFormData);
      }

      if (response.data?.success) {
        alert(activeTab === "review" ? '독후감이 성공적으로 등록되었습니다.' : '독서 현황이 성공적으로 등록되었습니다.');
        navigate('/reviews');
      } else {
        throw new Error(response.data?.message || '등록에 실패했습니다.');
      }
    } catch (error) {
      console.error(activeTab === "review" ? '독후감 등록 실패:' : '독서 현황 등록 실패:', error);
      alert(error.message || '등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setShowConfirm(false);
    }
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusInputChange = (e) => {
    const { name, value } = e.target;
    setStatusFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const StatusForm = () => (
    <div className="form-container" style={{ textAlign:"center" }}>
      <Form className="register-form" onSubmit={handleSubmit}>
        <h2>독서 현황 등록</h2>
        <Form.Group className="mb-4">
          <Form.Label>책 제목  </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="책 제목을 입력하세요"
            name="title"
            value={statusFormData.title}
            onChange={handleStatusInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>저자  </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="저자를 입력하세요"
            name="author"
            value={statusFormData.author}
            onChange={handleStatusInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4" style={{ marginBottom: "0.5rem" }}>
          <Form.Label>독서 상태  </Form.Label>
          <Form.Select
            name="status"
            value={statusFormData.status}
            onChange={handleStatusInputChange}
          >
            <option value="읽기 시작">읽기 시작</option>
            <option value="읽는 중">읽는 중</option>
            <option value="완독">완독</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4" style={{ marginBottom: "0.5rem" }}>
          <Form.Label>카테고리  </Form.Label>
          <Form.Select
            name="category"
            value={statusFormData.category}
            onChange={handleStatusInputChange}
          >
            <option value="소설">소설</option>
            <option value="자기계발">자기계발</option>
            <option value="과학">과학</option>
            <option value="역사">역사</option>
            <option value="예술">예술</option>
            <option value="기타">기타</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>시작일  </Form.Label>
          <Form.Control 
            type="date"
            name="startDate"
            value={statusFormData.startDate}
            onChange={handleStatusInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>종료일  </Form.Label>
          <Form.Control 
            type="date"
            name="endDate"
            value={statusFormData.endDate}
            onChange={handleStatusInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          등록하기
        </Button>
      </Form>
    </div>
  );

  const ReviewForm = () => (
    <div className="form-container" style={{ textAlign:"center" }}>
      <Form className="register-form" onSubmit={handleSubmit}>
        <h2>독후감 작성</h2>
        <Form.Group className="mb-4">
          <Form.Label>책 제목  </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="책 제목을 입력하세요"
            name="title"
            value={reviewFormData.title}
            onChange={handleReviewInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>저자  </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="저자를 입력하세요"
            name="author"
            value={reviewFormData.author}
            onChange={handleReviewInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4" style={{ marginBottom: "0.5rem" }}>
          <Form.Label>평점  </Form.Label>
          <Form.Select
            name="rating"
            value={reviewFormData.rating}
            onChange={handleReviewInputChange}
          >
            <option value="5">5점</option>
            <option value="4">4점</option>
            <option value="3">3점</option>
            <option value="2">2점</option>
            <option value="1">1점</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>독후감  </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="독후감을 작성해주세요"
            name="content"
            value={reviewFormData.content}
            onChange={handleReviewInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          등록하기
        </Button>
      </Form>
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
          <button className="nav-btn" onClick={() => navigate("/reviews")}>
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
            <button className="nav-btn active">등록하기</button>
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
                    backgroundColor: hoveredDropdownItem === "status" ? "rgba(0,0,128,0.08)" : "transparent",
                  }}
                  onMouseEnter={() => setHoveredDropdownItem("status")}
                  onMouseLeave={() => setHoveredDropdownItem(null)}
                  onClick={() => setActiveTab("status")}
                >
                  독서현황
                </div>
                <div
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    backgroundColor: hoveredDropdownItem === "review" ? "rgba(0,0,128,0.08)" : "transparent",
                  }}
                  onMouseEnter={() => setHoveredDropdownItem("review")}
                  onMouseLeave={() => setHoveredDropdownItem(null)}
                  onClick={() => setActiveTab("review")}
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 80px)",
          padding: "20px",
          position: "relative",
        }}
      >
        {activeTab === "status" ? <StatusForm /> : <ReviewForm />}
        {showConfirm && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: "20px" }}>등록하시겠습니까?</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                취소
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                확인
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
