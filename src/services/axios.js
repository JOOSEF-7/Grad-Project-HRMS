import axios from "axios";

// إنشاء Axios Instance
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - إضافة التوكن تلقائياً
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor - معالجة الأخطاء
let isRedirecting = false;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // معالجة 401 Unauthorized
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;

      // تنظيف البيانات المحلية
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // التحويل للـ Login
      window.location.href = "/login";

      // إعادة تعيين الـ flag بعد ثانية
      setTimeout(() => {
        isRedirecting = false;
      }, 1000);
    }

    // معالجة أخطاء الشبكة
    if (!error.response) {
      console.error("Network Error:", error.message);
      return Promise.reject({
        message: "Network error. Please check your connection.",
        isNetworkError: true,
      });
    }

    // معالجة أخطاء السيرفر
    if (error.response?.status >= 500) {
      console.error("Server Error:", error.response.status);
      return Promise.reject({
        message: "Server error. Please try again later.",
        isServerError: true,
        status: error.response.status,
      });
    }

    // إرجاع الخطأ الأصلي
    return Promise.reject(error);
  },
);

export default instance;
