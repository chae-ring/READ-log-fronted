import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
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
    content: "",
  });

  const [statusFormData, setStatusFormData] = useState({
    name: "", // 책 제목
    writer: "", // 저자
    status: "READING", // 독서 상태
    genre: "NOVEL", // 카테고리
    startReadDate: "", // 시작일
    lastReadDate: "", // 종료일
    currentPage: 0, // 현재 페이지
    totalPage: 0, // 전체 페이지
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
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
        response = await postStatus(statusFormData); // 수정 필요 없음
      }

      if (response.status === 201 || response.status === 204) {
        alert(
          activeTab === "review"
            ? "독후감이 성공적으로 등록되었습니다."
            : "독서 현황이 성공적으로 등록되었습니다."
        );
        navigate("/reviews");
      } else {
        throw new Error(response.data?.message || "등록에 실패했습니다.");
      }
    } catch (error) {
      console.error(
        activeTab === "review" ? "독후감 등록 실패:" : "독서 현황 등록 실패:",
        error
      );
      alert(error.message || "등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setShowConfirm(false);
    }
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusInputChange = (e) => {
    const { name, value } = e.target;
    setStatusFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const StatusForm = () => (
    <div className="form-container" style={{ textAlign: "center" }}>
      <Form className="register-form" onSubmit={handleSubmit}>
        <h2>독서 현황 등록</h2>
        <Form.Group className="mb-4">
          <Form.Label>책 제목 </Form.Label>
          <Form.Control
            type="String"
            placeholder="책 제목을 입력하세요"
            name="name"
            value={statusFormData.name}
            onChange={handleStatusInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>저자 </Form.Label>
          <Form.Control
            type="String"
            placeholder="저자를 입력하세요"
            name="writer"
            value={statusFormData.writer}
            onChange={handleStatusInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4" style={{ marginBottom: "0.5rem" }}>
          <Form.Label>독서 상태 </Form.Label>
          <Form.Select
            name="status"
            value={statusFormData.status}
            onChange={handleStatusInputChange}
          >
            <option value="READING">읽기 시작</option>
            <option value="COMPLETED">완독</option>
            <option value="ABANDONED">읽는 중</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4" style={{ marginBottom: "0.5rem" }}>
          <Form.Label>카테고리 </Form.Label>
          <Form.Select
            name="genre"
            value={statusFormData.genre}
            onChange={handleStatusInputChange}
          >
            <option value="NOVEL">소설</option>
            <option value="NONFICTION">논픽션</option>
            <option value="SELFHELP">자기계발</option>
            <option value="FANTASY">판타지</option>
            <option value="MYSTERY">미스터리</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>시작일 </Form.Label>
          <Form.Control
            type="date"
            name="startReadDate"
            value={statusFormData.startReadDate}
            onChange={handleStatusInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>종료일 </Form.Label>
          <Form.Control
            type="date"
            name="lastReadDate"
            value={statusFormData.lastReadDate}
            onChange={handleStatusInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          등록하기
        </Button>
      </Form>
    </div>
  );

  /***
   * 독후감 작성 홈페이지
   */
  const ReviewForm = () => (
    <div className="form-container" style={{ textAlign: "center" }}>
      <Form className="register-form" onSubmit={handleSubmit}>
        <h2>독후감 작성</h2>
        <Form.Group className="mb-4">
          <Form.Label>책 제목 </Form.Label>
          <Form.Control
            type="String"
            placeholder="책 제목을 입력하세요"
            name="title"
            value={reviewFormData.title}
            onChange={handleReviewInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>저자 </Form.Label>
          <Form.Control
            type="String"
            placeholder="저자를 입력하세요"
            name="author"
            value={reviewFormData.author}
            onChange={handleReviewInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-4" style={{ marginBottom: "0.5rem" }}>
          <Form.Label>평점 </Form.Label>
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
        lastReadDate
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
                    backgroundColor:
                      hoveredDropdownItem === "status"
                        ? "rgba(0,0,128,0.08)"
                        : "transparent",
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
                    backgroundColor:
                      hoveredDropdownItem === "review"
                        ? "rgba(0,0,128,0.08)"
                        : "transparent",
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
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
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
