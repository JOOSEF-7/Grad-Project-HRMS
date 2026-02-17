import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="relative min-h-screen text-[var(--text-main)] overflow-hidden">
      {/* Base black */}
      <div className="absolute inset-0 bg-[var(--bg-main)]" />

      {/* Black depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-main)] to-[var(--bg-deep)]" />

      {/* Blue hint from left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(59,130,246,0.12)] via-transparent to-transparent" />

      {/* Soft accent (very subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--accent-soft)]" />
      {/* App content */}
      <div className="relative z-10">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
