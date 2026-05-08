import StatusBadge from './StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { updateTaskStatus, deleteTask } from '../../api/taskApi';
import toast from 'react-hot-toast';

export default function TaskCard({ task, onTaskUpdate }) {
  const { user } = useAuth();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTaskStatus(task._id, newStatus);
      toast.success('Status updated');
      onTaskUpdate(task._id, newStatus);
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      try {
        await deleteTask(task._id);
        toast.success('Task deleted');
        onTaskUpdate(task._id, null, true);
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const canUpdateStatus = task && task.assignedTo?._id === user?.id || user?.role === 'admin';
  // console.log("Bhai ye task : ", task);
  // console.log("Bhai user : ", user)
  console.log("Bhai canUpdateStatus : ", task.assignedTo?._id, " and ", user?.id)

  return (
    <div className="border rounded p-3 mb-2 bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">{task.title}</h4>
          {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
          {task.assignedTo && (
            <p className="text-xs text-gray-500">Assigned to: {task.assignedTo.name}</p>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          {canUpdateStatus && (
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          )}
          {!canUpdateStatus && <StatusBadge status={task.status} />}
          
          {user?.role === 'admin' && (
            <button
              onClick={handleDelete}
              className="text-red-600 text-sm hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}