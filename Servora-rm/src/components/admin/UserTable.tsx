import { useAssignRoleMutation } from "../../api/authApi";
import { ROLES, type User } from "../../types/auth";

export const UserTable = ({ users }: { users: User[] }) => {
  const [assignRole] = useAssignRoleMutation();

  const handleRoleChange = async (id: string, newRole: string) => {
    await assignRole({ id, role: newRole });
  };

  return (
    <div className="bg-white rounded-[10px] border border-slate-100 shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50/50">
          <tr className="text-slate-400 text-xs uppercase tracking-wider">
            <th className="p-6">User</th>
            <th className="p-6">Email</th>
            <th className="p-6">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users?.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50/50 transition">
              <td className="p-6 font-medium">{user.name} {user.surname}</td>
              <td className="p-6 text-slate-500">{user.mail}</td>
              <td className="p-6">
                <select 
                  defaultValue={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="bg-white border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};