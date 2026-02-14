/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/slices/loginAuth/loginAuthSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../services/axios";

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
      dispatch(loginUser(values)).then((res) => {
        if (!res.error) {
          setIsRedirecting(true);
          setTimeout(() => navigate("/dashboard"), 2000);
        } else {
          if (res.payload?.message?.toLowerCase().includes("password")) {
            setPassError(res.payload.message);
          } else {
            setEmailError(res.payload?.message || "Login failed");
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

    const delayDebounceFn = setTimeout(async () => {
      try {
        await axios.post("/auth/check-email", { email: emailValue });
        setEmailError("");
        setIsEmailValid(true);
      } catch (err) {
        setEmailError(err.response?.data?.message || "Email not found");
        setIsEmailValid(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formik.values.email, formik.errors.email]);

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
              <div className="bg-blue-600/10 w-14 h-14 rounded-full flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <div className="w-13.5 h-13.5 ml-[0.5px] mt-[0.5px] bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <img
                    src={icon}
                    alt="Staffly Logo"
                    className="ml-[2px] mb-[2.75px] w-13 h-13"
                  />
                </div>
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
                      ? "border-red-500/50"
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
                      {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

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
                        ? "border-red-500/50"
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
                      {passError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  Forgot
                  <span className="text-blue-500 cursor-pointer hover:text-white">
                    {" "}
                    password?{" "}
                  </span>
                </Link>
              </div>

              <motion.button
                whileHover={
                  isEmailValid && formik.values.password ? { scale: 1.01 } : {}
                }
                whileTap={
                  isEmailValid && formik.values.password ? { scale: 0.99 } : {}
                }
                type="submit"
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
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                    : "bg-[#2d3a4f] text-gray-500 cursor-not-allowed"
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

            <div className="mt-10 relative flex items-center justify-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-10 text-xs text-gray-500"
            >
              Start Your{" "}
              <span className="text-blue-500 cursor-pointer">
                Dashboard Management
              </span>{" "}
              Time Now !!
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex w-1/2 p-4"
        >
          <div
            className="w-full h-full rounded-[2rem] bg-cover bg-center flex flex-col justify-end p-12 relative overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, #000000dd), url(${loginSide})`,
            }}
          >
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl font-bold mb-4 z-10 leading-tight"
            >
              It's time to make employee management easier and faster
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 z-10 max-w-sm mb-6"
            >
              Manage attendance, leave, employee data, and payroll all in one
              simple and reliable app.
            </motion.p>

            <div className="flex items-center gap-3 z-10 border-t border-gray-700/50 pt-6">
              {/* <div className="flex -space-x-3">
                
              </div> */}
              <div className="flex gap-1">
                <motion.div
                  animate={{ width: [8, 24, 8] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-1 w-2 bg-gray-600 rounded-full"
                >
                  <div className="h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                </motion.div>
                <div className="h-1 w-2 bg-gray-600 rounded-full"></div>
                <div className="h-1 w-2 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
