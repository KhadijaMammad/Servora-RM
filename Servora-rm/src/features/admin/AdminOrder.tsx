import { OrderHistory } from "../../components/waiter/OrdersPage";


export const AdminOrder = () => {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
      <p className="text-slate-500 mt-2">
        Manage all orders from a single place.
      </p>
      <OrderHistory/>
    </div>
  );
};
