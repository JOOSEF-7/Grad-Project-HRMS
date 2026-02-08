import SideBarContents from "./SideBarcontents.jsx";
import logo from "../../assets/icons/Logo.svg"; 

const SideBar = () => {
  return (
      <aside className="w-[170px] min-h-screen  bg-[#1B1E22] border-r border-white/10">



      <div className="px-6 py-6">
        {/* LOGO */}
    <img
     src={logo}
     alt="logo"
     className="h-9 mx-auto mb-6"
    />





        {/* LINKS */}
        <SideBarContents />
      </div>
    </aside>
  );

};

export default SideBar;
