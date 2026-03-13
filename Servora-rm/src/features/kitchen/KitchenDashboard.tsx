import { useGetActiveKitchenOrdersQuery, useUpdateKitchenOrderStatusMutation } from "../../api/kitchenApi";

const STATUSES = ["Pending", "Confirmed", "Preparing", "Ready", "Served"];

export const KitchenDashboard = () => {
  // Hər 5 saniyədən bir məlumatı avtomatik yenilə (Polling)
  const { data: rawData, refetch } = useGetActiveKitchenOrdersQuery(undefined, {
    pollingInterval: 5000, 
  });
  const [updateStatus] = useUpdateKitchenOrderStatusMutation();

  const allOrders = Array.isArray(rawData) ? rawData : (rawData?.data || []);
  
  // "Completed" və "Cancelled" olmayan bütün sifarişləri göstər
  const activeOrders = allOrders.filter(
    (o: any) => o.status !== "Completed" && o.status !== "Cancelled"
  );

  const handleStatusChange = async (orderId: string, status: string) => {
    await updateStatus({ orderId, newStatus: status }).unwrap();
    refetch(); // Dərhal yenilə
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Mətbəx Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeOrders.map((order: any) => (
          <div key={order.orderId} className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="font-bold text-xl mb-2">Masa: {order.tableName}</h3>
            <p className="text-blue-600 font-bold mb-4 uppercase">{order.status}</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button key={s} onClick={() => handleStatusChange(order.orderId, s)}
                  className={`px-3 py-1 text-xs font-bold rounded ${order.status === s ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};