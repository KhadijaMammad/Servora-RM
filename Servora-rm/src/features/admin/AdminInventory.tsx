import { useState } from "react";
import {
  useGetIngredientsQuery,
  useAddStockMutation,
  useUseStockMutation,
  useAddIngredientMutation,
} from "../../api/ingredientApi";

export const InventoryPage = () => {
  const { data: ingredients } = useGetIngredientsQuery();
  const [addStock] = useAddStockMutation();
  const [useStock] = useUseStockMutation();
  const [addIngredient] = useAddIngredientMutation();
  
  const [amount, setAmount] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = async (id: string, type: "add" | "use") => {
    try {
      if (type === "add") await addStock({ id, amount }).unwrap();
      else await useStock({ id, amount }).unwrap();
    } catch (e) { alert("Xəta baş verdi!"); }
  };

 const handleNewIngredient = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  
  const body = {
    Name: fd.get("Name"), // Input name="Name"
    Category: fd.get("Category"),
    Unit: fd.get("Unit"),
    MinimumStock: Number(fd.get("MinimumStock")),
    InitialQuantity: Number(fd.get("InitialQuantity")),
    UnitPrice: Number(fd.get("UnitPrice")),
  };
  
  await addIngredient(body as any).unwrap();
  setIsModalOpen(false);
};
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl">+ Add Ingredient</button>
      </div>

      {/* Stok Artırma Batches */}
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="p-2 border rounded-lg w-20" />

      {/* Cədvəl */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
        <th className="p-5">#</th>
        <th className="p-5">Ingredient</th>
        <th className="p-5">Category</th>
        <th className="p-5">Stock Level</th>
        <th className="p-5 text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      {ingredients?.data?.map((ing, index) => (
        <tr key={ing.id} className="hover:bg-slate-50 transition-colors">
          <td className="p-5 text-slate-400 text-sm">{index + 1}</td>
          <td className="p-5 font-semibold text-slate-800">{ing.name}</td>
          <td className="p-5">
            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
              {ing.category}
            </span>
          </td>
          <td className="p-5">
            <div className="flex items-center gap-2">
              <span className={`font-bold ${ing.initialQuantity <= ing.minimumStock ? "text-red-500" : "text-emerald-600"}`}>
                {ing.initialQuantity} {ing.unit}
              </span>
            </div>
          </td>
          <td className="p-5 flex justify-end gap-2">
            <button onClick={() => handleAction(ing.id, "add")} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
              + Add
            </button>
            <button onClick={() => handleAction(ing.id, "use")} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-all">
              - Use
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Modal - Yeni İnqredient */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleNewIngredient} className="bg-white p-6 rounded-2xl w-96 space-y-4">
            <input name="Name" placeholder="Name" className="w-full border p-2" required />
            <input name="Category" placeholder="Category" className="w-full border p-2" required />
            <input name="Unit" placeholder="Unit (kg/lt)" className="w-full border p-2" required />
            <input name="MinimumStock" type="number" placeholder="Min Stock" className="w-full border p-2" required />
            <input name="InitialQuantity" type="number" placeholder="Initial Qty" className="w-full border p-2" required />
            <input name="UnitPrice" type="number" placeholder="Price" className="w-full border p-2" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};