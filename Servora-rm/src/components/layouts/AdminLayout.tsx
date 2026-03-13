import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const MainLayout = ({ role }: { role: 'admin' | 'waiter' }) => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar role={role} />
      
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};