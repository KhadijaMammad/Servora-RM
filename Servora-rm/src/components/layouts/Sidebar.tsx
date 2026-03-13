import { NavLink } from "react-router-dom";

// Rollara görə menyuları ayırdıq
const roleMenus = {
  admin: [
    { path: "/admin", name: "Dashboard" },
    { path: "/admin/tables", name: "Table Management" },
    { path: "/admin/menu", name: "Menu Management" },
    // { path: '/admin/categories', name: 'Categories' },
    { path: "/admin/inventory", name: "Inventory" },
    { path: "/admin/staff", name: "Staff Management" },
    { path: "/admin/reservations", name: "Reservations" },
  ],
  waiter: [
    { path: "/waiter", name: "New Order" },
    { path: "/waiter/orders", name: "Order Histoy" },
    { path: "/waiter/menu", name: "Menu" },
    { path: "/waiter/kitchen", name: "Kitchen" },
  ],
};

interface SidebarProps {
  role: "admin" | "waiter";
}

export const Sidebar = ({ role }: SidebarProps) => {
  const currentMenu = roleMenus[role];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-lg border-r border-slate-200 h-screen p-6 fixed z-50 hidden md:flex flex-col justify-between">
      <div>
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-semibold text-blue-900 tracking-tight">
            Servora
          </h1>
          <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">
            {role} Panel
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {currentMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "text-slate-500 hover:bg-slate-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Aşağıdakı Switch Düyməsi */}
      <div className="px-2">
        <NavLink
          to={role === "admin" ? "/waiter" : "/admin"}
          className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl text-xs font-semibold text-center hover:bg-slate-800 transition-colors"
        >
          {role === "admin" ? "Switch to Waiter" : "Switch to Admin"}
        </NavLink>
      </div>
    </aside>
  );
};
