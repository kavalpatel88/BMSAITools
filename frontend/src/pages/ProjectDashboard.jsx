import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);

  useEffect(() => {
    fetch(`${API}/projects`)
      .then(res => res.json())
      .then(setProjects)
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Loading…</p>;
  if (error)   return <p className="p-8 text-red-600">Error: {error.message}</p>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => alert('New Project form coming soon')}
        >
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet.</p>
      ) : (
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.status}</td>
                <td className="p-2 border">
                  {new Date(p.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
