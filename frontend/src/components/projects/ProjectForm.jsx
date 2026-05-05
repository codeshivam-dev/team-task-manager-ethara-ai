import { useState } from 'react';

export default function ProjectForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mb-4">
      <input
        type="text"
        placeholder="Project Name"
        className="w-full p-2 border rounded mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="2"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Create</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}