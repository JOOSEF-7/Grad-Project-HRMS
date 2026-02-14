// // import React, { useState, useEffect, useRef } from "react";
// // import { useLocation, useNavigate, Link } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import axios from "../../../services/axios";
// // import { motion, AnimatePresence } from "framer-motion";

// // import icon from "../../../assets/icons/Icon.svg";
// // import loginSide from "../../../assets/loginImg/loginSide.avif";

// // const VerifyCode = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const email = location.state?.email;

// //   const [code, setCode] = useState(["", "", "", "", "", ""]);
// //   const [isError, setIsError] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [timer, setTimer] = useState(32);
// //   const [isRedirecting, setIsRedirecting] = useState(false);

// //   const inputRefs = useRef([]);


// //   useEffect(() => {
// //     if (!email) {
// //       navigate("/forgot-password");
// //     }
// //   }, [email, navigate]);

// //   useEffect(() => {
// //     let interval;
// //     if (timer > 0) {
// //       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
// //     }
// //     return () => clearInterval(interval);
// //   }, [timer]);

// //   const handleChange = (value, index) => {
// //     if (isNaN(value)) return;
// //     const newCode = [...code];
// //     newCode[index] = value.substring(value.length - 1);
// //     setCode(newCode);
// //     setIsError(false);

// //     if (value && index < 5) {
// //       inputRefs.current[index + 1].focus();
// //     }
// //   };

// //   const handleKeyDown = (e, index) => {
// //     if (e.key === "Backspace" && !code[index] && index > 0) {
// //       inputRefs.current[index - 1].focus();
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const fullCode = code.join("");
// //     if (fullCode.length < 6) return;

// //     setLoading(true);
// //     try {
// //       const res = await axios.post("/auth/verify-code", {
// //         email,
// //         code: fullCode,
// //       });

// //       localStorage.setItem("token", res.data.token);
// //       localStorage.setItem("user", JSON.stringify(res.data.user));

// //       dispatch({
// //         type: "auth/loginUser/fulfilled",
// //         payload: {
// //           user: res.data.user,
// //           token: res.data.token,
// //         },
// //       });

// //       setIsRedirecting(true);
// //       setTimeout(() => {
// //         navigate("/dashboard");
// //       }, 2000);
// //     } catch (err) {
// //       setIsError(true);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleResend = async () => {
// //     if (timer > 0) return;
// //     try {
// //       await axios.post("/auth/forgot-password", { email });
// //       setTimer(60);
// //     } catch (err) {
// //       alert("Error resending code.");
// //     }
// //   };

// //   return (
// //     <>
// //       <AnimatePresence>
// //         {isRedirecting && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 z-[999] bg-[#0b141a] flex flex-col items-center justify-center"
// //           >
// //             <motion.div
// //               animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
// //               transition={{ repeat: Infinity, duration: 2 }}
// //               className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
// //             />
// //             <h2 className="text-white text-xl font-bold tracking-widest uppercase">
// //               Preparing Dashboard...
// //             </h2>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <div className="min-h-screen flex bg-[#0f172a] text-white font-sans overflow-hidden">
// //         <motion.div
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.8 }}
// //           className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 overflow-y-auto"
// //         >
// //           <div className="w-full max-w-md">
// //             <motion.div
// //               initial={{ scale: 0 }}
// //               animate={{ scale: 1 }}
// //               transition={{ type: "spring", delay: 0.2 }}
// //               className="flex items-center gap-2 mb-20"
// //             >
// //               <div className="w-14 h-14 rounded-full flex items-center justify-center">
// //                 <img src={icon} alt="Staffly Logo" className="" />
// //               </div>
// //               <span className="text-xl font-bold tracking-tight italic">
// //                 Staf<span className="text-blue-500 cursor-pointer">fly</span>
// //               </span>
// //             </motion.div>

// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.4 }}
// //             >
// //               <Link
// //                 to="/forgot-password"
// //                 className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-6 group transition-all w-fit"
// //               >
// //                 <i className="fas fa-chevron-left text-xs group-hover:-translate-x-1 transition-transform"></i>
// //                 Back to previous
// //               </Link>
// //             </motion.div>

// //             <motion.h1
// //               initial={{ y: 20, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               transition={{ delay: 0.5 }}
// //               className="text-3xl font-semibold mb-2"
// //             >
// //               Verify Code
// //             </motion.h1>

