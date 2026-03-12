export const UserTable = ({ headers, children }: { headers: string[], children: React.ReactNode }) => {
  return (
    <div className="border border-slate-200 rounded-[10px] overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {headers.map((h, i) => (
              <th key={i} className="p-4 font-semibold text-slate-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
};