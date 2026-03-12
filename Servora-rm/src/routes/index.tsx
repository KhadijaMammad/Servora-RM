import { createBrowserRouter, Navigate } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { Tables } from "../features/admin/AdminTables";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "tables", element: <Tables /> },
      { path: "menu", element: <div>Menu Management Page</div> },
      { path: "staff", element: <div>Staff Management Page</div> },
      { path: "reservations", element: <div>Reservations Page</div> },
    ],
  },

  // Səhv səhifə yönləndirməsi (Fallback)
  { path: "*", element: <Navigate to="/login" replace /> },
]);