// //             <motion.p
// //               initial={{ y: 20, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               transition={{ delay: 0.6 }}
// //               className="text-gray-400 text-sm mb-8"
// //             >
// //               Enter the 6-digit code sent to{" "}
// //               <span className="text-blue-400">({email})</span>
// //             </motion.p>

// //             <form onSubmit={handleSubmit} className="space-y-8">
// //               <div className="flex justify-between gap-2">
// //                 {code.map((num, idx) => (
// //                   <motion.input
// //                     key={idx}
// //                     initial={{ scale: 0.8, opacity: 0 }}
// //                     animate={{ scale: 1, opacity: 1 }}
// //                     transition={{ delay: 0.7 + idx * 0.05 }}
// //                     ref={(el) => (inputRefs.current[idx] = el)}
// //                     type="text"
// //                     maxLength="1"
// //                     value={num}
// //                     onChange={(e) => handleChange(e.target.value, idx)}
// //                     onKeyDown={(e) => handleKeyDown(e, idx)}
// //                     className={`w-12 h-14 bg-[#1e293b] text-center text-xl font-bold rounded-lg border outline-none transition-all ${
// //                       isError
// //                         ? "border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
// //                         : "border-gray-700 focus:border-blue-500 text-white"
// //                     }`}
// //                   />
// //                 ))}
// //               </div>

// //               <AnimatePresence>
// //                 {isError && (
// //                   <motion.div
// //                     initial={{ height: 0, opacity: 0 }}
// //                     animate={{ height: "auto", opacity: 1 }}
// //                     exit={{ height: 0, opacity: 0 }}
// //                     className="flex items-center gap-2 text-red-500 text-[11px] -mt-4 italic overflow-hidden"
// //                   >
// //                     <i className="fas fa-exclamation-circle animate-pulse"></i>
// //                     <span>Invalid verification code.</span>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>

// //               <motion.div
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ delay: 1 }}
// //                 className="flex justify-between items-center text-xs"
// //               >
// //                 <span className="text-gray-500 italic">
// //                   {timer > 0 ? `Resend code in ${timer}s` : "Ready to resend"}
// //                 </span>
// //                 <button
// //                   type="button"
// //                   onClick={handleResend}
// //                   disabled={timer > 0}
// //                   className={`underline transition ${
// //                     timer > 0
// //                       ? "text-gray-700 cursor-not-allowed"
// //                       : "text-gray-400 hover:text-white"
// //                   }`}
// //                 >
// //                   Resend now
// //                 </button>
// //               </motion.div>

// //               <motion.button
// //                 whileHover={
// //                   code.join("").length === 6 && !loading ? { scale: 1.02 } : {}
// //                 }
// //                 whileTap={
// //                   code.join("").length === 6 && !loading ? { scale: 0.98 } : {}
// //                 }
// //                 type="submit"
// //                 disabled={code.join("").length < 6 || loading}
// //                 className={`w-full p-3 rounded-lg font-bold transition-all h-12 flex justify-center items-center shadow-lg ${
// //                   code.join("").length === 6 && !loading
// //                     ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20 text-white"
// //                     : "bg-gray-700 cursor-not-allowed text-gray-500 shadow-none"
// //                 }`}
// //               >
// //                 {loading ? (
// //                   <motion.span
// //                     animate={{ rotate: 360 }}
// //                     transition={{
// //                       repeat: Infinity,
// //                       duration: 1,
// //                       ease: "linear",
// //                     }}
// //                     className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
// //                   />
// //                 ) : (
// //                   "Submit"
// //                 )}
// //               </motion.button>
// //             </form>

// //             <motion.p
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 1.2 }}
// //               className="text-center mt-8 text-xs text-gray-400"
// //             >
// //               Back to{" "}
// //               <span
// //                 className="text-blue-500 cursor-pointer hover:underline"
// //                 onClick={() => navigate("/login")}
// //               >
// //                 Login
// //               </span>{" "}
// //               Page
// //             </motion.p>
// //           </div>
// //         </motion.div>

