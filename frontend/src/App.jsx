import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div style={{ overflow: 'visible' }}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}