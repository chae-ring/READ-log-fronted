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

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

/**
 * 독후감 작성 함수
 * @param {Object} param0 - 리뷰 정보 (title, content, rating)
 */
export const postReview = async ({ title, content, rating }) => {
  try {
    const response = await axiosInstance.post(`/reviews`, {
      title,
      content,
      rating,
    });
    return response.data;
  } catch (e) {
    console.error("리뷰 작성 에러:", e.response?.data || e.message);
    return (
      e.response || {
        status: 500,
        data: { message: "서버 오류가 발생했습니다." },
      }
    );
  }
};

/**
 * 독후감 수정 함수
 * @param {Object} param0 - 리뷰 정보 (id, title, content, rating)
 */
export const updateReview = async ({ id, title, content, rating }) => {
  try {
    const response = await axiosInstance.patch(`/reviews/${id}`, {
      title,
      content,
      rating,
    });
    return response.data;
  } catch (e) {
    console.error("리뷰 수정 에러:", e.response?.data || e.message);
    return (
      e.response || {
        status: 500,
        data: { message: "서버 오류가 발생했습니다." },
      }
    );
  }
};

/**
 * 독후감 삭제 함수
 * @param {number} id - 삭제할 리뷰 ID
 */
export const deleteReview = async (id) => {
  try {
    const response = await axiosInstance.delete(`/reviews/${id}`);
    return response.data;
  } catch (e) {
    console.error("리뷰 삭제 에러:", e.response?.data || e.message);
    return (
      e.response || {
        status: 500,
        data: { message: "서버 오류가 발생했습니다." },
      }
    );
  }
};

/**
 * 독서 등록 함수
 * @param {Object} param0 - 리뷰 정보 (id, title, content, rating)
 */
export const postStatus = async ({
  name,
  writer,
  status,
  genre,
  startReadDate,
  lastReadDate,
  currentPage,
  totalPage,
}) => {
  try {
    const response = await axiosInstance.post(`/readings`, {
      name,
      writer,
      status,
      genre,
      startReadDate,
      lastReadDate,
      currentPage,
      totalPage,
    });
    return response.data;
  } catch (e) {
    console.error("독서 현황 등록 에러:", e.response?.data || e.message);
    return (
      e.response || {
        status: 500,
        data: { message: "서버 오류가 발생했습니다." },
      }
    );
  }
};
export const getUserInfo = async (token) => {
  try {
    const response = await axiosInstance.get(`/users/nickname`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", response);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw new Error("사용자 정보 조회에 실패했습니다.");
  }
};
export const getFinishedBooks = async (token) => {
  try {
    const response = await axiosInstance.get(`/mypage/finished-books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", response);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw new Error("사용자 정보 조회에 실패했습니다.");
  }
};
export const getYearlyData = async (token) => {
  try {
    const response = await axiosInstance.get(`/reviews/yearly`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", response);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw new Error("사용자 정보 조회에 실패했습니다.");
  }
};
export const getMonthlyData = async (token) => {
  try {
    const response = await axiosInstance.get(`/reviews/monthly`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw new Error("사용자 정보 조회에 실패했습니다.");
  }
};
export const getCategoryData = async (token) => {
  try {
    const response = await axiosInstance.get(`/reviews/genre`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw new Error("사용자 정보 조회에 실패했습니다.");
  }
};
export const getStatusData = async (token) => {
  try {
    const response = await axiosInstance.get(`/reviews/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("서버 응답:", response);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw new Error("사용자 정보 조회에 실패했습니다.");
  }
};
