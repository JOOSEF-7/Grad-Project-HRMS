/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

import {
  loginUser,
  checkEmailStatus,
} from "../../../store/slices/auth/loginSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import icon from "../../../assets/icons/Icon.svg";
import loginSide from "../../../assets/loginImg/loginSide.avif";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setPassError("");
      setEmailError("");

      dispatch(loginUser(values)).then((res) => {
        if (!res.error) {
          setIsRedirecting(true);
          setTimeout(() => navigate("/dashboard"), 2000);
        } else {
          const errorMsg = res.payload?.message || "Login failed";

          if (errorMsg.toLowerCase().includes("password")) {
            setPassError(errorMsg);
          } else {
            setEmailError(errorMsg);
          }
        }
      });
    },
  });

  const handleEmailChange = (e) => {
    formik.handleChange(e);
    setEmailError("");
    setIsEmailValid(false);
  };

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    setPassError("");
  };

  useEffect(() => {
    const emailValue = formik.values.email;
    if (!emailValue || formik.errors.email) {
      setEmailError("");
      setIsEmailValid(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      // 💡 بننادي السلايس دلوقتي بدل أكسيوس مباشرة
      dispatch(checkEmailStatus(emailValue)).then((res) => {
        if (!res.error) {
          setEmailError("");
          setIsEmailValid(true);
        } else {
          setEmailError(res.payload || "Email not found");
          setIsEmailValid(false);
        }
      });
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [formik.values.email, dispatch]);
  return (
    <>
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#0b141a] flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
            />
            <h2 className="text-white text-xl font-bold tracking-widest uppercase">
              Preparing Dashboard...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex bg-[#0f172a] text-white font-sans overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 overflow-y-auto"
        >
          <div className="w-full max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <div className="bg-blue-600/10 w-16 h-16 rounded-full flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <img src={icon} alt="Staffly Logo" className="w-10 h-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl font-bold mb-2 tracking-tight">
                Welcome back!
              </h1>
              <p className="text-gray-400 text-sm">
                Log in now and save time on employee administration.
              </p>
            </motion.div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 ml-1">
                  Email
                </label>
                <input
                  name="email"
                  placeholder="Your email"
                  type="email"
                  className={`w-full bg-[#1e293b] p-3.5 rounded-xl border outline-none transition-all ${
                    emailError
                      ? "border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.05)]"
                      : "border-transparent focus:border-blue-500"
                  }`}
                  {...formik.getFieldProps("email")}
                  onChange={handleEmailChange}
                />
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-red-400 text-[11px] mt-1.5 ml-1 italic font-medium"
                    >
                      <i className="fas fa-exclamation-circle mr-1"></i>{" "}
                      {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* حقل الباسورد */}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full bg-[#1e293b] p-3.5 rounded-xl border outline-none transition-all ${
                      passError
                        ? "border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.05)]"
                        : "border-transparent focus:border-blue-500"
                    }`}
                    {...formik.getFieldProps("password")}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <i
                      className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
                <AnimatePresence>
                  {passError && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-red-400 text-[11px] mt-1.5 ml-1 italic font-medium"
                    >
                      <i className="fas fa-exclamation-circle mr-1"></i>{" "}
                      {passError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Forgot{" "}
                  <span className="text-blue-500 font-bold">password?</span>
                </Link>
              </div>

              {/* زر تسجيل الدخول الذكي */}
              <motion.button
                whileHover={
                  isEmailValid && formik.values.password && !passError
                    ? { scale: 1.01 }
                    : {}
                }
                whileTap={
                  isEmailValid && formik.values.password && !passError
                    ? { scale: 0.99 }
                    : {}
                }
                type="submit"
                // الزرار يتعطل لو فيه خطأ في الإيميل أو الباسورد أو لو لسه بيحمل
                disabled={
                  loading ||
                  !isEmailValid ||
                  !formik.values.password ||
                  !!passError ||
                  !!emailError
                }
                className={`w-full p-4 rounded-xl font-bold transition-all flex justify-center items-center h-12 shadow-lg ${
                  isEmailValid &&
                  formik.values.password &&
                  !passError &&
                  !emailError &&
                  !loading
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 cursor-pointer"
                    : "bg-[#2d3a4f] text-gray-500 cursor-not-allowed shadow-none"
                }`}
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-10 text-xs text-gray-500"
            >
              Start Your{" "}
              <span className="text-blue-500 font-bold">
                Dashboard Management
              </span>{" "}
              Time Now !!
            </motion.p>
          </div>
        </motion.div>

        {/* الجانب الأيمن - الصورة الثابتة */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex w-1/2 p-4"
        >
          <div
            className="w-full h-full rounded-[2.5rem] bg-cover bg-center flex flex-col justify-end p-12 relative overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, #000000dd), url(${loginSide})`,
            }}
          >
            <h2 className="text-4xl font-bold mb-4 z-10 leading-tight">
              It's time to make employee management easier and faster
            </h2>
            <p className="text-gray-300 z-10 max-w-sm mb-6 font-light">
              Manage attendance, leave, employee data, and payroll all in one
              simple and reliable app.
            </p>

            {/* مؤشر الحالة (Dots) */}
            <div className="flex gap-1.5 z-10">
              <motion.div
                animate={{ width: [8, 24, 8] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              ></motion.div>
              <div className="h-1.5 w-2 bg-gray-700 rounded-full"></div>
              <div className="h-1.5 w-2 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
