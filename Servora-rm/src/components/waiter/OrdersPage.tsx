import { useState } from "react";
import { useGetAllOrdersQuery } from "../../api/orderApi";

export const OrderHistory = () => {
  const { data: ordersData } = useGetAllOrdersQuery();
  const [loading, setLoading] = useState(false);

  // API-dən gələn datanı qəbul edirik
  const orders = Array.isArray(ordersData)
    ? ordersData
    : ordersData?.data || [];

  const handlePayment = async (orderId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://servora.api.nantech.az/api/Payment/create/${orderId}?redirectUrl=http://localhost:5173/waiter/orders`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      // JSON əvəzinə mətn kimi oxuyuruq
      const paymentUrl = await response.text();

      // İndi birbaşa yönləndiririk
      if (paymentUrl && paymentUrl.startsWith("http")) {
        window.location.href = paymentUrl.replace(/"/g, "");
      } else {
        alert("Xəta: Serverdən etibarlı link gəlmədi: " + paymentUrl);
      }
    } catch (error) {
      alert("Şəbəkə xətası, yenidən cəhd et.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sifariş Tarixçəsi</h1>
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
          {orders.map((order: any) => (
            <tr key={order.orderId} className="border-b">
              <td className="p-4">{order.tableName}</td>
              <td className="p-4">{order.status}</td>
              <td className="p-4">{order.finalAmount} AZN</td>
              <td className="p-4">
                {order.status === "Paid" ? ( // 'Paid' statusunu API-dən gələn real statusla əvəz et
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    ✓ Ödənilib
                  </span>
                ) : order.status === "Completed" ? (
                  <button
                    disabled={loading}
                    onClick={() => handlePayment(order.orderId)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? "Gözləyin..." : "Ödəniş Et"}
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm italic">
                    Gözlənilir
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
