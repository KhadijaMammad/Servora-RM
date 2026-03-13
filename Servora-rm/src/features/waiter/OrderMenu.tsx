import { useState } from "react";
import {
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
} from "../../api/menuApi";
import { CategoryTabs } from "../../components/admin/CategoryTabs";
import { MenuCard } from "../../components/admin/MenuCards";

export const OrderMenu = () => {
  const [activeCat, setActiveCat] = useState("All");

  const { data: menuData } = useGetMenuItemsQuery();
  const { data: catData } = useGetCategoriesQuery();
 



  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Management</h2>
      </div>

      <CategoryTabs activeCat={activeCat} setActiveCat={setActiveCat} categories={catData?.data} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuData?.data?.filter(i => activeCat === "All" || i.CategoryId === activeCat)?.map((item) => (
          <MenuCard key={item.id} item={item} onEdit={function (): void {
                throw new Error("Function not implemented.");
            } }  />
        ))}
      </div>

     
    </div>
  );
};