// //         <motion.div
// //           initial={{ opacity: 0, x: 50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.8 }}
// //           className="hidden lg:flex w-1/2 p-4"
// //         >
// //           <div
// //             className="w-full h-full rounded-[2.5rem] bg-cover bg-center flex flex-col justify-end p-12 relative overflow-hidden shadow-2xl"
// //             style={{
// //               backgroundImage: `linear-gradient(to bottom, transparent, #000000dd), url(${loginSide})`,
// //             }}
// //           >
// //             <motion.h2
// //               initial={{ y: 30, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               transition={{ delay: 0.6 }}
// //               className="text-4xl font-bold mb-4 z-10 leading-tight"
// //             >
// //               It's time to make employee management easier and faster
// //             </motion.h2>
// //             <motion.p
// //               initial={{ y: 20, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               transition={{ delay: 0.8 }}
// //               className="text-gray-300 z-10 max-w-sm mb-6"
// //             >
// //               Manage attendance, leave, employee data, and payroll all in one
// //               simple and reliable app.
// //             </motion.p>

// //             <div className="flex items-center gap-3 z-10 border-t border-gray-700/50 pt-6">

// //               <div className="flex gap-1">
// //                 <div className="h-1 w-2 bg-gray-600 rounded-full"></div>
// //                 <div className="h-1 w-2 bg-gray-600 rounded-full"></div>
// //                 <motion.div
// //                   animate={{ width: [8, 24, 8] }}
// //                   transition={{ repeat: Infinity, duration: 2 }}
// //                   className="h-1 w-2 bg-gray-600 rounded-full"
// //                 >
// //                   <div className="h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
// //                 </motion.div>
// //               </div>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </>
// //   );
// // };

// // export default VerifyCode;



// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "../../../services/axios";
// import { motion, AnimatePresence } from "framer-motion";

// import icon from "../../../assets/icons/Icon.svg";
// import loginSide from "../../../assets/loginImg/loginSide.avif";

// const VerifyCode = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const email = location.state?.email;

//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const [isError, setIsError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(32);
//   const [isRedirecting, setIsRedirecting] = useState(false);

//   const inputRefs = useRef([]);

//   useEffect(() => {
//     if (!email) {
//       navigate("/forgot-password");
//     }
//   }, [email, navigate]);

//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleChange = (value, index) => {
//     if (isNaN(value)) return;
//     const newCode = [...code];
//     newCode[index] = value.substring(value.length - 1);
//     setCode(newCode);
//     setIsError(false);

//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   // ✅ الكود المصلح
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fullCode = code.join("");
//     if (fullCode.length < 6) return;

//     setLoading(true);
//     try {
//       const res = await axios.post("/auth/verify-code", {
//         email,
//         code: fullCode,
//       });

//       // ✅ حفظ البيانات في localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // ✅ تحديث Redux بالطريقة الصحيحة
//       dispatch({
//         type: "auth/loginUser/fulfilled",
//         payload: res.data, // ✅ إرسال كل الـ response
//       });

//       // ✅ عرض شاشة التحميل
//       setIsRedirecting(true);
      
//       // ✅ التحويل للداشبورد بعد ثانيتين
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);

//     } catch (err) {
//       console.error("Verification error:", err);
//       setIsError(true);
//       setCode(["", "", "", "", "", ""]); // ✅ مسح الكود عند الخطأ
//       if (inputRefs.current[0]) {
//         inputRefs.current[0].focus(); // ✅ التركيز على الخانة الأولى
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (timer > 0) return;
//     try {
//       await axios.post("/auth/forgot-password", { email });
//       setTimer(60);
//       // ✅ إضافة رسالة نجاح
//       alert("Verification code sent successfully!");
//     } catch (err) {
//       console.error("Resend error:", err);
//       alert("Error resending code. Please try again.");
//     }
//   };

//   return (
//     <>
//       {/* شاشة التحميل */}
//       <AnimatePresence>
//         {isRedirecting && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[999] bg-[#0b141a] flex flex-col items-center justify-center"
//           >
//             <motion.div
//               animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//               className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
//             />
//             <h2 className="text-white text-xl font-bold tracking-widest uppercase">
//               Preparing Dashboard...
//             </h2>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="min-h-screen flex bg-[#0f172a] text-white font-sans overflow-hidden">
//         {/* الجانب الأيسر - الفورم */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 overflow-y-auto"
//         >
//           <div className="w-full max-w-md">
//             {/* Logo */}
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", delay: 0.2 }}
//               className="flex items-center gap-2 mb-20"
//             >
//               <div className="w-14 h-14 rounded-full flex items-center justify-center">
//                 <img src={icon} alt="Staffly Logo" />
//               </div>
//               <span className="text-xl font-bold tracking-tight italic">
//                 Staf<span className="text-blue-500 cursor-pointer">fly</span>
//               </span>
//             </motion.div>

