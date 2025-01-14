import axios from "axios";

/**
 * 기본 정보를 instance화 해서 재사용합니다.
 */
const baseUrl = `http://ec2-43-201-67-150.ap-northeast-2.compute.amazonaws.com:3000`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  timeoutErrorMessage:
    "요청 시간이 60초 이상 초과되었습니다. 다시 시도해주세요.",
  headers: {
    "Content-Type": "application/json",
  },
});

export const postSignup = async ({ email, password, nickname }) => {
  try {
    const response = await axiosInstance.post(`/auth/signup`, {
      email,
      password,
      nickname,
    });
    return response.data; // 회원가입 성공 시 응답 데이터 반환
  } catch (e) {
    console.error("회원가입 에러:", e.response?.data || e.message);

    // 서버에서 반환한 오류 메시지가 있는 경우 이를 반환
    const errorMessage =
      e.response?.data?.message || "서버 오류가 발생했습니다.";
    return {
      status: e.response?.status || 500,
      data: { message: errorMessage },
    };
  }
};

/**
 * 로그인 함수
 * @param {Object} param0 - 로그인 정보 (email, password)
 */
export const postLogin = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    return response.data; // 로그인 성공 시 응답 데이터 반환
  } catch (e) {
    console.error("로그인 에러:", e.response?.data || e.message);
    return (
      e.response || {
        status: 500,
        data: { message: "서버 오류가 발생했습니다." },
      }
    );
  }
};
