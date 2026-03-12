import { useState } from "react";
import {
  useGetIngredientsQuery,
  useAddStockMutation,
  useUseStockMutation,
} from "../../api/ingredientApi";

export const InventoryPage = () => {
  const { data: ingredients } = useGetIngredientsQuery();
  const [addStock] = useAddStockMutation();
  const [useStock] = useUseStockMutation();
  const [amount, setAmount] = useState<number>(1);

  const handleAction = async (id: string, type: "add" | "use") => {
    if (type === "add") await addStock({ id, amount });
    else await useStock({ id, amount });
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Inventory Management</h2>

      <div className="bg-white p-3 rounded-[10px] border flex items-center gap-4 w-fit">
        <label className="text-sm font-medium">Batch Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-2 border rounded-lg w-20"
        />
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-slate-400 text-sm">
              <th className="p-4">Ingredient</th>
              <th className="p-4">Category</th>
              <th className="p-4">Current Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients?.data?.map((ing) => (
              <tr key={ing.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{ing.name}</td>
                <td className="p-4 text-slate-500">{ing.category}</td>
                <td className="p-4">
                  <span
                    className={
                      ing.initialQuantity <= ing.minimumStock
                        ? "text-red-500 font-bold"
                        : ""
                    }
                  >
                    {ing.initialQuantity} {ing.unit}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleAction(ing.id, "add")}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => handleAction(ing.id, "use")}
                    className="px-3 py-1 bg-orange-600 text-white rounded-lg text-sm"
                  >
                    - Use
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
