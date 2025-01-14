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
      // TODO: API 호출하여 회원가입 처리
      console.log("회원가입 데이터:", formData);

      const result = await postSignup(
        formData.email,
        formData.password,
        formData.nickname
      );

      // api 응답값을 찍어보고, 성공/에러 처리를 하면 됩니다.
      // 지금 저는 제대로된 접근이 어려워 상세한 응답값 확인이 안되는 상태입니다.
      // 백엔드 개발자에 따라 status를 안보내주기도 하기 때문에 확인이 필요해요.
      console.log("회원가입 응답값 확인하여 성공/에러 처리 하세요.");
      console.log(result);

      if (result.status === 201 || result.data?.userId) {
        // 보통은 성공하면 status에 200이나 201이 담겨옵니다.
        // status가 담겨온다면 201로 진행하시면 되고, 뒤에 result.data?.userId삭제하시면 됩니다.
        // status가 없다면, result.data.uerId 값이 있는지 없는지를 확인해서 성공여부를 판단하면 될 것 같아요.

        // 회원가입 성공 시 로그인 페이지로 이동
        navigate("/login");
        return; // 코드 진행 종료
      }

      // 실패한 경우 보통 400~500 번대의 status가 날아옵니다.
      // 백엔드 개발자에 따라 status를 안보내주기도 하기 때문에 확인이 필요해요.
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
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
          <button
            className="nav-btn"
            onClick={() => navigate("/mypage")}
          >
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