import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../services/axios";

import icon from "../../../assets/icons/Icon.svg";
import loginSide from "../../../assets/loginImg/loginSide.avif";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!email) {
      setError("");
      setIsValid(false);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    setError("");

    const delayDebounceFn = setTimeout(async () => {
      try {
        await axios.post("/auth/check-email", { email });
        setError("");
        setIsValid(true);
      } catch (err) {
        setError(err.response?.data?.message || "Invalid email address");
        setIsValid(false);
      } finally {
        setIsChecking(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [email]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      await axios.post("/auth/forgot-password", { email });
      navigate("/verify", { state: { email } });
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white font-sans overflow-hidden">
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
              <motion.i
                whileHover={{ x: -4 }}
                className="fas fa-chevron-left text-xs"
              ></motion.i>
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
                className={`w-full bg-[#1e293b] p-3 pr-10 rounded-lg border outline-none transition-all duration-300 ${
                  error
                    ? "border-red-500 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                    : "border-transparent focus:border-blue-500"
                }`}
              />

              <AnimatePresence>
                {isChecking && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute right-3 bottom-3 text-blue-500"
                  >
                    <motion.i
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="fas fa-circle-notch"
                    ></motion.i>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-500 text-[11px] mt-2 italic overflow-hidden"
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
              whileHover={isValid && !loading ? { scale: 1.02 } : {}}
              whileTap={isValid && !loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={!isValid || loading}
              className={`w-full p-3 rounded-lg font-bold transition-all flex justify-center items-center h-12 shadow-lg ${
                isValid && !loading
                  ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20 text-white"
                  : "bg-gray-700 cursor-not-allowed text-gray-500 shadow-none"
              }`}
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                ></motion.span>
              ) : (
                "Submit"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

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
            className="text-gray-300 z-10 max-w-sm mb-6"
          >
            Manage attendance, leave, employee data, and payroll all in one
            simple and reliable app.
          </motion.p>

          <div className="flex items-center gap-3 z-10 border-t border-gray-700/50 pt-6">
            <div className="flex gap-1">
              <div className="h-1 w-2 bg-gray-600 rounded-full"></div>
              <motion.div
                animate={{ width: [8, 24, 8] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              ></motion.div>
              <div className="h-1 w-2 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
