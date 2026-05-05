import StatusBadge from '../tasks/StatusBadge';

export default function RecentTasks({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task._id} className="border p-3 rounded flex justify-between items-center">
          <div>
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-gray-500">Project: {task.projectId?.name}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>
      ))}
    </div>
  );
}