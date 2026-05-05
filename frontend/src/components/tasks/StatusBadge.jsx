const statusColors = {
  todo: 'bg-yellow-200 text-yellow-800',
  doing: 'bg-purple-200 text-purple-800',
  done: 'bg-green-200 text-green-800'
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
}