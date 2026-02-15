/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import {
  checkEmailExist,
  requestResetCode,
  resetForgotState,
} from "../../../store/slices/auth/forgotPasswordSlice";

import icon from "../../../assets/icons/Icon.svg";
import loginSide from "../../../assets/loginImg/loginSide.avif";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isEmailValid, loading, error } = useSelector(
    (state) => state.forgotPassword,
  );

  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    dispatch(resetForgotState());
  }, [dispatch]);

  useEffect(() => {
    if (!email) {
      dispatch(resetForgotState());
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    const delayDebounceFn = setTimeout(() => {
      dispatch(checkEmailExist(email)).finally(() => {
        setIsChecking(false);
      });
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [email, dispatch]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!isEmailValid) return;

    dispatch(requestResetCode(email)).then((res) => {
      if (!res.error) {
        navigate("/verify", { state: { email } });
      }
    });
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white font-sans overflow-hidden">
      {/*  الفورم */}
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
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="flex items-center gap-2 mb-16"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center">
              <img src={icon} alt="Staffly Logo" className="" />
            </div>
            <span className="text-xl font-bold tracking-tight italic">
              Staf<span className="text-blue-500 cursor-pointer">fly</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/login"
              className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-6 transition-all group w-fit"
            >
              <i className="fas fa-chevron-left text-xs group-hover:-translate-x-1 transition-transform"></i>
              Back to login
            </Link>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-semibold mb-2"
          >
            Forgot password
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-sm mb-8 leading-relaxed"
          >
            Enter your email to receive a password reset link. Only HR accounts
            can proceed.
          </motion.p>

          <form onSubmit={handleSendCode} className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="robert@gmail.com"
                className={`w-full bg-[#1e293b] p-3.5 pr-10 rounded-xl border outline-none transition-all duration-300 ${
                  error
                    ? "border-red-500/50 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.05)]"
                    : "border-transparent focus:border-blue-500"
                }`}
              />

              {/* Spinner التحقق من الإيميل */}
              <AnimatePresence>
                {isChecking && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute right-4 bottom-4 text-blue-500"
                  >
                    <i className="fas fa-circle-notch animate-spin"></i>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex items-center gap-2 text-red-400 text-[11px] mt-2 italic overflow-hidden"
                  >
                    <i className="fas fa-exclamation-circle"></i>
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={isEmailValid && !loading ? { scale: 1.01 } : {}}
              whileTap={isEmailValid && !loading ? { scale: 0.99 } : {}}
              type="submit"
              disabled={!isEmailValid || loading}
              className={`w-full p-4 rounded-xl font-bold transition-all flex justify-center items-center h-12 shadow-lg ${
                isEmailValid && !loading
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 cursor-pointer"
                  : "bg-gray-700 cursor-not-allowed text-gray-500 shadow-none"
              }`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Submit"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* الجانب الأيمن - الصورة */}
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
            className="text-gray-300 z-10 max-w-sm mb-6 font-light"
          >
            Manage attendance, leave, employee data, and payroll all in one
            simple and reliable app.
          </motion.p>

          <div className="flex items-center gap-3 z-10 border-t border-gray-700/50 pt-6">
            <div className="flex gap-1.5">
              <div className="h-1.5 w-2 bg-gray-700 rounded-full"></div>
              <motion.div
                animate={{ width: [8, 24, 8] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              ></motion.div>
              <div className="h-1.5 w-2 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
