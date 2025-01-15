import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { postLogin } from "../api/instance"; // 로그인 API 추가

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "", // nickname → email로 변경
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await postLogin({
        email: formData.email,
        password: formData.password,
      });

      console.log("로그인 응답값:", result);

      // 로그인 성공 시
      if (result.accessToken) {
        alert("로그인 성공!");
        localStorage.setItem("accessToken", result.accessToken);

        console.log("로그인 성공, 토큰 저장:", result.accessToken);
        navigate("/");
      } else {
        alert("로그인 실패. 이메일과 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
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
          <button className="nav-btn" onClick={() => navigate("/mypage")}>
            내 서재
          </button>
          <button className="nav-btn active">로그인</button>
        </div>
      </nav>

      <Container
        style={{
          height: "calc(100vh - 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="login-container"
          style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}
        >
          <h2 className="text-center mb-4">로그인</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
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
