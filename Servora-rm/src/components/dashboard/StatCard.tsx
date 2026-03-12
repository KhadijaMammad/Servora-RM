interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
}

export const StatCard = ({ title, value, subtitle }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <h3 className="text-sm text-slate-500 font-medium">{title}</h3>
    <p className="text-3xl font-semibold text-blue-900 mt-2">{value}</p>
    <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
  </div>
);