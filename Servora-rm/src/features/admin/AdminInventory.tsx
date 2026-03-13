import { useState } from "react";
import {
  useGetIngredientsQuery,
  useAddStockMutation,
  useUseStockMutation,
  useAddIngredientMutation,
} from "../../api/ingredientApi";

const CATEGORY_OPTIONS = [
  "Meat",
  "Poultry",
  "Fish",
  "Seafood",
  "Vegetable",
  "Fruit",
  "Dairy",
  "Grain",
  "Spice",
  "Oil",
  "Beverage",
  "Other",
];
const UNIT_OPTIONS = ["Kg", "L", "Piece"];

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
      // Uğurlu olduqda heç nə etməyə ehtiyac yoxdur, 
      // invalidatesTags avtomatik siyahını yeniləyəcək.
    } catch (e: any) { 
      console.log(e); // Burada konsola bax, xəta nədir?
      alert("Xəta: " + JSON.stringify(e.data || "Əməliyyat uğursuz oldu!")); 
    }
  };

  const handleNewIngredient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await addIngredient(formData).unwrap();
      setIsModalOpen(false);
    } catch (e: any) {
      alert(
        "Xəta: " +
          JSON.stringify(e.data?.errors || "Məlumat göndərilə bilmədi!"),
      );
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Anbar İdarəetməsi
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-200"
        >
          + Yeni İnqredient
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 w-fit shadow-sm">
        <label className="text-sm font-semibold text-slate-600">
          Əməliyyat miqdarı:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-2 border border-slate-300 rounded-lg w-20 text-center font-bold text-slate-800"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="p-5">İnqredient</th>
              <th className="p-5">Kateqoriya</th>
              <th className="p-5">Stok / Min</th>
              <th className="p-5 text-right">Əməliyyatlar</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {ingredients?.data?.map((ing) => (
              <tr key={ing.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold text-slate-900 text-base">
                  {ing.name}
                </td>
                <td className="p-5 text-sm text-slate-700 font-medium">
                  {ing.category}
                </td>
                <td className="p-5 font-bold text-sm">
                  <span
                    className={
                      ing.initialQuantity <= ing.minimumStock
                        ? "text-red-600 bg-red-50 px-2 py-1 rounded-md"
                        : "text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md"
                    }
                  >
                    {ing.initialQuantity} / {ing.minimumStock} {ing.unit}
                  </span>
                </td>
                <td className="p-5 flex justify-end gap-2">
                  <button
                    onClick={() => handleAction(ing.id, "add")}
                    className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg font-bold hover:bg-emerald-200"
                  >
                    {" "}
                    + add{" "}
                  </button>
                  <button
                    onClick={() => handleAction(ing.id, "use")}
                    className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg font-bold hover:bg-orange-200"
                  >
                    {" "}
                    - use{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleNewIngredient}
            className="bg-white p-8 rounded-3xl w-full max-w-sm space-y-4 shadow-2xl border border-slate-100"
          >
            <h3 className="text-2xl font-extrabold text-slate-900">
              Yeni İnqredient
            </h3>
            <input
              name="Name"
              placeholder="Adı"
              className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <select
              name="Category"
              className="w-full border border-slate-300 p-3 rounded-xl outline-none"
              required
            >
              <option value="">Kateqoriya seçin</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              name="Unit"
              className="w-full border border-slate-300 p-3 rounded-xl outline-none"
              required
            >
              <option value="">Vahid seçin</option>
              {UNIT_OPTIONS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <input
              name="MinimumStock"
              type="number"
              step="0.01"
              placeholder="Min Stok"
              className="w-full border border-slate-300 p-3 rounded-xl"
              required
            />
            <input
              name="InitialQuantity"
              type="number"
              step="0.01"
              placeholder="Başlanğıc Miqdar"
              className="w-full border border-slate-300 p-3 rounded-xl"
              required
            />
            <input
              name="UnitPrice"
              type="number"
              step="0.01"
              placeholder="Vahid Qiyməti"
              className="w-full border border-slate-300 p-3 rounded-xl"
              required
            />
            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 p-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
