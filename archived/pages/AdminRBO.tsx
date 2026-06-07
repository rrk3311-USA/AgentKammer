import { useState, useEffect } from "react";
import { useLocation } from "wouter";

interface RBOProfile {
  id: string;
  phone: string;
  priceRange?: string | null;
  downPayment?: string | null;
  creditBand?: string | null;
  targetCities?: string[] | null;
  monthlyComfort?: string | null;
  estimatedSavings?: number | null;
  leadScore?: number | null;
  createdAt: string;
}

export default function AdminRBO() {
  const [, setLocation] = useLocation();
  const [profiles, setProfiles] = useState<RBOProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phoneFilter, setPhoneFilter] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<RBOProfile[]>([]);

  useEffect(() => {
    loadProfiles();
  }, []);

  useEffect(() => {
    const filtered = profiles.filter((p) => {
      const cleanPhone = p.phone.replace(/\D/g, "");
      const cleanFilter = phoneFilter.replace(/\D/g, "");
      return cleanPhone.includes(cleanFilter);
    });
    setFilteredProfiles(filtered);
  }, [profiles, phoneFilter]);

  async function loadProfiles() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/rbo-profiles", {
        headers: {
          "Authorization": `Basic ${btoa(`${localStorage.getItem("admin_user") || ""}:${localStorage.getItem("admin_pass") || ""}`)}`
        }
      });

      if (res.status === 401) {
        const user = prompt("Admin username:");
        if (!user) return setLocation("/");
        const pass = prompt("Admin password:");
        if (!pass) return setLocation("/");
        
        localStorage.setItem("admin_user", user);
        localStorage.setItem("admin_pass", pass);
        loadProfiles();
        return;
      }

      if (!res.ok) throw new Error("Failed to load profiles");

      const data = await res.json();
      if (data.ok && data.profiles) {
        setProfiles(data.profiles.sort((a: RBOProfile, b: RBOProfile) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading profiles");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">RBO Admin Dashboard</h1>
        <p className="text-purple-200 mb-6">
          Reverse Buyer Origination Leads - Sorted newest first
        </p>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-4 flex-wrap items-end">
          <div>
            <label className="block text-sm text-purple-200 mb-2">Search Phone</label>
            <input
              type="text"
              placeholder="Enter digits"
              value={phoneFilter}
              onChange={(e) => setPhoneFilter(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-purple-500/30 rounded text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={loadProfiles}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition"
          >
            Refresh
          </button>
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="text-center text-purple-300 py-8">
            {profiles.length === 0
              ? "No profiles found yet."
              : "No profiles match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-500/30 bg-slate-900/50">
                  <th className="px-4 py-3 text-left font-semibold text-purple-300">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-300">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-300">
                    Price Range
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-300">
                    Target Cities
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-300">
                    Lead Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile, idx) => (
                  <tr
                    key={profile.id}
                    className={`border-b border-purple-500/10 ${
                      idx % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"
                    } hover:bg-slate-800/50 transition`}
                  >
                    <td className="px-4 py-3 text-purple-300">
                      {new Date(profile.createdAt).toLocaleDateString()} {new Date(profile.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 text-white font-mono">
                      {profile.phone}
                    </td>
                    <td className="px-4 py-3 text-purple-200">
                      {profile.priceRange || "—"}
                    </td>
                    <td className="px-4 py-3 text-purple-200">
                      {profile.targetCities?.join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-purple-200">
                      {profile.leadScore || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-sm text-purple-300">
          Total profiles: {profiles.length} {phoneFilter && `(${filteredProfiles.length} shown)`}
        </div>
      </div>
    </div>
  );
}
