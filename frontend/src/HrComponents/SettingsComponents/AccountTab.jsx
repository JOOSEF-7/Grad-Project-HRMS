import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateHRProfile } from '../../store/HrSlices/navbar/hrProfileSlice';
// import defaultAvatar from '../../assets/icons/avatar-default-symbolic-svgrepo-com.svg';
import defaultAvatar from "../../assets/avatars/avatar-default-symbolic-svgrepo-com.svg";

const AccountTab = () => {
  const dispatch = useDispatch();
  const { data: hr } = useSelector((state) => state.hrProfile);

  //   const [formData, setFormData] = useState({
  //     firstName: '', lastName: '', email: '', phone: '', currentPass: '', newPass: ''
  //   });

  //   useEffect(() => {
  //     if (hr) {
  //       const names = hr.name?.split(' ') || ['', ''];
  //       setFormData(prev => ({ ...prev, firstName: names[0], lastName: names.slice(1).join(' '), email: hr.email, phone: hr.phone }));
  //     }
  //   }, [hr]);
  // 1. شيلنا الـ useEffect خالص أو سبناه للأمور التانية
  // 2. بنخلي الـ useState ياخد قيمته من الـ hr لو موجودة

  const [formData, setFormData] = useState({
    firstName: hr?.name?.split(" ")[0] || "",
    lastName: hr?.name?.split(" ").slice(1).join(" ") || "",
    email: hr?.email || "",
    phone: hr?.phone || "",
    currentPassword: "",
    newPassword: "",
  });

  // ملاحظة: لو الـ hr لسه بيحمل (Async)، هنحتاج الـ useEffect بس بشرط "التغيير الحقيقي"
  useEffect(() => {
    if (hr && !formData.email) {
      // شرط: لو الـ hr وصل والفورم لسه فاضي، املأ البيانات
      const names = hr.name?.split(" ") || ["", ""];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        firstName: names[0],
        lastName: names.slice(1).join(" "),
        email: hr.email,
        phone: hr.phone,
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [hr]); // المراقبة تكون على الـ hr فقط

  const handleUpdate = () => {
    // dispatch(updateHRProfile(formData));
    alert("Profile Update functionality triggered!");
  };

  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-lg font-bold text-gray-200 mb-8">
          Account information
        </h3>
        <div className="flex items-center gap-8 mb-10">
          <img
            src={hr?.avatar || hr?.image || defaultAvatar}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#0b141a] shadow-2xl"
            alt="me"
          />
          <div className="space-y-2">
            <div className="flex gap-4 text-xs font-black uppercase text-blue-500 tracking-widest">
              <button className="hover:underline">Change photo</button>
              <span className="text-gray-800">|</span>
              <button className="text-pink-600 hover:underline">Delete</button>
            </div>
            <p className="text-[10px] text-gray-600 font-medium italic">
              Max photo size of 2MB (Recommended: 400x400px).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputItem
            label="First Name"
            value={formData.firstName}
            onChange={(v) => setFormData({ ...formData, firstName: v })}
          />
          <InputItem
            label="Last Name"
            value={formData.lastName}
            onChange={(v) => setFormData({ ...formData, lastName: v })}
          />
          <InputItem
            label="Email address"
            value={formData.email}
            onChange={(v) => setFormData({ ...formData, email: v })}
          />
          <InputItem
            label="Phone Number"
            value={formData.phone}
            onChange={(v) => setFormData({ ...formData, phone: v })}
          />
        </div>
      </section>

      <section className="pt-8 border-t border-gray-800/50">
        <h3 className="text-lg font-bold text-gray-200 mb-8">Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputItem label="Current Password" type="password" isPassword />
          <InputItem label="New Password" type="password" isPassword />
        </div>
      </section>

      <div className="flex justify-end gap-4 pt-10">
        <button className="px-10 py-3 rounded-2xl border border-gray-800 text-gray-500 font-bold hover:bg-white/5 transition-all">
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-12 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-xl shadow-blue-600/10 transition-all active:scale-95"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

const InputItem = ({
  label,
  value,
  type = "text",
  isPassword = false,
  onChange,
}) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] ml-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        defaultValue={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-[#0b141a] p-4 rounded-2xl border border-gray-800/40 text-sm font-semibold outline-none focus:border-blue-500/50 transition-all"
      />
      {isPassword && (
        <i className="far fa-eye-slash absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer hover:text-gray-400"></i>
      )}
    </div>
  </div>
);

export default AccountTab;
