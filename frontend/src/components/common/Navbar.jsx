import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Task Manager</Link>
        
        {user && (
          <div className="flex gap-6 items-center">
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/projects" className="hover:text-gray-300">Projects</Link>
            <div className="flex gap-3 items-center">
              <span className="text-sm">
                {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}