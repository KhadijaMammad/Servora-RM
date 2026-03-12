import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const AdminLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};