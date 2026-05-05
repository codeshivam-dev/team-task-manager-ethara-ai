import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, addMember } from '../api/projectApi';
import { createTask, getTasksByProject } from '../api/taskApi';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        getProjectById(id),
        getTasksByProject(id)
      ]);
      setProject(projectRes.data.project);
      setTasks(tasksRes.data);
    } catch (err) {
      toast.error('Failed to load project');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const res = await createTask(id, taskData);
      setTasks([res.data, ...tasks]);
      setShowTaskForm(false);
      toast.success('Task added');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const handleTaskUpdate = (taskId, newStatus, isDelete = false) => {
    if (isDelete) {
      setTasks(tasks.filter(t => t._id !== taskId));
    } else {
      setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      // Note: This would need a backend endpoint to get user by email
      // For now, just show a message
      toast.error('Add member by user ID (check backend endpoint)');
    } catch (err) {
      toast.error('Failed to add member');
    }
  };

  if (loading) return <LoadingSpinner />;

  const isAdmin = user?.role === 'admin';

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate('/projects')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Projects
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
        <p className="text-gray-600 mb-4">{project?.description}</p>
        
        {isAdmin && (
          <div className="border-t pt-4 mt-2">
            <h3 className="font-bold mb-2">Project Members</h3>
            <div className="flex gap-2 flex-wrap mb-3">
              {project?.members?.map((member) => (
                <span key={member._id} className="bg-gray-200 px-2 py-1 rounded text-sm">
                  {member.name}
                </span>
              ))}
            </div>
            <form onSubmit={handleAddMember} className="flex gap-2">
              <input
                type="email"
                placeholder="Member email"
                className="border rounded px-2 py-1 text-sm flex-1"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
              />
              <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Add Member
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          onClick={() => setShowTaskForm(!showTaskForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {showTaskForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowTaskForm(false)}
          projectMembers={project?.members}
        />
      )}

      <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} />
    </div>
  );
}