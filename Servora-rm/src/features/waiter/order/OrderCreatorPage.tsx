import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTablesQuery } from "../../../api/tableApi";
import { useGetMenuItemsQuery } from "../../../api/menuApi";
import { useCreateDineInOrderMutation } from "../../../api/orderApi";


export const OrderCreatorPage = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  
  const { data: tablesData } = useGetTablesQuery();
  const { data: menuData } = useGetMenuItemsQuery();
  const [createOrder] = useCreateDineInOrderMutation();

  const tables = Array.isArray(tablesData) ? tablesData : (tablesData?.data || []);
  const menuItems = Array.isArray(menuData) ? menuData : (menuData?.data || []);
  const emptyTables = tables.filter((t: any) => !t.isOccupied);

  const addToCart = (item: any) => {
    setCart((prev) => [...prev, { menuItemId: item.id, name: item.name, quantity: 1 }]);
  };

  const handlePlaceOrder = async () => {
    if (!selectedTable) return;

 const payload = {
      tableId: selectedTable.id, 
      tableNumber: selectedTable.tableNumber?.toString() || "0",
      waiterId: "c6ad736b-ac17-4ddb-87e0-985f63620690",
      notes: "yoxdur",
      items: cart.map((c) => ({
        menuItemId: c.menuItemId, 
        quantity: Number(c.quantity),
        specialInstructions: "yoxdur" 
      }))
    };

    try {
      await createOrder(payload).unwrap();
      alert("Sifariş mətbəxə uğurla göndərildi!");
      setCart([]);
      setSelectedTable(null);
      navigate("/waiter/kitchen"); // Və ya mətbəxə keçid et
    } catch (e: any) {
      alert("Xəta: " + (e?.data?.message || "Sifariş göndərilə bilmədi"));
    }
  };

  if (!selectedTable) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Masa Seçin</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emptyTables.map((t: any) => (
            <button key={t.id} onClick={() => setSelectedTable(t)} 
              className="h-32 bg-emerald-50 border-2 border-emerald-200 rounded-3xl flex flex-col items-center justify-center hover:bg-emerald-100 transition">
              <span className="text-4xl font-black text-emerald-700">{t.tableNumber}</span>
              <span className="text-sm text-emerald-600">Boşdur</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen p-6 gap-6">
      <div className="flex-1">
        <button onClick={() => setSelectedTable(null)} className="mb-4 text-blue-600 font-semibold">← Geri</button>
        <h2 className="text-2xl font-bold mb-4">Masa {selectedTable.tableNumber} - Menyu</h2>
        <div className="grid grid-cols-3 gap-4">
          {menuItems.map((item: any) => (
            <div key={item.id} className="p-4 bg-white border rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <button onClick={() => addToCart(item)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Səbətə at
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-80 bg-white p-6 border rounded-2xl h-fit shadow-lg">
        <h2 className="text-xl font-bold mb-4">Səbət</h2>
        {cart.length === 0 ? <p className="text-gray-400">Səbət boşdur</p> : 
          cart.map((c, i) => <div key={i} className="mb-2 font-medium">{c.name}</div>)
        }
        <button onClick={handlePlaceOrder} disabled={cart.length === 0}
          className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-300 transition">
          Sifarişi Təsdiqlə
        </button>
      </div>
    </div>
  );
};