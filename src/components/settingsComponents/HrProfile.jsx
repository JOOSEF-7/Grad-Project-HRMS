import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// استيراد الأكشن من سلايس الـ HR
import { fetchMyHRProfile } from '../../store/slices/navbar/hrProfileSlice';
import defaultAvatar from '../../assets/icons/avatar-default-symbolic-svgrepo-com.svg';

const HrProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. جلب البيانات من سلايس الـ hrProfile
  const { data: hr, loading, error } = useSelector((state) => state.hrProfile);

  // تابات الجانب الأيسر
  const [activeTab, setActiveTab] = useState('account');
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isOnlineStatusEnabled, setIsOnlineStatusEnabled] = useState(true);

  // 2. طلب البيانات أول ما الصفحة تفتح
  useEffect(() => {
    dispatch(fetchMyHRProfile());
  }, [dispatch]);

  // تقسيم الاسم (لو الاسم كامل "علاء أحمد" مثلاً، بنقسمه لاسم أول واسم أخير للعرض)
  const nameParts = hr?.name ? hr.name.split(' ') : ["", ""];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  const menuItems = [
    { id: 'general', title: 'General', desc: 'Language, theme, preferences', icon: 'fas fa-cog' },
    { id: 'account', title: 'Account & security', desc: 'Profile, password, privacy', icon: 'fas fa-user-shield' },
    { id: 'access', title: 'Access', desc: 'Permission, roles, integration', icon: 'fas fa-key' },
    { id: 'help', title: 'Help & support', desc: 'FAQs, contact support', icon: 'far fa-question-circle' },
    { id: 'legal', title: 'Legal & app information', desc: 'Help center', icon: 'fas fa-info-circle' },
  ];

  // حالة التحميل
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#0b141a]">
       <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto p-6 min-h-screen text-white">
      
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#142129] rounded-xl flex items-center justify-center text-gray-400 hover:text-white border border-gray-800 transition-all">
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="grid grid-cols-12 gap-10">
        
        {/* الجانب الأيسر */}
        <aside className="col-span-12 lg:col-span-4 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-5 p-5 rounded-[1.5rem] transition-all text-left border ${
                activeTab === item.id ? 'bg-[#142129] border-gray-700 shadow-xl' : 'bg-transparent border-transparent hover:bg-white/[0.02]'
              }`}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg ${activeTab === item.id ? 'bg-[#1e293b] text-blue-400' : 'bg-[#142129] text-gray-500'}`}>
                <i className={item.icon}></i>
              </div>
              <div>
                <h4 className={`font-bold ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`}>{item.title}</h4>
                <p className="text-[11px] text-gray-600 font-medium">{item.desc}</p>
              </div>
            </button>
          ))}
        </aside>

        {/* الجانب الأيمن - عرض الداتا الحقيقية */}
        <main className="col-span-12 lg:col-span-8 bg-[#142129] rounded-[2.5rem] p-10 border border-gray-800/40 shadow-2xl space-y-12">
          
          <section>
            <h3 className="text-lg font-bold text-gray-200 mb-8">Account information</h3>
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
              <div className="relative">
                <img 
                  src={(hr?.image && hr.image.trim() !== "") ? hr.image : (hr?.avatar && hr.avatar.trim() !== "") ? hr.avatar : defaultAvatar} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#0b141a] shadow-xl" 
                  alt="hr-profile" 
                />
              </div>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                <button className="text-blue-500 hover:underline">Change photo</button>
                <span className="text-gray-700">|</span>
                <button className="text-pink-500 hover:underline">Delete</button>
                <p className="text-gray-600 ml-4 font-normal normal-case">Maximum photo size of 2mb.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="First name" value={firstName} />
              <InputField label="Last name" value={lastName} />
              <InputField label="Email" value={hr?.email} />
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Phone</label>
                <div className="flex items-center gap-3 bg-[#0b141a] p-3.5 rounded-xl border border-gray-800/50">
                   <div className="flex items-center gap-2 pr-3 border-r border-gray-800">
                      <img src="https://flagcdn.com/w20/us.png" className="w-5 h-3 object-contain" alt="flag" />
                      <i className="fas fa-chevron-down text-[8px] text-gray-600"></i>
                   </div>
                   <input type="text" value={hr?.phone || ""} readOnly className="bg-transparent outline-none w-full text-sm font-semibold text-gray-300" />
                </div>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-gray-800/50">
            <h3 className="text-lg font-bold text-gray-200 mb-8">Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Current password" value="............" type="password" isPassword />
              <InputField label="New password" value="............" type="password" isPassword />
            </div>
          </section>

          <section className="pt-8 border-t border-gray-800/50">
            <h3 className="text-lg font-bold text-gray-200 mb-8">Privacy control</h3>
            <div className="space-y-8">
              <ToggleItem label="Location" desc="Location tracking for remote work security." enabled={isLocationEnabled} setEnabled={setIsLocationEnabled} />
              <ToggleItem label="Online status" desc="Do Not Disturb mode to hide online status after 6 PM." enabled={isOnlineStatusEnabled} setEnabled={setIsOnlineStatusEnabled} />
            </div>
          </section>

          <div className="pt-10 flex justify-end gap-4">
            <button className="px-10 py-3 rounded-2xl border border-gray-700 text-gray-400 font-bold hover:bg-white/5 transition-all">Cancel</button>
            <button className="px-10 py-3 rounded-2xl bg-[#0095ff] text-white font-bold hover:bg-[#0081dd] shadow-lg shadow-blue-500/20 transition-all active:scale-95">Update</button>
          </div>
        </main>
      </div>
    </div>
  );
};

// المكونات المساعدة
const InputField = ({ label, value, type = "text", isPassword = false }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">{label}</label>
    <div className="relative">
      <input type={type} value={value || ""} readOnly className="w-full bg-[#0b141a] p-3.5 rounded-xl border border-gray-800/50 text-sm font-semibold outline-none text-gray-300" />
      {isPassword && <i className="far fa-eye-slash absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"></i>}
    </div>
  </div>
);

const ToggleItem = ({ label, desc, enabled, setEnabled }) => (
  <div className="flex items-center justify-between group">
    <div>
      <h5 className="text-sm font-bold text-gray-200 mb-1">{label}</h5>
      <p className="text-[11px] text-gray-600 font-medium">{desc}</p>
    </div>
    <button onClick={() => setEnabled(!enabled)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${enabled ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-800'}`}>
      <motion.div animate={{ x: enabled ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md" />
    </button>
  </div>
);

export default HrProfile;