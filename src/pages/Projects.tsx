import ProjectGrid from "../components/sections/ProjectGrid";

const Projects = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 animate-fade-in">
      <div className="mb-16 border-b border-white/10 pb-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
          Projects
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Check out some of the projects I've been working on.
        </p>
      </div>

      {/* 프로젝트 리스트 컴포넌트 */}
      <ProjectGrid />
    </div>
  );
};

export default Projects;
