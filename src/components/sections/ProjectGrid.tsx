import { useState } from "react";
import { projects } from "../../data/projectData"; 
import { Link } from "react-router-dom";

const ProjectGrid = () => {
  // 필터 기능을 위한 심플한 상태 관리 (선택 사항이지만 있으면 좋아!)
  const [filter, setFilter] = useState("All");

  // 선택된 필터에 따라 프로젝트 걸러내기
  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    // 데이터의 category나 tags에 해당 필터 키워드가 포함되어 있는지 확인
    return (
      project.category.includes(filter) || 
      project.tags.some(tag => tag.includes(filter))
    );
  });

  return (
    <section>
      {/* 1. 헤더 영역 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
        
        {/* 타이틀: Creations -> Selected Works (개발자 느낌 물씬!) */}
        <h2 className="text-3xl md:text-5xl font-black max-w-xl leading-tight tracking-tight">
          Selected <span className="text-gray-500">Works</span>
        </h2>

        {/* 필터 버튼: Game / Services로 변경 */}
        <div className="flex flex-wrap gap-2">
          {["All", "Game", "Services"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all border border-white/5 backdrop-blur-sm
                ${filter === category 
                  ? "bg-white text-black shadow-lg scale-105" 
                  : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 그리드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {filteredProjects.map((project) => {
          // 이미지 경로 처리
          const thumbnail =
            project.images && project.images.length > 0
              ? project.images[0].replace(/\\/g, "/")
              : "";

          return (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="group block"
            >
              {/* 카드 컨테이너 */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 border border-white/10 shadow-lg">
                
                {/* 이미지 배경 */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black group-hover:scale-105 transition-transform duration-700 ease-out">
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                </div>

                {/* 텍스트 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  
                  {/* 카테고리 (Game / Service 등) - 핑크색 포인트 */}
                  <span className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">
                    {project.category} 
                  </span>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white leading-tight">
                    {project.title}
                  </h3>

                  <div className="flex justify-between items-end">
                    {/* 태그 정보 */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags && project.tags.length > 0 && (
                        <span className="text-gray-200 text-xs md:text-sm font-medium bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                          #{project.tags[0]}
                        </span>
                      )}
                    </div>

                    {/* 화살표 버튼 */}
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectGrid;