import { useState } from "react";
import { useGetDailyReportQuery } from "../../api/reportApi"; // Öz API faylını bura yaz

export const ReportsPage = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Əgər API tarix qəbul edirsə, query-ni belə dəyişirik
  // Qeyd: Backend-dən asılı olaraq endpoint-ə ?date=... əlavə etmək lazımdır
  const { data: report } = useGetDailyReportQuery(); 

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-950">Hesabatlar</h1>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="p-3 bg-white border rounded-[10px] shadow-sm"
        />
      </div>

      {/* Əsas Statistika Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Ümumi Gəlir" value={`${report?.totalRevenue || 0} AZN`} />
        <StatCard title="Sifariş Sayı" value={report?.totalOrders || 0} />
        <StatCard title="Tamamlanmış" value={report?.completedOrders || 0} />
        <StatCard title="Ləğv Edilmiş" value={report?.cancelledOrders || 0} />
      </div>

      {/* Detallı Məlumatlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[10px] shadow-sm border">
          <h3 className="font-bold text-lg mb-4">Ödəniş Üsulları</h3>
          <div className="flex justify-between py-2 border-b"><span>Nağd:</span> <span className="font-bold">{report?.cashPayments} AZN</span></div>
          <div className="flex justify-between py-2"><span>Kart:</span> <span className="font-bold">{report?.cardPayments} AZN</span></div>
        </div>
        
        <div className="bg-white p-6 rounded-[10px] shadow-sm border">
          <h3 className="font-bold text-lg mb-4">Rezervasiya Statusu</h3>
          <div className="flex justify-between py-2 border-b"><span>Ümumi:</span> <span>{report?.totalReservations}</span></div>
          <div className="flex justify-between py-2"><span>Tamamlanan:</span> <span className="text-green-600 font-bold">{report?.completedReservations}</span></div>
        </div>
      </div>
    </div>
  );
};

// Kiçik köməkçi komponent
const StatCard = ({ title, value }: { title: string, value: string | number }) => (
  <div className="bg-white p-6 rounded-[10px] shadow-sm border">
    <p className="text-slate-500 text-sm">{title}</p>
    <h2 className="text-2xl font-extrabold text-blue-950 mt-1">{value}</h2>
  </div>
);