import TaskCard from './TaskCard';

export default function TaskList({ tasks, onTaskUpdate }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500 text-center py-4">No tasks yet</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onTaskUpdate={onTaskUpdate} />
      ))}
    </div>
  );
}