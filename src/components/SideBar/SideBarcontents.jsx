import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  ClipboardList,
  Wallet,
  Briefcase,
  CalendarCheck,
  UserX,
  Scale
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/", icon: LayoutGrid },
  { name: "Employees", path: "/emlpoyees", icon: Users },
  { name: "Project", path: "/project", icon: ClipboardList },
  { name: "Payroll", path: "/Payroll", icon: Wallet },
  { name: "Hiring", path: "/hiring", icon: Briefcase },
  { name: "Attendance", path: "/attendance", icon: CalendarCheck },
  { name: "Leave", path: "/leave", icon: UserX },
  { name: "Performance", path: "/performance", icon: Scale },
];

const SideBarContents = () => {
  return (
<nav className="mt-8 flex flex-col gap-2 pb-6">
  {links.map(({ name, path, icon: Icon }) => (
    <NavLink
      key={name}
      to={path}
      end={path === "/"}
      className={({ isActive }) =>
        `
        w-full
        flex items-center gap-3
        px-4 py-2
        rounded-lg
        text-[13px]
        transition-colors duration-200
        ${
          isActive
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
        `
      }
    >
      <Icon size={16} className="shrink-0" />
      <span className="whitespace-nowrap font-medium">
        {name}
      </span>
    </NavLink>
  ))}
</nav>


)}

export default SideBarContents;
