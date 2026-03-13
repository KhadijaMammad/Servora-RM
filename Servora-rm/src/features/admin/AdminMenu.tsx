import { useState } from "react";
import {
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
  useAddMenuItemMutation,
  useEditMenuItemMutation,
} from "../../api/menuApi";
import { CategoryTabs } from "../../components/admin/CategoryTabs";
import { MenuCard } from "../../components/admin/MenuCards";
import type { MenuItem } from "../../types/menu";

export const MenuPage = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const { data: menuData } = useGetMenuItemsQuery();
  const { data: catData } = useGetCategoriesQuery();
  const [addMenuItem] = useAddMenuItemMutation();
  const [editMenuItem] = useEditMenuItemMutation();

  const openAddModal = () => { setEditingItem(null); setIsModalOpen(true); };
  const openEditModal = (item: MenuItem) => { setEditingItem(item); setIsModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Backend-in DTO modelinə uyğun obyekt
    const body = {
      Name: formData.get("Name"),
      CategoryId: formData.get("CategoryId"),
      Price: parseFloat(formData.get("Price") as string),
      Description: formData.get("Description"),
      PreparationTime: parseInt(formData.get("PreparationTime") as string),
      ImageUrl: formData.get("ImageUrl") || editingItem?.ImageUrl || "",
      Ingredients: (formData.get("Ingredients") as string)?.split(",").map(i => i.trim()) || []
    };

    try {
      if (editingItem) {
        await editMenuItem({ id: editingItem.id, body }).unwrap();
      } else {
        // Yeni əlavə zamanı hələ də FormData istifadə edirik (şəkil üçün)
        const fd = new FormData();
        Object.entries(body).forEach(([key, val]) => fd.append(key, val as any));
        const fileInput = e.currentTarget.elements.namedItem("ImageUrl") as HTMLInputElement;
        if (fileInput?.files?.[0]) fd.set("ImageUrl", fileInput.files[0]);
        
        await addMenuItem(fd).unwrap();
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err: any) {
      alert("Xəta: " + JSON.stringify(err.data?.errors || err.message));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <button onClick={openAddModal} className="bg-blue-600 text-white px-6 py-3 rounded-2xl">+ Add New Dish</button>
      </div>

      <CategoryTabs activeCat={activeCat} setActiveCat={setActiveCat} categories={catData?.data} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuData?.data?.filter(i => activeCat === "All" || i.CategoryId === activeCat)?.map((item) => (
          <MenuCard key={item.id} item={item} onEdit={() => openEditModal(item)} />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/30 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-4">
            <input name="Name" defaultValue={editingItem?.Name} placeholder="Dish Name" className="w-full p-3 bg-slate-50 rounded-xl" required />
            <select name="CategoryId" defaultValue={editingItem?.CategoryId} className="w-full p-3 bg-slate-50 rounded-xl" required>
              {catData?.data?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input name="Price" type="number" defaultValue={editingItem?.Price} placeholder="Price" className="w-full p-3 bg-slate-50 rounded-xl" required />
            <input name="Ingredients" defaultValue={editingItem?.Ingredients?.join(", ")} placeholder="Ingredients (comma separated)" className="w-full p-3 bg-slate-50 rounded-xl" required />
            <input name="Description" defaultValue={editingItem?.Description} placeholder="Description" className="w-full p-3 bg-slate-50 rounded-xl" required />
            <input name="PreparationTime" type="number" defaultValue={editingItem?.PreparationTime} placeholder="Prep Time" className="w-full p-3 bg-slate-50 rounded-xl" required />
            <input name="ImageUrl" type={editingItem ? "text" : "file"} defaultValue={editingItem ? editingItem.ImageUrl : ""} className="w-full p-3 bg-slate-50 rounded-xl" required />
            
            <div className="flex gap-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-slate-500">Cancel</button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};