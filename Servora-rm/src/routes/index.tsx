import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "../components/layouts/AdminLayout";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { Tables } from "../features/admin/AdminTables";
import { Register } from "../features/auth/Register";
import { Login } from "../features/auth/Login";
import { MenuPage } from "../features/admin/AdminMenu";
import { CategoryTabs } from "../components/admin/CategoryTabs";
import { InventoryPage } from "../features/admin/AdminInventory";
import { StaffPage } from "../features/admin/Staff";
import { OrderCreatorPage } from "../features/waiter/order/OrderCreatorPage";
import { KitchenDashboard } from "../features/kitchen/KitchenDashboard";
import { OrderMenu } from "../features/waiter/OrderMenu";
import { OrderHistory } from "../components/waiter/OrdersPage";
import { AdminOrder } from "../features/admin/AdminOrder";
import { ReportsPage } from "../features/admin/AdminReports";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  {
    path: "/admin",
    element: <MainLayout role="admin" />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "tables", element: <Tables /> },
      { path: "menu", element: <MenuPage /> },
      { path: "categories", element: <CategoryTabs /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "staff", element: <StaffPage /> },
      {path: "order", element: <AdminOrder />},
      {path: "reports", element: <ReportsPage />},
      { path: "reservations", element: <div>Reservations Page</div> },
    ],
  },

  // Waiter Routes
  {
    path: "/waiter",
    element: <MainLayout role="waiter" />,
    children: [
      { index: true, element: <OrderCreatorPage /> },
      { path: "kitchen", element: <KitchenDashboard /> },
      {
        path: "menu",
        element: <OrderMenu />,
      },
      {
        path: "orders",
        element: <OrderHistory />,
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
]);
