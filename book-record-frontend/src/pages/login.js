import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log("Login attempt with:", formData);
  };

  const handleRegister = () => {
    navigate("/join");
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
          <button
            className="nav-btn"
            onClick={() => navigate("/recommendation")}
          >
            추천
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
          <button className="nav-btn" onClick={() => navigate("/mypage")}>
            내 서재
          </button>
          <button className="nav-btn">로그인</button>
        </div>
      </nav>

      <Container
        style={{
          height: "calc(100vh - 60px)", // navbar 높이를 뺀 전체 높이
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="login-container"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4">로그인</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" className="mb-3">
                로그인
              </Button>
              <Button variant="outline-primary" onClick={handleRegister}>
                회원가입
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
