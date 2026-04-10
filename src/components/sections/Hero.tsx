// src/components/sections/Hero.tsx
import { Link } from "react-router-dom";
import { heroData } from "../../data/heroData";
import { getImagePath } from "../../utils/imageHelper";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden"
    >
      {/* 🌌 배경 이미지 레이어 */}
      <div className="absolute inset-0 p-1 overflow-hidden">
        <img
          src={getImagePath("/images/wallpaper.jpg")}
          alt="Background"
          className="w-full h-full object-cover opacity-30" // 배경이 너무 세지 않게 조절
        />

        {/* 그라데이션 오버레이 (사이드 어둡게 + 하단 연결 자연스럽게) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent via-60% to-black" />
      </div>

      {/* ✨ Glow 효과 (핑크/레드 오로라) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen" />

      {/* 컨텐츠 영역: max-w-7xl로 넓게 잡되 px로 여백 확보 */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-8 max-w-7xl px-6 md:px-12 mx-auto w-full">
        {/* 1. 상태 배지 */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm animate-fade-in hover:bg-white/10 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">
            {heroData.status}
          </span>
          {/* 이미지 없으면 안 보이게 처리 */}
          <img
            src="/LGJLogo.png"
            alt="Icon"
            className="ml-1 w-4 h-4 object-contain opacity-80"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>

        {/* 2. 메인 타이포그래피 (반응형 폰트 사이즈 조절!) */}
        <div className="space-y-2">
          <h2 className="text-gray-400 text-base md:text-xl font-medium tracking-wider uppercase mb-1 md:mb-2">
            {heroData.role}
          </h2>

          <h1 className="font-extrabold leading-[0.9] tracking-tighter">
            {/* 이름: 모바일(5xl) -> 태블릿(7xl) -> 데스크탑(8xl) 
                긴 이름도 한 줄에 나오도록 responsive sizing 적용 */}
            <span className="text-white block text-3xl sm:text-6xl md:text-7xl lg:text-3xl xl:text-7xl break-words">
              {heroData.name}
            </span>

            {/* 서브 타이틀: 핑크-레드 그라데이션 */}
            <span className="block text-2xl sm:text-2xl md:text-4xl font-black mt-3 md:mt-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              {heroData.subTitle}
            </span>
          </h1>
        </div>

        {/* 3. 설명글 (모바일에서는 좀 더 작게) */}
        <p className="text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed drop-shadow-sm">
          {heroData.description}
        </p>

        {/* 4. CTA 버튼 (애니메이션 통일: hover:-translate-y-1) */}
        <div className="flex flex-wrap gap-4 mt-4 md:mt-8">
          {/* Main Button */}
          <Link
            to="/projects"
            className="px-8 py-4 bg-white text-black font-bold rounded-full 
                       hover:bg-emerald-50 transition-all duration-300 transform hover:-translate-y-1 
                       shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-emerald-500/30"
          >
            {heroData.ctaMain}
          </Link>

          {/* Secondary Button */}
          <Link
            to="/contact"
            className="px-8 py-4 border border-white/20 text-white font-bold rounded-full 
                       backdrop-blur-sm hover:bg-white/10 hover:border-white/40
                       transition-all duration-300 transform hover:-translate-y-1"
          >
            {heroData.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
