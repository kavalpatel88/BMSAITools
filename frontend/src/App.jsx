import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ProjectDashboard from './pages/ProjectDashboard.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      {/* simple nav */}
      <header className="p-4 bg-blue-600 text-white">
        <Link to="/" className="font-semibold">BMSAITools</Link>
      </header>

      <Routes>
        <Route path="/" element={<ProjectDashboard />} />
        {/* future routes go here */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
