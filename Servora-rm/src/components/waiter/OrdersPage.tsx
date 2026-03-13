import { useState } from "react";
import { useGetAllOrdersQuery } from "../../api/orderApi";

export const OrderHistory = () => {
  const { data: ordersData, refetch } = useGetAllOrdersQuery();
  const [loading, setLoading] = useState(false);

  // API-dən gələn datanı al
  const allOrders = ordersData?.data || [];

  // ƏSAS HİSSƏ: Yalnız "Completed" olanları saxlayırıq (Paid və Cancelled yox olacaq)
  const activeOrders = allOrders.filter((o: any) => o.status === "Completed");

  const handlePayment = async (orderId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://servora.api.nantech.az/api/Payment/create/${orderId}?redirectUrl=https://servora-rm.vercel.app/`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const paymentUrl = await response.text();
      if (paymentUrl && paymentUrl.startsWith("http")) {
        window.location.href = paymentUrl.replace(/"/g, "");
      } else {
        alert("Ödəniş linki alınmadı!");
      }
    } catch {
      alert("Xəta baş verdi.");
    } finally {
      setLoading(false);
      refetch(); // Səhifə qayıdanda siyahı avtomatik təzələnəcək
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Aktiv Sifarişlər</h1>
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
              <td className="p-4">{order.status}</td>
              <td className="p-4 font-bold">{order.finalAmount} AZN</td>
              <td className="p-4">
                <button
                  disabled={loading}
                  onClick={() => handlePayment(order.orderId)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {loading ? "Gözləyin..." : "Ödəniş Et"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};