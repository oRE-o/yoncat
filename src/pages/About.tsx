import Experience from "../components/sections/Experience"; // (아래에서 컴포넌트 코드 줄게!)
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 animate-fade-in">
      {/* 페이지 타이틀 */}
      <div className="mb-20 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
            Me
          </span>
        </h1>

        <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6 font-light">
          <p>
            저는{" "}
            <strong className="text-white font-medium">로켓 추진 시스템</strong>
            을 중심으로, 아이디어를 실제 시험 가능한 하드웨어로 구현하는데
            관심이 많은 엔지니어입니다.
          </p>
          <p>
            고체 추진에서는 다양한 스케일의 모터를 직접 설계·제작·시험해 왔으며,
            노즐·케이싱 등 구성 요소를 통합적으로 최적화해 성능과 신뢰성을
            끌어올리는 전 주기 개발을 수행합니다.
          </p>
          <p>
            액체 추진에서는 주로 인젝터, 연소기 등 엔진 통합 시스템을 설계해
            왔으며, 현재는{" "}
            <span className="text-pink-400">Additive Manufacturing</span> 기술을
            활용한 소형 Gas-Gas 연소기 및 3kN급 LOX/IPA 연소기를 개발 중입니다.
          </p>
          <p>
            제가 실제로 설계하고 시험한 내용은{" "}
            <Link
              to="/projects"
              className="text-red-400 hover:text-pink-300 font-bold underline underline-offset-4 transition-colors"
            >
              Projects
            </Link>{" "}
            탭에서 확인해보실 수 있습니다.
          </p>
        </div>
      </div>

      {/* 경력 섹션 (Experience Component) */}
      <Experience />
    </div>
  );
};

export default About;
