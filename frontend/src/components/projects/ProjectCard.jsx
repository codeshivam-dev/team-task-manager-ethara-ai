import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deleteProject } from '../../api/projectApi';
import toast from 'react-hot-toast';

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = async () => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteProject(project._id);
        toast.success('Project deleted');
        onDelete(project._id);
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{project.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(`/projects/${project._id}`)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          View Tasks
        </button>
        {user?.role === 'admin' && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}