import Experience from "../components/sections/Experience";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 animate-fade-in">
      {/* 페이지 타이틀 */}
      <div className="mb-20 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Me
          </span>
        </h1>

        <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6 font-light">
          <p>
            저는{" "}
            <strong className="text-white font-medium">
              상상을 현실로 구현하는 것
            </strong>
            에 몰두하는 소프트웨어 엔지니어입니다. 논리적인 코드로 감성적인
            경험을 설계하는 과정 자체를 사랑합니다.
          </p>

          <p>
            <strong className="text-emerald-400">Game Development</strong>{" "}
            분야에서는 플레이어에게 깊은 몰입감을 주는 인터랙션과 연출을
            고민합니다. Unity와 Godot 엔진을 활용해 다양한 장르의 게임을
            기획·개발해왔으며,
            <span className="text-white/80"> 5minlab 인턴십</span>과{" "}
            <span className="text-white/80">KAIST 하제(HAJE)</span> 활동을 통해
            현업 파이프라인과 협업의 가치를 배웠습니다.
          </p>

          <p>
            <strong className="text-emerald-400">Web & Service</strong> 분야에서는
            사용자에게 실질적인 가치를 전달하는 안정적인 시스템을 구축합니다.
            <span className="text-white/80"> SPARCS</span> 활동을 통해 기획부터
            배포까지 서비스의 전 주기를 경험하며, 단단하고 확장 가능한
            아키텍처를 설계하는 역량을 키우고 있습니다.
          </p>

          <p>
            단순한 기술의 나열보다는, 기술이 만들어낼 수 있는{" "}
            <strong className="text-white font-medium">
              "즐거움"과 "유용함"
            </strong>
            에 집중합니다. 제가 지금까지 치열하게 고민하고 만들어온 결과물들은{" "}
            <Link
              to="/projects"
              className="text-emerald-400 hover:text-teal-300 font-bold underline underline-offset-4 transition-colors"
            >
              Projects
            </Link>{" "}
            탭에서 직접 확인해보실 수 있습니다.
          </p>
        </div>
      </div>

      {/* 경력 섹션 (Experience Component) */}
      <Experience />
    </div>
  );
};

export default About;
