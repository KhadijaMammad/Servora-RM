import { useGetAllUsersQuery } from "../../api/authApi";
import { UserTable } from "../../components/admin/UserTable";

export const StaffPage = () => {
  const { data, isLoading } = useGetAllUsersQuery();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-blue-950">Staff Management</h2>
        <p className="text-slate-400 text-sm">Manage user roles and permissions</p>
      </div>

      {isLoading ? (
        <div className="text-slate-400 text-center py-20">Loading staff members...</div>
      ) : (
        <UserTable users={data?.data || []} />
      )}
    </div>
  );
};