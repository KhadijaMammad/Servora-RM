import { StatCard } from '../../components/dashboard/StatCard';
import { useGetTablesQuery, useGetReservationsQuery } from '../../api/tableApi';

export const AdminDashboard = () => {
  const { data: tablesData } = useGetTablesQuery();
  const { data: reservationsData } = useGetReservationsQuery();

  // Dinamik hesablamalar
  const tables = tablesData?.data || [];
  const occupiedTables = tables.filter((t: any) => t.status === 'Occupied').length;
  const totalTables = tables.length;
  
  const reservations = reservationsData?.data || [];
  const todayBookings = reservations.length; // Gələcəkdə "bugünkü tarix" filtri əlavə edəcəyik

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-blue-900">Dashboard</h2>
        <p className="text-slate-500 text-sm mt-1">Overview of your restaurant performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="1,250 AZN" subtitle="Today's total" />
        <StatCard title="Active Orders" value="12" subtitle="In preparation" />
        <StatCard title="Reservations" value={todayBookings} subtitle="For today" />
        <StatCard title="Tables" value={`${occupiedTables}/${totalTables}`} subtitle="Occupied / Total" />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-medium text-blue-900 mb-6">Recent Activity</h3>
<p>Table list or recent orders will be displayed here...</p>
      </div>
    </div>
  );
};