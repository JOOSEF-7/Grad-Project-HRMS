import {
  Pencil,
  Briefcase,
  Calendar,
  UserCircle,
  Building,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  CreditCard,
  Stethoscope,
  Umbrella,
  Coffee,
} from "lucide-react";
import BaseCard from "../../../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee, fetchEmployeeById } from "../../../../store/HrSlices/employeeSlice";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
      <Icon size={12} />
      <span>{label}</span>
    </div>
    <span className="text-xs font-medium" style={{ color: "var(--text-main)" }}>
      {value ?? "—"}
    </span>
  </div>
);

const SectionTitle = ({ title }) => (
  <h3
    className="text-xs font-semibold uppercase tracking-wider mb-3 mt-5 pb-1"
    style={{
      color: "var(--text-muted)",
      borderBottom: "1px solid var(--border-main)",
    }}
  >
    {title}
  </h3>
);

const FormField = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs" style={{ color: "var(--text-muted)" }}>
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  background: "var(--input-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--border-main)",
  borderRadius: "6px",
  padding: "8px",
  fontSize: "12px",
  outline: "none",
  width: "100%",
};

const inputDisabledStyle = {
  ...inputStyle,
  opacity: 0.5,
  cursor: "not-allowed",
};

const EmployeeProfileCard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { employeeDetail: emp, loading } = useSelector((state) => state.employees);

  useEffect(() => {
    if (id) dispatch(fetchEmployeeById(id));
  }, [id, dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (emp) setFormData(emp);
  }, [emp]);

  if (loading)
    return (
      <div className="p-6 text-sm" style={{ color: "var(--text-muted)" }}>
        Loading...
      </div>
    );
  if (!emp) return null;

  const g = emp.general ?? {};
  const e = emp.employee ?? {};
  const ex = emp.experience ?? {};

  const fullName = `${g.firstName ?? ""} ${g.lastName ?? ""}`.trim();
  const joiningDate = e.joiningDate?.split("T")[0] ?? "—";
  const expStart = ex.startDate?.split("T")[0] ?? "—";
  const expEnd = ex.endDate?.split("T")[0] ?? "—";

  const handleChange = (evt, section) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleSave = () => {
    dispatch(
      updateEmployee({
        id: emp._id,
        updatedData: {
          general: {
            firstName: formData.general?.firstName,
            lastName: formData.general?.lastName,
            phone: formData.general?.phone,
            gender: formData.general?.gender,
            address: formData.general?.address,
            avatar: formData.general?.avatar,
          },
          employee: {
            jobTitle: formData.employee?.jobTitle,
            department: formData.employee?.department,
            jobType: formData.employee?.jobType,
            workLocation: formData.employee?.workLocation,
          },
        },
      })
    );
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(emp);
    setEditMode(false);
  };

  return (
    <BaseCard className="relative">
      {/* ── Top: Avatar + Name ── */}
      <div className="flex flex-col md:flex-row gap-5 mb-2">
        <div className="flex-shrink-0">
          <img
            src={g.avatar}
            alt={fullName}
            className="w-28 h-32 md:w-32 md:h-36 rounded-xl object-cover"
          />
        </div>

        <div className="flex-1">
          {!editMode && (
            <>
              <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--text-main)" }}>
                {fullName}
              </h2>
              <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                {e.jobTitle ?? "—"}
              </p>

              <div className="flex gap-2 flex-wrap mb-4">
                {[g.gender, g.role, e.status].filter(Boolean).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        tag === "Active"
                          ? "var(--pill-green-bg)"
                          : "var(--tab-inactive-bg)",
                      color:
                        tag === "Active"
                          ? "var(--pill-green-text)"
                          : "var(--tab-inactive-text)",
                      border:
                        tag === "Active"
                          ? "1px solid var(--pill-green-border)"
                          : "1px solid var(--border-main)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* General Info */}
              <SectionTitle title="General Info" />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                <InfoItem icon={Mail} label="Email" value={g.email} />
                <InfoItem icon={Phone} label="Phone" value={g.phone} />
                <InfoItem icon={MapPin} label="Address" value={g.address} />
                <InfoItem icon={CreditCard} label="RFID Tag" value={g.rfidTag} />
              </div>

              {/* Employee Info */}
              <SectionTitle title="Employee Info" />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                <InfoItem icon={Building} label="Department" value={e.department} />
                <InfoItem icon={Briefcase} label="Job Type" value={e.jobType} />
                <InfoItem icon={MapPin} label="Work Location" value={e.workLocation} />
                <InfoItem icon={Calendar} label="Joining Date" value={joiningDate} />
                <InfoItem icon={Clock} label="Working Hours" value={e.workingHours ? `${e.workingHours}h` : "—"} />
                <InfoItem icon={DollarSign} label="Base Salary" value={e.baseSalary ? `EGP ${e.baseSalary.toLocaleString()}` : "—"} />
              </div>


              

              <button
                onClick={() => setEditMode(true)}
                className="absolute top-5 right-5 p-2 rounded-lg transition-colors"
                style={{
                  background: "var(--tab-inactive-bg)",
                  border: "1px solid var(--border-main)",
                }}
              >
                <Pencil size={16} style={{ color: "var(--text-muted)" }} />
              </button>
            </>
          )}

          {/* ── Edit Mode ── */}
          {editMode && (
            <div className="space-y-4">
              <SectionTitle title="General Info" />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="First Name">
                  <input name="firstName" value={formData.general?.firstName || ""} onChange={(e) => handleChange(e, "general")} style={inputStyle} />
                </FormField>
                <FormField label="Last Name">
                  <input name="lastName" value={formData.general?.lastName || ""} onChange={(e) => handleChange(e, "general")} style={inputStyle} />
                </FormField>
                <FormField label="Phone">
                  <input name="phone" value={formData.general?.phone || ""} onChange={(e) => handleChange(e, "general")} style={inputStyle} />
                </FormField>
                <FormField label="Gender">
                  <select name="gender" value={formData.general?.gender || ""} onChange={(e) => handleChange(e, "general")} style={inputStyle}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </FormField>
                <FormField label="Address">
                  <input name="address" value={formData.general?.address || ""} onChange={(e) => handleChange(e, "general")} style={inputStyle} />
                </FormField>
                <FormField label="Role">
                  <input value={formData.general?.role || ""} disabled style={inputDisabledStyle} />
                </FormField>
              </div>

              <SectionTitle title="Employee Info" />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField label="Job Title">
                  <input name="jobTitle" value={formData.employee?.jobTitle || ""} onChange={(e) => handleChange(e, "employee")} style={inputStyle} />
                </FormField>
                <FormField label="Department">
                  <input name="department" value={formData.employee?.department || ""} onChange={(e) => handleChange(e, "employee")} style={inputStyle} />
                </FormField>
                <FormField label="Job Type">
                  <select name="jobType" value={formData.employee?.jobType || ""} onChange={(e) => handleChange(e, "employee")} style={inputStyle}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </FormField>
                <FormField label="Work Location">
                  <select name="workLocation" value={formData.employee?.workLocation || ""} onChange={(e) => handleChange(e, "employee")} style={inputStyle}>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </FormField>
                <FormField label="Joining Date">
                  <input value={formData.employee?.joiningDate?.split("T")[0] || ""} disabled style={inputDisabledStyle} />
                </FormField>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 rounded text-sm text-white"
                  style={{ background: "var(--accent-cyan)" }}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded text-sm"
                  style={{
                    background: "var(--tab-inactive-bg)",
                    color: "var(--text-main)",
                    border: "1px solid var(--border-main)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

export default EmployeeProfileCard;