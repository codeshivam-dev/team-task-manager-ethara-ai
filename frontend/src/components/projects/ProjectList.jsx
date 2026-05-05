import ProjectCard from './ProjectCard';

export default function ProjectList({ projects, onProjectDelete }) {
  if (!projects || projects.length === 0) {
    return <p className="text-gray-500 text-center py-8">No projects yet. Create one!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} onDelete={onProjectDelete} />
      ))}
    </div>
  );
}