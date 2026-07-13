"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { ShieldCheck, Users, BookOpen, Calendar, Folder, Trash2, Plus, Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type TabType = "users" | "scholarships" | "events" | "resources";

export default function AdminDashboard() {
  const { token, user } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    // Only allow admin
    if (!loading && user && user.role !== 'admin') {
      router.push("/");
    }
  }, [user, loading, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/${activeTab}`);
      // APIs return { users: [] }, { scholarships: [] }, etc.
      setData(res.data[activeTab]);
    } catch (error) {
      console.error(`Failed to fetch ${activeTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    setActionLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/${activeTab}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData(); // Refresh list
    } catch (error) {
      console.error(`Failed to delete ${activeTab}:`, error);
      alert("Failed to delete. Make sure you have admin rights.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    setActionLoading(true);
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error("Failed to update role:", error);
      alert("Failed to update role.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/${activeTab}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({});
      setShowForm(false);
      fetchData(); // Refresh list
    } catch (error) {
      console.error(`Failed to create ${activeTab}:`, error);
      alert("Failed to create item.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user || user.role !== 'admin') {
    return (
      <MainLayout>
        <div className="text-center py-20 text-gray-500">Checking permissions...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-indigo-600" /> Admin Control Panel
        </h1>
        <p className="text-gray-600">Manage platform resources and users.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
        {[
          { id: "users", label: "Users", icon: Users },
          { id: "scholarships", label: "Scholarships", icon: BookOpen },
          { id: "events", label: "Events", icon: Calendar },
          { id: "resources", label: "Resources", icon: Folder }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as TabType); setShowForm(false); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium transition-all ${
              activeTab === tab.id 
                ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab} Management</h2>
          {activeTab !== 'users' && (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>

        {/* Create Form */}
        {showForm && activeTab !== 'users' && (
          <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
            <h3 className="font-bold mb-4">Create New {activeTab.slice(0, -1)}</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" name="title" placeholder="Title" onChange={handleInputChange} className="p-2 rounded border" />
                
                {activeTab === 'scholarships' && (
                  <>
                    <input required type="text" name="organization" placeholder="Organization" onChange={handleInputChange} className="p-2 rounded border" />
                    <input type="text" name="amount" placeholder="Amount (e.g. $10,000)" onChange={handleInputChange} className="p-2 rounded border" />
                    <input type="date" name="deadline" onChange={handleInputChange} className="p-2 rounded border" />
                  </>
                )}
                
                {activeTab === 'events' && (
                  <>
                    <input required type="date" name="date" onChange={handleInputChange} className="p-2 rounded border" />
                    <input type="text" name="location" placeholder="Location" onChange={handleInputChange} className="p-2 rounded border" />
                    <select name="type" onChange={handleInputChange} className="p-2 rounded border">
                      <option value="">Select Type</option>
                      <option value="webinar">Webinar</option>
                      <option value="career_fair">Career Fair</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </>
                )}
                
                {activeTab === 'resources' && (
                  <input required type="text" name="category" placeholder="Category" onChange={handleInputChange} className="p-2 rounded border" />
                )}

                <input type="url" name="url" placeholder="URL Link" onChange={handleInputChange} className="p-2 rounded border md:col-span-2" />
                
                <textarea required name="description" placeholder="Description" rows={3} onChange={handleInputChange} className="p-2 rounded border md:col-span-2" />
              </div>
              <button disabled={actionLoading} type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">
                {actionLoading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center p-12 text-indigo-600">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center p-12 text-gray-500">No data found.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="pb-3 font-medium">Title/Name</th>
                  {activeTab === 'users' && <th className="pb-3 font-medium">Email</th>}
                  {activeTab === 'users' && <th className="pb-3 font-medium">Role</th>}
                  {activeTab === 'scholarships' && <th className="pb-3 font-medium">Organization</th>}
                  {activeTab === 'events' && <th className="pb-3 font-medium">Date</th>}
                  {activeTab === 'resources' && <th className="pb-3 font-medium">Category</th>}
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((item: Record<string, any>) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 text-gray-800 font-medium">
                      {activeTab === 'users' ? item.name : item.title}
                    </td>
                    
                    {activeTab === 'users' && <td className="py-4 text-gray-500">{item.email}</td>}
                    
                    {activeTab === 'users' && (
                      <td className="py-4">
                        <select 
                          className="bg-white border border-gray-200 text-gray-700 rounded-lg p-1.5 focus:ring-indigo-500"
                          value={item.role}
                          onChange={(e) => handleRoleChange(item.id, e.target.value)}
                          disabled={actionLoading}
                        >
                          <option value="student">Student</option>
                          <option value="mentor">Mentor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    )}
                    
                    {activeTab === 'scholarships' && <td className="py-4 text-gray-500">{item.organization}</td>}
                    {activeTab === 'events' && <td className="py-4 text-gray-500">{new Date(item.date).toLocaleDateString()}</td>}
                    {activeTab === 'resources' && <td className="py-4 text-gray-500">{item.category}</td>}
                    
                    <td className="py-4 text-right">
                      {activeTab !== 'users' && (
                        <button 
                          onClick={() => handleDelete(item.id)}
                          disabled={actionLoading}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors inline-flex items-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
