import { useState } from "react";
import { useGetAllOrdersQuery } from "../../api/orderApi";

export const OrderHistory = () => {
  const { data: ordersData, refetch, isLoading } = useGetAllOrdersQuery();
  const [payingId, setPayingId] = useState<string | null>(null);

  const allOrders = ordersData?.data || [];

  // yalnız aktiv və ödənməmiş sifarişlər
  const activeOrders = allOrders.filter(
    (o: any) =>
      o.status === "Completed" &&
      o.status !== "Paid" &&
      o.status !== "Cancelled"
  );

  const handlePayment = async (orderId: string) => {
    setPayingId(orderId);

    try {
      const response = await fetch(
        `https://servora.api.nantech.az/api/Payment/create/${orderId}?redirectUrl=https://servora-rm.vercel.app/waiter/orders`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const paymentUrl = await response.text();

      if (paymentUrl && paymentUrl.startsWith("http")) {
        window.location.href = paymentUrl.replace(/"/g, "");
      } else {
        alert("Ödəniş linki alınmadı!");
      }
    } catch (error) {
      console.error(error);
      alert("Xəta baş verdi.");
    } finally {
      setPayingId(null);
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-lg font-medium">
        Sifarişlər yüklənir...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Aktiv Sifarişlər</h1>

      {activeOrders.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          Aktiv sifariş tapılmadı.
        </div>
      ) : (
        <table className="w-full bg-white rounded-xl shadow border">
          <thead>
            <tr className="bg-gray-50 border-b text-left">
              <th className="p-4">Masa</th>
              <th className="p-4">Status</th>
              <th className="p-4">Məbləğ</th>
              <th className="p-4">Əməliyyat</th>
            </tr>
          </thead>

          <tbody>
            {activeOrders.map((order: any) => (
              <tr key={order.orderId} className="border-b">
                <td className="p-4">{order.tableName}</td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {order.status}
                  </span>
                </td>

                <td className="p-4 font-bold">
                  {order.finalAmount} AZN
                </td>

                <td className="p-4">
                  <button
                    disabled={payingId === order.orderId}
                    onClick={() => handlePayment(order.orderId)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {payingId === order.orderId
                      ? "Gözləyin..."
                      : "Ödəniş Et"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};