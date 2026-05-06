import { useEffect, useState } from 'react';
import { getDashboard } from '../api/taskApi';
import StatsCard from '../components/dashboard/StatsCard';
import RecentTasks from '../components/dashboard/RecentTasks';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const { stats, recentTasks, overdueTasks } = data || {};

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatsCard title="Total Tasks" value={stats?.total || 0} color="text-blue-600" />
        <StatsCard title="Todo" value={stats?.todo || 0} color="text-yellow-600" />
        <StatsCard title="Doing" value={stats?.doing || 0} color="text-purple-600" />
        <StatsCard title="Done" value={stats?.done || 0} color="text-green-600" />
        <StatsCard title="Overdue" value={stats?.overdue || 0} color="text-red-600" />
      </div>

      {overdueTasks?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-red-600">⚠️ Overdue Tasks</h2>
          <div className="bg-red-50 p-4 rounded">
            {overdueTasks.map((task) => (
              <div key={task._id} className="border-b py-2">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-3">Recent Tasks</h2>
        <RecentTasks tasks={recentTasks} />
      </div>
    </div>
  );
}