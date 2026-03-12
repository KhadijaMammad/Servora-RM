import { createBrowserRouter, Navigate } from "react-router-dom";

import { AdminLayout } from "../components/layouts/AdminLayout";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { Tables } from "../features/admin/AdminTables";
import { Register } from "../features/auth/Register";
import { Login } from "../features/auth/Login";
import { MenuPage } from "../features/admin/AdminMenu";
import { CategoryTabs } from "../components/admin/CategoryTabs";
import { InventoryPage } from "../features/admin/AdminInventory";

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
      { path: "menu", element: <MenuPage /> },
      { path: "categories", element: <CategoryTabs /> },
      { path: "inventory", element: <InventoryPage  /> },

      { path: "staff", element: <div>Staff Management Page</div> },
      { path: "reservations", element: <div>Reservations Page</div> },
    ],
  },

  // Səhv səhifə yönləndirməsi (Fallback)
  { path: "*", element: <Navigate to="/login" replace /> },
]);
