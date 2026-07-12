"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Users, Building, ShieldCheck, Activity, TrendingUp, MonitorPlay } from "lucide-react";
import axios from "axios";

type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    setUpdatingId(userId);
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}/role`, { role: newRole });
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Failed to update user role:", error);
      alert("Failed to update user role. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const mentorsCount = users.filter(u => u.role === "mentor").length;

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-600" /> Admin Control Panel
        </h1>
        <p className="text-gray-600 text-sm">Manage users, mentors, communities, and system analytics.</p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Users", value: loading ? "..." : users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Active Mentors", value: loading ? "..." : mentorsCount, icon: MonitorPlay, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Listed Institutes", value: "8,920", icon: Building, color: "text-amber-600", bg: "bg-amber-50" },
          { title: "Platform Traffic", value: "450k/mo", icon: Activity, color: "text-green-600", bg: "bg-green-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
               <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-800">Recent User Registrations</h2>
              <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="text-gray-500 border-b border-gray-100">
                 <tr>
                   <th className="pb-3 font-medium">Name</th>
                   <th className="pb-3 font-medium">Email</th>
                   <th className="pb-3 font-medium">Role</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {loading ? (
                   <tr><td colSpan={3} className="py-4 text-center text-gray-500">Loading...</td></tr>
                 ) : users.slice(0, 10).map(user => (
                   <tr key={user.id}>
                     <td className="py-3 text-gray-800 font-medium">{user.name}</td>
                     <td className="py-3 text-gray-500 truncate max-w-[150px]">{user.email}</td>
                     <td className="py-3">
                        <select 
                          className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1.5"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={updatingId === user.id}
                        >
                          <option value="student">Student</option>
                          <option value="mentor">Mentor</option>
                        </select>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>

         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <h2 className="font-bold text-gray-800 mb-6">System Management</h2>
           <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                <h3 className="font-semibold text-gray-800 text-sm">Manage Users</h3>
             </div>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer text-center">
                <MonitorPlay className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                <h3 className="font-semibold text-gray-800 text-sm">Mentor Approvals</h3>
             </div>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer text-center">
                <Building className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                <h3 className="font-semibold text-gray-800 text-sm">Manage Institutes</h3>
             </div>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                <h3 className="font-semibold text-gray-800 text-sm">View Analytics</h3>
             </div>
           </div>
         </div>
      </div>
    </MainLayout>
  );
}
