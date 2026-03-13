import { useState } from "react";
import {
  useGetTablesQuery,
  useAddTableMutation,
  useUpdateTableMutation,
  useUpdateTableStatusMutation,
} from "../../api/tableApi";

// Status siyahısı - bura yeni status gəlsə, sadəcə bir sətir əlavə et
const STATUS_CONFIG: { [key: number]: { label: string, color: string } } = {
  0: { label: "Available", color: "bg-green-100 text-green-700 border-green-200" },
  1: { label: "Occupied", color: "bg-red-100 text-red-700 border-red-200" },
  2: { label: "Reserved", color: "bg-amber-100 text-amber-700 border-amber-200" },
  3: { label: "Cleaning", color: "bg-blue-100 text-blue-700 border-blue-200" },
};

export const Tables = () => {
  const { data } = useGetTablesQuery();
  const [addTable] = useAddTableMutation();
  const [updateTable] = useUpdateTableMutation();
  const [updateStatus] = useUpdateTableStatusMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [status, setStatus] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = { tableNumber: fd.get("tableNumber"), capacity: Number(fd.get("capacity")), location: fd.get("location") };

    try {
      if (selectedTable) {
        await updateTable({ id: selectedTable.id, body: payload }).unwrap();
        await updateStatus({ id: selectedTable.id, status: status }).unwrap();
      } else {
        await addTable({ ...payload, status: 0 }).unwrap();
      }
      closeModal();
    } catch { alert("Xəta baş verdi!"); }
  };

  const closeModal = () => { setIsModalOpen(false); setSelectedTable(null); };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-950">Masa İdarəetməsi</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700"> + Yeni Masa </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.map((t: any) => (
          <div key={t.id} onClick={() => { setSelectedTable(t); setStatus(t.statusValue || 0); setIsModalOpen(true); }}
            className={`p-6 bg-white rounded-3xl border-2 transition-all cursor-pointer hover:shadow-xl ${STATUS_CONFIG[t.statusValue]?.color || "bg-slate-100"}`}>
            <h3 className="text-2xl font-bold text-blue-950">{t.tableNumber}</h3>
            <p className="text-slate-500 text-sm mt-1">Məkan: {t.location}</p>
            <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold uppercase border bg-white/50">
              {t.status}
            </span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-sm space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold">{selectedTable ? "Redaktə Et" : "Yeni Masa"}</h3>
            <input name="tableNumber" defaultValue={selectedTable?.tableNumber} placeholder="Masa Nömrəsi" className="w-full p-4 bg-slate-50 rounded-xl" required />
            <input name="capacity" type="number" defaultValue={selectedTable?.capacity} placeholder="Tutumu" className="w-full p-4 bg-slate-50 rounded-xl" required />
            <input name="location" defaultValue={selectedTable?.location} placeholder="Məkan" className="w-full p-4 bg-slate-50 rounded-xl" required />
            
            {selectedTable && (
              <select value={status} onChange={(e) => setStatus(Number(e.target.value))} className="w-full p-4 bg-slate-50 rounded-xl">
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => <option key={key} value={key}>{cfg.label}</option>)}
              </select>
            )}
            
            <div className="flex gap-2 pt-4">
              <button type="button" onClick={closeModal} className="flex-1 py-4 text-slate-500">Ləğv et</button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold">Yadda saxla</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};