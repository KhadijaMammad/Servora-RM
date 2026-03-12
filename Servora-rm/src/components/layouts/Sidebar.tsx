import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/admin', name: 'Dashboard' },
  { path: '/admin/tables', name: 'Table Management' },
  { path: '/admin/menu', name: 'Menu Management' },
  { path: '/admin/categories', name: 'Categories' }, 
  { path: '/admin/inventory', name: 'Inventory' },  
  { path: '/admin/staff', name: 'Staff Management' },
  { path: '/admin/reservations', name: 'Reservations' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white/80 backdrop-blur-lg border-r border-slate-200 h-screen p-6 fixed z-50 hidden md:flex flex-col">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-semibold text-blue-900 tracking-tight">Servora</h1>
        <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Admin Panel</p>
      </div>
      
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};