//             {/* Back Button */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               <Link
//                 to="/forgot-password"
//                 className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-6 group transition-all w-fit"
//               >
//                 <i className="fas fa-chevron-left text-xs group-hover:-translate-x-1 transition-transform"></i>
//                 Back to previous
//               </Link>
//             </motion.div>

//             {/* Title */}
//             <motion.h1
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="text-3xl font-semibold mb-2"
//             >
//               Verify Code
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="text-gray-400 text-sm mb-8"
//             >
//               Enter the 6-digit code sent to{" "}
//               <span className="text-blue-400">({email})</span>
//             </motion.p>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Code Inputs */}
//               <div className="flex justify-between gap-2">
//                 {code.map((num, idx) => (
//                   <motion.input
//                     key={idx}
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ delay: 0.7 + idx * 0.05 }}
//                     ref={(el) => (inputRefs.current[idx] = el)}
//                     type="text"
//                     inputMode="numeric"
//                     maxLength="1"
//                     value={num}
//                     onChange={(e) => handleChange(e.target.value, idx)}
//                     onKeyDown={(e) => handleKeyDown(e, idx)}
//                     className={`w-12 h-14 bg-[#1e293b] text-center text-xl font-bold rounded-lg border outline-none transition-all ${
//                       isError
//                         ? "border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
//                         : "border-gray-700 focus:border-blue-500 text-white"
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Error Message */}
//               <AnimatePresence>
//                 {isError && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     className="flex items-center gap-2 text-red-500 text-[11px] -mt-4 italic overflow-hidden"
//                   >
//                     <i className="fas fa-exclamation-circle animate-pulse"></i>
//                     <span>Invalid verification code. Please try again.</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Timer & Resend */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1 }}
//                 className="flex justify-between items-center text-xs"
//               >
//                 <span className="text-gray-500 italic">
//                   {timer > 0 ? `Resend code in ${timer}s` : "Ready to resend"}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={handleResend}
//                   disabled={timer > 0}
//                   className={`underline transition ${
//                     timer > 0
//                       ? "text-gray-700 cursor-not-allowed"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   Resend now
//                 </button>
//               </motion.div>

//               {/* Submit Button */}
//               <motion.button
//                 whileHover={
//                   code.join("").length === 6 && !loading ? { scale: 1.02 } : {}
//                 }
//                 whileTap={
//                   code.join("").length === 6 && !loading ? { scale: 0.98 } : {}
//                 }
//                 type="submit"
//                 disabled={code.join("").length < 6 || loading}
//                 className={`w-full p-3 rounded-lg font-bold transition-all h-12 flex justify-center items-center shadow-lg ${
//                   code.join("").length === 6 && !loading
//                     ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20 text-white"
//                     : "bg-gray-700 cursor-not-allowed text-gray-500 shadow-none"
//                 }`}
//               >
//                 {loading ? (
//                   <motion.span
//                     animate={{ rotate: 360 }}
//                     transition={{
//                       repeat: Infinity,
//                       duration: 1,
//                       ease: "linear",
//                     }}
//                     className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
//                   />
//                 ) : (
//                   "Submit"
//                 )}
//               </motion.button>
//             </form>

//             {/* Back to Login */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.2 }}
//               className="text-center mt-8 text-xs text-gray-400"
//             >
//               Back to{" "}
//               <span
//                 className="text-blue-500 cursor-pointer hover:underline"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </span>{" "}
//               Page
//             </motion.p>
//           </div>
//         </motion.div>

//         {/* الجانب الأيمن - الصورة */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hidden lg:flex w-1/2 p-4"
//         >
//           <div
//             className="w-full h-full rounded-[2.5rem] bg-cover bg-center flex flex-col justify-end p-12 relative overflow-hidden shadow-2xl"
//             style={{
//               backgroundImage: `linear-gradient(to bottom, transparent, #000000dd), url(${loginSide})`,
//             }}
//           >
//             <motion.h2
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="text-4xl font-bold mb-4 z-10 leading-tight"
//             >
//               It's time to make employee management easier and faster
//             </motion.h2>
//             <motion.p
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.8 }}
//               className="text-gray-300 z-10 max-w-sm mb-6"
//             >
//               Manage attendance, leave, employee data, and payroll all in one
//               simple and reliable app.
//             </motion.p>

