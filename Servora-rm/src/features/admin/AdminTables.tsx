import { useState } from "react";
import {
  useGetTablesQuery,
  useAddTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
  useUpdateTableStatusMutation,
} from "../../api/tableApi";

// Status rəngləri üçün konfiqurasiya
const getStatusStyles = (status: string) => {
  switch (status) {
    case "Available": return "bg-green-100 text-green-700 border-green-200";
    case "Occupied": return "bg-red-100 text-red-700 border-red-200";
    case "Reserved": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Cleaning": return "bg-blue-100 text-blue-700 border-blue-200";
    default: return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export const Tables = () => {
  const { data } = useGetTablesQuery();
  const [addTable] = useAddTableMutation();
  const [updateTable] = useUpdateTableMutation();
  const [] = useDeleteTableMutation();
  const [updateStatus] = useUpdateTableStatusMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [status, setStatus] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      tableNumber: formData.get("tableNumber"),
      capacity: Number(formData.get("capacity")),
      location: formData.get("location"),
    };

    try {
      if (selectedTable) {
        await updateTable({ id: selectedTable.id, body: payload }).unwrap();
        await updateStatus({ id: selectedTable.id, status: status }).unwrap();
      } else {
        await addTable({ ...payload, status: 0 }).unwrap();
      }
      closeModal();
    } catch (err) {
      alert("Xəta baş verdi, yenidən cəhd edin.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTable(null);
    setStatus(0);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-950">Masa İdarəetməsi</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition"
        >
          + Yeni Masa Əlavə Et
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.map((table: any) => (
          <div
            key={table.id}
            onClick={() => {
              setSelectedTable(table);
              setStatus(table.statusValue || 0); // Status rəqəmini bura düzgün ötür
              setIsModalOpen(true);
            }}
            className={`p-6 bg-white rounded-3xl border-2 transition-all cursor-pointer hover:shadow-lg ${getStatusStyles(table.status)}`}
          >
            <h3 className="text-2xl font-bold text-blue-950">{table.tableNumber}</h3>
            <p className="text-slate-500 text-sm mt-1">Məkan: {table.location}</p>
            <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold uppercase border">
              {table.status}
            </span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-950/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-4xl w-full max-w-sm shadow-2xl space-y-4">
            <h3 className="text-xl font-bold">{selectedTable ? "Masanı Redaktə Et" : "Yeni Masa"}</h3>
            <input name="tableNumber" defaultValue={selectedTable?.tableNumber} placeholder="Masa Nömrəsi" className="w-full p-4 bg-slate-50 rounded-2xl" required />
            <input name="capacity" type="number" defaultValue={selectedTable?.capacity} placeholder="Tutumu" className="w-full p-4 bg-slate-50 rounded-2xl" required />
            <input name="location" defaultValue={selectedTable?.location} placeholder="Məkan" className="w-full p-4 bg-slate-50 rounded-2xl" required />

            {selectedTable && (
              <select value={status} onChange={(e) => setStatus(Number(e.target.value))} className="w-full p-4 bg-slate-50 rounded-2xl">
                <option value={0}>Available</option>
                <option value={1}>Occupied</option>
                <option value={2}>Reserved</option>
                <option value={3}>Cleaning</option>
              </select>
            )}

            <div className="flex gap-2 pt-4">
              <button type="button" onClick={closeModal} className="flex-1 py-4 text-slate-500">Ləğv et</button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl">Yadda saxla</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};