import TaskCard from './TaskCard';
import { useAuth } from '../../context/AuthContext';

export default function TaskList({ tasks, onTaskUpdate }) {
  const { loading } = useAuth();

  // Wait for auth hydration
  if (loading) {
    return (
      <div className="text-center py-4 text-gray-500">
        Loading tasks...
      </div>
    );
  }

  // Empty state
  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No tasks yet
      </p>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onTaskUpdate={onTaskUpdate}
        />
      ))}
    </div>
  );
}