//             <div className="flex items-center gap-3 z-10 border-t border-gray-700/50 pt-6">
//               <div className="flex gap-1">
//                 <div className="h-1 w-2 bg-gray-600 rounded-full"></div>
//                 <div className="h-1 w-2 bg-gray-600 rounded-full"></div>
//                 <motion.div
//                   animate={{ width: [8, 24, 8] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                   className="h-1 w-2 bg-gray-600 rounded-full"
//                 >
//                   <div className="h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default VerifyCode;



import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../../services/axios";
import { motion, AnimatePresence } from "framer-motion";

import icon from "../../../assets/icons/Icon.svg";
import loginSide from "../../../assets/loginImg/loginSide.avif";

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email;

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(32);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    setIsError(false);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < 6) return;

    setLoading(true);
    try {
      const res = await axios.post("/auth/verify-code", {
        email,
        code: fullCode,
      });

      // 1. حفظ البيانات في المتصفح لضمان استمرار الجلسة
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 2. تحديث الريدوكس بالنوع الصحيح ليتم تفعيل حالة تسجيل الدخول
      // تم تعديل النوع إلى "auth/login/fulfilled" ليتطابق مع الـ Thunk
      dispatch({
        type: "auth/login/fulfilled", 
        payload: res.data,
      });

      // 3. عرض شاشة الانتقال
      setIsRedirecting(true);
      
      // 4. التحويل للداشبورد
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      // console.error("Verification error:", err);
      setIsError(true);
      setCode(["", "", "", "", "", ""]); 
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      await axios.post("/auth/forgot-password", { email });
      setTimer(60);
    } catch (err) {
      // console.error("Resend error:", err);
    }
  };

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
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
            />
            <h2 className="text-white text-xl font-bold tracking-widest uppercase">
              Preparing Dashboard...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex bg-[#0f172a] text-white font-sans overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 overflow-y-auto"
        >
          <div className="w-full max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex items-center gap-2 mb-20"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center">
                <img src={icon} alt="Staffly Logo" />
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
                to="/forgot-password"
                className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-6 group transition-all w-fit"
              >
                <i className="fas fa-chevron-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                Back to previous
              </Link>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-semibold mb-2"
            >
              Verify Code
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-sm mb-8"
            >
              Enter the 6-digit code sent to{" "}
              <span className="text-blue-400">({email})</span>
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-between gap-2">
                {code.map((num, idx) => (
                  <motion.input
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.05 }}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={num}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`w-12 h-14 bg-[#1e293b] text-center text-xl font-bold rounded-lg border outline-none transition-all ${
                      isError
                        ? "border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                        : "border-gray-700 focus:border-blue-500 text-white"
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence>
                {isError && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex items-center gap-2 text-red-500 text-[11px] -mt-4 italic overflow-hidden"
                  >
                    <i className="fas fa-exclamation-circle animate-pulse"></i>
                    <span>Invalid verification code. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-between items-center text-xs"
              >
                <span className="text-gray-500 italic">
                  {timer > 0 ? `Resend code in ${timer}s` : "Ready to resend"}
                </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className={`underline transition ${
                    timer > 0
                      ? "text-gray-700 cursor-not-allowed"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Resend now
                </button>
              </motion.div>

              <motion.button
                whileHover={
                  code.join("").length === 6 && !loading ? { scale: 1.02 } : {}
                }
                whileTap={
                  code.join("").length === 6 && !loading ? { scale: 0.98 } : {}
                }
                type="submit"
                disabled={code.join("").length < 6 || loading}
                className={`w-full p-3 rounded-lg font-bold transition-all h-12 flex justify-center items-center shadow-lg ${
                  code.join("").length === 6 && !loading
                    ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20 text-white"
                    : "bg-gray-700 cursor-not-allowed text-gray-500 shadow-none"
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
                  "Submit"
                )}
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-8 text-xs text-gray-400"
            >
              Back to{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>{" "}
              Page
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
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
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default VerifyCode;