import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projectData"; // 데이터 파일 경로 확인!

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    window.scrollTo(0, 0); // 페이지 들어오면 맨 위로
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Project not found 😢
        </h2>
        <Link
          to="/projects"
          className="text-pink-500 hover:text-pink-400 font-bold underline underline-offset-8 transition-colors"
        >
          Return to Projects
        </Link>
      </div>
    );
  }

  // 이미지 경로 처리 (백슬래시 \ 를 슬래시 / 로 변환하는 안전장치 추가)
  const rawImages = project.images || (project.images ? [project.images] : []);
  const projectImages = rawImages.map((img) => img.replace(/\\/g, "/"));

  const currentImageSrc = projectImages[currentIndex] || "";

  const nextSlide = () => {
    if (projectImages.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevSlide = () => {
    if (projectImages.length <= 1) return;
    setCurrentIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length
    );
  };

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 animate-fade-in text-white">
      {/* 1. 상단 네비게이션 */}
      <div className="mb-8">
        <Link
          to="/projects"
          className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider w-fit"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* 2. 헤더 섹션 */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 border-b border-white/10 pb-12">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tighter">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 font-bold">
            {project.category}
          </p>
        </div>

        {/* 링크 버튼들 (Red-Pink Theme) */}
        <div className="w-full lg:w-auto flex flex-wrap gap-3">
          {project.links?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white/20 text-sm font-bold 
                         hover:bg-white hover:text-black hover:border-white transition-all duration-300 
                         flex items-center gap-2 group backdrop-blur-sm"
            >
              {link.name}
              <span className="text-xs group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 3. 메인 콘텐츠 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
        {/* 왼쪽: 설명 & 스택 */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-pink-500 pl-4">
              Overview
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line font-light">
              {project.description}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-400">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {project.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/5 text-pink-300 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 hover:border-pink-500/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 메타 정보 카드 (Glassmorphism) */}
        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 h-fit backdrop-blur-md">
          <ul className="space-y-8">
            <li>
              <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
                Year
              </span>
              <span className="text-2xl font-bold text-white font-montserrat">
                {project.year}
              </span>
            </li>
            <li>
              <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
                Role
              </span>
              <span className="text-xl font-medium text-white">
                {project.role}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4. 이미지 슬라이더 */}
      {projectImages.length > 0 && (
        <div className="relative group w-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          <div className="aspect-video w-full relative flex items-center justify-center overflow-hidden bg-gray-900">
            {/* 배경 블러 효과 */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentImageSrc}
                alt=""
                className="w-full h-full object-cover filter blur-3xl opacity-50 scale-110"
              />
            </div>

            {/* 메인 이미지 */}
            <img
              src={currentImageSrc}
              alt={`${project.title} preview`}
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
            />
          </div>

          {/* 슬라이드 컨트롤 (이미지 2개 이상일 때만) */}
          {projectImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-pink-600 p-4 rounded-full backdrop-blur-md transition-all text-white z-20 border border-white/10 hover:scale-110"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-pink-600 p-4 rounded-full backdrop-blur-md transition-all text-white z-20 border border-white/10 hover:scale-110"
              >
                →
              </button>

              {/* 페이지네이션 (Pink Dots) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                {projectImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 bg-pink-500"
                        : "w-2.5 bg-gray-500 hover:bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
