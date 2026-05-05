import { useState } from 'react';

export default function TaskForm({ onSubmit, onCancel, projectMembers }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, assignedTo: assignedTo || undefined });
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mb-4">
      <input
        type="text"
        placeholder="Task Title"
        className="w-full p-2 border rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="2"
      />
      <input
        type="date"
        className="w-full p-2 border rounded mb-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select
        className="w-full p-2 border rounded mb-2"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Assign to (optional)</option>
        {projectMembers?.map((member) => (
          <option key={member._id} value={member._id}>{member.name}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Add Task</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}