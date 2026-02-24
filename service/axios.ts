import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(config => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const originalRequest = error.config;

//       if (!originalRequest?.url?.includes("/auth/login")) {
//         console.warn("Token expirado, limpando usuário...");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         if (typeof window !== "undefined") {
//           window.location.href = "/";
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );


export default api;
