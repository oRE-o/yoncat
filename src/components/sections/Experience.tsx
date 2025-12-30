import { experiences } from "../../data/experienceData"; // 데이터 경로 확인!

const Experience = () => {
  return (
    <section className="relative">
      {/* 1. 타임라인 수직선 (왼쪽 배치) */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-pink-500 to-transparent opacity-30"></div>

      <div className="space-y-16">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-12 md:pl-16 group">
            {/* 2. 타임라인 점 (Dot) */}
            {/* 평소엔 빈 원, 호버하면 꽉 찬 핑크색 원으로 변신! */}
            <div className="absolute left-[11px] top-2 w-4 h-4 rounded-full border-2 border-pink-500 bg-black group-hover:bg-pink-500 transition-colors duration-300 shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10"></div>

            {/* 3. 내용 컨텐츠 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-pink-200 transition-colors">
                {exp.role}
              </h3>
              <span className="text-sm font-mono text-gray-400 mt-1 sm:mt-0 border border-white/10 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
                {exp.period}
              </span>
            </div>

            <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-4 w-fit">
              @ {exp.company}
            </h4>

            <p className="text-gray-300 leading-relaxed text-lg font-light max-w-3xl">
              {exp.description}
            </p>

            {/* (선택사항) 호버 시 살짝 빛나는 배경 효과 */}
            <div className="absolute inset-0 -left-4 -right-4 -z-10 bg-white/5 opacity-0 rounded-2xl group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
