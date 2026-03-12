import { useState } from 'react';
import { useGetMenuItemsQuery, useGetCategoriesQuery, useAddMenuItemMutation } from '../../api/menuApi';
import { CategoryTabs } from '../../components/admin/CategoryTabs';
import { MenuCard } from '../../components/admin/MenuCards';

export const MenuPage = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: menuData } = useGetMenuItemsQuery();
  const { data: catData } = useGetCategoriesQuery();
  const [addMenuItem] = useAddMenuItemMutation();

  // Filtrasiya məntiqi: 'All' seçiləndə hamısını, əks halda kateqoriya ID-sinə görə göstər
  const filteredMenu = activeCat === 'All' 
    ? menuData?.data 
    : menuData?.data?.filter((item) => item.categoryId === activeCat);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      preparationTime: Number(formData.get('preparationTime')),
      categoryId: formData.get('categoryId') as string,
      imageUrl: formData.get('imageUrl') as string,
      ingredients: (formData.get('ingredients') as string).split(',').map(i => i.trim()),
    };
    await addMenuItem(payload);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-950">Menu Management</h2>
          <p className="text-slate-400 text-sm">Categorized dish management</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          + Add New Dish
        </button>
      </div>

      {/* Yuxarı navbar kimi kateqoriyalar */}
      <CategoryTabs 
        activeCat={activeCat} 
        setActiveCat={setActiveCat} 
        categories={catData?.data} 
      />

      {/* Menyu kartları grid-i */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMenu?.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="font-bold text-xl">Add New Dish</h3>
            <input name="name" placeholder="Dish Name" className="w-full p-3 bg-slate-50 rounded-xl" required />
            <select name="categoryId" className="w-full p-3 bg-slate-50 rounded-xl" required>
              <option value="">Select Category</option>
              {catData?.data?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input name="price" type="number" placeholder="Price" className="w-full p-3 bg-slate-50 rounded-xl" required />
            <input name="ingredients" placeholder="Ingredients (comma separated)" className="w-full p-3 bg-slate-50 rounded-xl" required />
            <div className="flex gap-4 mt-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 text-slate-500">Cancel</button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};