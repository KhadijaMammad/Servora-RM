import { useState } from "react";
import { useGetDailyReportQuery, useGetMonthlyReportQuery } from "../../api/reportApi";

export const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');
  const { data: dailyData } = useGetDailyReportQuery();
  const { data: monthlyData } = useGetMonthlyReportQuery();

  const report = activeTab === 'daily' ? dailyData : monthlyData;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Hesabatlar</h1>
      
      {/* Tablar */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('daily')} className={`px-6 py-2 rounded-xl ${activeTab === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Gündəlik</button>
        <button onClick={() => setActiveTab('monthly')} className={`px-6 py-2 rounded-xl ${activeTab === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Aylıq</button>
      </div>

      {/* Hesabat Məlumatı */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        {report ? (
          <pre>{JSON.stringify(report, null, 2)}</pre>
        ) : (
          <p>Məlumat yüklənir...</p>
        )}
      </div>
    </div>
  );
};