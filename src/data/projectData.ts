export interface ProjectLink {
  name: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: "Game" | "Services" | "Engineering"; // 카테고리 타입 지정
  role: string;
  year: string;
  images: string[];
  description: string;
  tags: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  // 🎮 Game Projects
  {
    id: "project-mt",
    title: "Project MT",
    category: "Game",
    role: "Solo Developer (Art/Prog/Plan)",
    year: "2025",
    images: ["/images/project_mt/main.png"], // 이미지 경로에 파일을 넣어주세요!
    description:
      "미소녀 캐릭터가 돈을 벌기 위해 고군분투하는 모습을 담은 서브컬처 타이쿤 시뮬레이션 게임입니다.\n" +
      "Unity에서 Godot Engine 4로 마이그레이션을 진행하며, 더욱 가볍고 효율적인 구조로 개발하고 있습니다.\n" +
      "캐릭터 설정, 스토리, UI/UX, 프로그래밍까지 1인 개발로 진행 중인 메인 프로젝트입니다.",
    tags: ["Godot Engine", "GDScript", "Tycoon", "Solo Dev"],
    links: [],
  },
  {
    id: "voice-rigs",
    title: "Voice Rigs (EDY)",
    category: "Game",
    role: "Lead Developer",
    year: "2024",
    images: ["/images/voice_rigs/ingame.png"],
    description:
      "마이크 입력(소리 크기)으로 가속하고, 게임패드 스틱으로 조향하는 독특한 조작 방식의 레이싱 게임입니다.\n" +
      "KAIST 게임 제작 동아리 '하제' 게임잼에서 3위를 기록했습니다.\n" +
      "'스텔라 블레이드'의 햅틱 피드백에서 영감을 받아, 속도에 따른 진동 기능을 구현해 타격감을 높였습니다.",
    tags: ["Unity 3D", "Experimental", "Game Jam"],
    links: [],
  },
  {
    id: "pmm-intern",
    title: "Private Military Manager",
    category: "Game",
    role: "Client Programmer Intern",
    year: "2024-2025",
    images: ["/images/5minlab/pmm.png"],
    description:
      "KRAFTON 산하 5minlab 인턴십 기간 동안 개발에 참여한 언리얼 엔진 기반 탑뷰 시뮬레이션 게임입니다.\n" +
      "대규모 파티클 최적화, 맵 로딩 시스템 개선, 그리고 UI 시스템의 구조적 문제를 해결하며 퍼포먼스를 향상시켰습니다.",
    tags: ["Unreal Engine 5", "C++", "Optimization", "Internship"],
    links: [
       { name: "5minlab", url: "https://www.5minlab.com/" }
    ],
  },
  {
    id: "natural-selection",
    title: "Natural Selection Sim",
    category: "Game",
    role: "Solo Developer",
    year: "2022",
    images: ["/images/natural_selection/sim_view.png"],
    description:
      "생물학의 자연선택설(진화론)을 시각적으로 이해할 수 있도록 만든 시뮬레이터입니다.\n" +
      "피식자와 포식자의 상호작용, 안전 구역 설정 등 다양한 변인을 조절하여 진화 과정을 관찰할 수 있습니다.",
    tags: ["Unity 3D", "C#", "Simulation", "Educational"],
    links: [
      {
        name: "GitHub Release",
        url: "https://github.com/oRE-o/oREo-Natural-Selection-Simulator",
      },
    ],
  },

  // 🌐 Services Projects
  {
    id: "sparcs-clubs",
    title: "SPARCS Clubs",
    category: "Services",
    role: "Backend Developer",
    year: "2024",
    images: ["/images/sparcs_clubs/main.png"],
    description:
      "KAIST 학부 동아리연합회 통합 플랫폼 'Clubs'의 백엔드를 개발했습니다.\n" +
      "복잡한 동아리 등록 절차와 의결기구 회의(안건/투표) 시스템을 디지털화하여 행정 효율을 극대화했습니다.\n" +
      "NestJS와 drizzleORM을 도입해 안정적이고 타입 안전한 API 서버를 구축했습니다.",
    tags: ["NestJS", "TypeScript", "MySQL", "DrizzleORM"],
    links: [
      { name: "Service Link", url: "https://clubs.sparcs.org" },
      { name: "GitHub", url: "https://github.com/academic-relations/ar-002-clubs" },
    ],
  },
  {
    id: "kaist-taxi",
    title: "KAIST Taxi",
    category: "Services",
    role: "Frontend Developer",
    year: "2025",
    images: ["/images/taxi/statistics.png"],
    description:
      "KAIST 구성원을 위한 택시 합승 매칭 서비스 'Taxi'의 프론트엔드 개발을 담당했습니다.\n" +
      "SPARCS x 토스뱅크 해커톤에서 'Taxi Statistics(사용자 절약 금액 통계)' 기능을 개발하여 1위를 수상했습니다.",
    tags: ["React", "TypeScript", "Data Visualization", "Hackathon Winner"],
    links: [
      { name: "Service Link", url: "https://taxi.sparcs.org" },
    ],
  },
  {
    id: "mannayo",
    title: "Mannayo",
    category: "Services",
    role: "Full Stack Developer",
    year: "2024",
    images: ["/images/mannayo/main.png"],
    description:
      "대학생들의 새로운 만남과 파티 문화를 위한 매칭 플랫폼입니다.\n" +
      "기획부터 디자인, DB 설계, 프론트/백엔드 개발까지 웹 서비스의 전 과정을 1인으로 수행하며 풀스택 역량을 길렀습니다.",
    tags: ["React", "Express", "Prisma", "MySQL"],
    links: [
      { name: "GitHub", url: "https://github.com/oRE-o/Mannayo-KAIST" },
    ],
  },

  // ⚙️ Engineering (Nerd Aesthetics!)
  {
    id: "purin-keyboard",
    title: "Purin Keyboard",
    category: "Engineering",
    role: "Hardware Engineer",
    year: "2023",
    images: ["/images/purin/keyboard.jpg"],
    description:
      "인체공학적 Alice 배열을 적용한 커스텀 기계식 키보드 'Purin'을 직접 설계하고 제작했습니다.\n" +
      "PCB 회로 설계부터 하우징 디자인, QMK 펌웨어 포팅까지 수행했으며, 공식 QMK 저장소에 기여(Contribute)되었습니다.",
    tags: ["PCB Design", "QMK Firmware", "C", "Hardware"],
    links: [
      { name: "Firmware Repo", url: "https://github.com/qmk/qmk_firmware/tree/master/keyboards/purin" },
       { name: "PCB Repo", url: "https://github.com/oRE-o/Purin_PCB" },
    ],
  },
];