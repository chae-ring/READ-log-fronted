import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./join.css";
import { postSignup } from "../api/instance";

const JoinPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    // 사용자 이름 검증
    if (!formData.nickname) {
      newErrors.nickname = "사용자 이름을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // 회원가입 API 호출
        const result = await postSignup({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname,
        });

        console.log("회원가입 응답값:", result);

        // 오류 메시지가 있는 경우 출력
        if (result.data?.message) {
          alert(result.data.message.join(", "));
        }

        // 회원가입 성공 시
        if (result.userId) {
          alert("회원가입 성공!");
          navigate("/login"); // 로그인 페이지로 이동
        } else {
          alert("회원가입 실패. 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error("회원가입 에러:", error);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div
      className="home"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
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
          <button className="nav-btn" onClick={() => navigate("/mypage")}>
            내 서재
          </button>
        </div>

        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate("/register")}>
            등록하기
          </button>
          <button className="nav-btn active">로그인</button>
        </div>
      </nav>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "500px",
          padding: "0 20px",
        }}
      >
        <div className="join-form-container">
          <h2 className="text-center mb-4">회원가입</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>e-mail </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="이메일을 입력하세요"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PW </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                placeholder="비밀번호를 입력하세요"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PW 확인 </Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                placeholder="비밀번호를 다시 입력하세요"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                isInvalid={!!errors.nickname}
                placeholder="사용자 이름을 입력하세요"
              />
              <Form.Control.Feedback type="invalid">
                {errors.nickname}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                회원가입
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
