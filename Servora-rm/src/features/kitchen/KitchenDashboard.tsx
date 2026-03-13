import { useGetActiveKitchenOrdersQuery, useUpdateKitchenOrderStatusMutation } from "../../api/kitchenApi";

const STATUSES = ["Pending", "Confirmed", "Preparing", "Ready", "Served", "Completed", "Cancelled"];

export const KitchenDashboard = () => {
  const { data: rawData, refetch } = useGetActiveKitchenOrdersQuery();
  const [updateStatus] = useUpdateKitchenOrderStatusMutation();

  // Bütün sifarişləri çək, amma yalnız tamamlanmayanları göstər
  const allOrders = Array.isArray(rawData) ? rawData : (rawData?.data || []);
  const activeOrders = allOrders.filter((o: any) => o.status !== "Completed");

  const handleStatusChange = async (orderId: string, status: string) => {
    await updateStatus({ orderId, newStatus: status }).unwrap();
    refetch();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Mətbəx Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeOrders.map((order: any) => (
          <div key={order.orderId} className="bg-white p-6 rounded-2xl border">
            <h3 className="font-bold text-xl">Masa: {order.tableName}</h3>
            <p className="text-blue-600 font-semibold mb-4">{order.status}</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button key={s} onClick={() => handleStatusChange(order.orderId, s)}
                  className={`px-3 py-1 text-xs rounded ${order.status === s ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
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