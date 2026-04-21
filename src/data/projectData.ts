import type { LocalizedText } from "./i18n";

export interface ProjectLink {
  name: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: "Game" | "Services" | "Engineering";
  role: string;
  year: string;
  images: string[];
  description: LocalizedText;
  tags: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  // Game Projects
  {
    id: "project-mt",
    title: "Project MT",
    category: "Game",
    role: "Solo Developer (Art/Prog/Plan)",
    year: "2025",
    images: ["/images/project_mt/main.png"],
    description: {
      kr:
        "미소녀 캐릭터가 돈을 벌기 위해 고군분투하는 모습을 담은 서브컬처 타이쿤 시뮬레이션 게임입니다.\n" +
        "Unity에서 Godot Engine 4로 마이그레이션을 진행하며, 더욱 가볍고 효율적인 구조로 개발하고 있습니다.\n" +
        "캐릭터 설정, 스토리, UI/UX, 프로그래밍까지 1인 개발로 진행 중인 메인 프로젝트입니다.",
      en:
        "A subculture tycoon simulation game about a girl working hard to earn money.\n" +
        "Currently migrating from Unity to Godot Engine 4 for a lighter, leaner build.\n" +
        "Character design, story, UI/UX, and programming are all handled solo — this is my main personal project.",
      jp:
        "美少女キャラが生活費を稼ぐために奮闘するサブカル風タイクーンシミュレーションゲームです。\n" +
        "UnityからGodot Engine 4へ移行し、より軽量で効率的な構造で開発しています。\n" +
        "キャラクター設定、ストーリー、UI/UX、プログラミングまで一人で進めているメインプロジェクトです。",
    },
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
    description: {
      kr:
        "마이크 입력(소리 크기)으로 가속하고, 게임패드 스틱으로 조향하는 독특한 조작 방식의 레이싱 게임입니다.\n" +
        "KAIST 게임 제작 동아리 '하제' 게임잼에서 3위를 기록했습니다.\n" +
        "'스텔라 블레이드'의 햅틱 피드백에서 영감을 받아, 속도에 따른 진동 기능을 구현해 타격감을 높였습니다.",
      en:
        "A racing game with an unusual control scheme: voice volume accelerates, a gamepad stick steers.\n" +
        "Placed 3rd at KAIST's HAJE game jam.\n" +
        "Inspired by Stellar Blade's haptic feedback, the vibration intensity scales with speed for a tactile sense of momentum.",
      jp:
        "マイクの音量で加速し、ゲームパッドのスティックで操舵する独特な操作のレーシングゲームです。\n" +
        "KAISTゲーム制作サークル「ハジェ」のゲームジャムで3位を獲得しました。\n" +
        "「ステラブレイド」のハプティクスに着想を得て、速度に応じた振動で手触りを強化しました。",
    },
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
    description: {
      kr:
        "KRAFTON 산하 5minlab 인턴십 기간 동안 개발에 참여한 언리얼 엔진 기반 탑뷰 시뮬레이션 게임입니다.\n" +
        "대규모 파티클 최적화, 맵 로딩 시스템 개선, 그리고 UI 시스템의 구조적 문제를 해결하며 퍼포먼스를 향상시켰습니다.",
      en:
        "An Unreal-based top-down simulation game I contributed to during my internship at 5minlab (KRAFTON).\n" +
        "Worked on large-scale particle optimization, map-loading improvements, and untangling structural issues in the UI system to raise overall performance.",
      jp:
        "KRAFTON傘下の5minlabでのインターン期間中に開発に携わった、Unrealベースのトップビューシミュレーションゲームです。\n" +
        "大規模なパーティクル最適化、マップロードの改善、UIシステムの構造的問題の解消などに取り組み、全体のパフォーマンスを改善しました。",
    },
    tags: ["Unreal Engine 5", "C++", "Optimization", "Internship"],
    links: [{ name: "5minlab", url: "https://www.5minlab.com/" }],
  },
  {
    id: "natural-selection",
    title: "Natural Selection Sim",
    category: "Game",
    role: "Solo Developer",
    year: "2022",
    images: ["/images/natural_selection/sim_view.png"],
    description: {
      kr:
        "생물학의 자연선택설(진화론)을 시각적으로 이해할 수 있도록 만든 시뮬레이터입니다.\n" +
        "피식자와 포식자의 상호작용, 안전 구역 설정 등 다양한 변인을 조절하여 진화 과정을 관찰할 수 있습니다.",
      en:
        "A simulator built to make natural selection and evolution easier to grasp visually.\n" +
        "Lets you tune predator/prey interactions, safe zones, and other variables to watch evolution play out.",
      jp:
        "生物学における自然選択(進化論)を視覚的に理解できるよう作ったシミュレーターです。\n" +
        "被食者と捕食者の相互作用や安全地帯の設定など、様々な変数を調整して進化の過程を観察できます。",
    },
    tags: ["Unity 3D", "C#", "Simulation", "Educational"],
    links: [
      {
        name: "GitHub Release",
        url: "https://github.com/oRE-o/oREo-Natural-Selection-Simulator",
      },
    ],
  },

  // Services Projects
  {
    id: "sparcs-clubs",
    title: "SPARCS Clubs",
    category: "Services",
    role: "Backend Developer",
    year: "2024",
    images: ["/images/sparcs_clubs/main.png"],
    description: {
      kr:
        "KAIST 학부 동아리연합회 통합 플랫폼 'Clubs'의 백엔드를 개발했습니다.\n" +
        "복잡한 동아리 등록 절차와 의결기구 회의(안건/투표) 시스템을 디지털화하여 행정 효율을 극대화했습니다.\n" +
        "NestJS와 drizzleORM을 도입해 안정적이고 타입 안전한 API 서버를 구축했습니다.",
      en:
        "Built the backend for 'Clubs', KAIST's unified undergraduate club federation platform.\n" +
        "Digitized complex registration flows and deliberative council systems (agendas, voting) to dramatically streamline administration.\n" +
        "Introduced NestJS and drizzleORM to deliver a stable, type-safe API server.",
      jp:
        "KAIST学部サークル連合会の統合プラットフォーム「Clubs」のバックエンドを開発しました。\n" +
        "複雑なサークル登録手続きや議決機関の会議(議題・投票)システムをデジタル化し、事務の効率を大きく向上させました。\n" +
        "NestJSとdrizzleORMを採用し、安定かつ型安全なAPIサーバーを構築しました。",
    },
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
    description: {
      kr:
        "KAIST 구성원을 위한 택시 합승 매칭 서비스 'Taxi'의 프론트엔드 개발을 담당했습니다.\n" +
        "SPARCS x 토스뱅크 해커톤에서 'Taxi Statistics(사용자 절약 금액 통계)' 기능을 개발하여 1위를 수상했습니다.",
      en:
        "Led frontend work on 'Taxi', a ride-sharing matcher for KAIST members.\n" +
        "Won 1st place at the SPARCS x Toss Bank hackathon with a 'Taxi Statistics' feature that surfaces user savings over time.",
      jp:
        "KAIST構成員向けのタクシー相乗りマッチングサービス「Taxi」のフロントエンド開発を担当しました。\n" +
        "SPARCS × Tossバンクのハッカソンで「Taxi Statistics(節約金額の統計)」機能を開発し、1位を獲得しました。",
    },
    tags: ["React", "TypeScript", "Data Visualization", "Hackathon Winner"],
    links: [{ name: "Service Link", url: "https://taxi.sparcs.org" }],
  },
  {
    id: "mannayo",
    title: "Mannayo",
    category: "Services",
    role: "Full Stack Developer",
    year: "2024",
    images: ["/images/mannayo/main.png"],
    description: {
      kr:
        "대학생들의 새로운 만남과 파티 문화를 위한 매칭 플랫폼입니다.\n" +
        "기획부터 디자인, DB 설계, 프론트/백엔드 개발까지 웹 서비스의 전 과정을 1인으로 수행하며 풀스택 역량을 길렀습니다.",
      en:
        "A matching platform for college meetups and party culture.\n" +
        "Carried the whole thing solo — from planning and design to schema, frontend, and backend — which pushed my full-stack chops forward.",
      jp:
        "大学生の新しい出会いやパーティ文化のためのマッチングプラットフォームです。\n" +
        "企画・デザイン・DB設計・フロント/バックエンド開発までWebサービス全工程を一人で担い、フルスタック力を養いました。",
    },
    tags: ["React", "Express", "Prisma", "MySQL"],
    links: [{ name: "GitHub", url: "https://github.com/oRE-o/Mannayo-KAIST" }],
  },

  // Engineering
  {
    id: "purin-keyboard",
    title: "Purin Keyboard",
    category: "Engineering",
    role: "Hardware Engineer",
    year: "2023",
    images: ["/images/purin/keyboard.jpg"],
    description: {
      kr:
        "인체공학적 Alice 배열을 적용한 커스텀 기계식 키보드 'Purin'을 직접 설계하고 제작했습니다.\n" +
        "PCB 회로 설계부터 하우징 디자인, QMK 펌웨어 포팅까지 수행했으며, 공식 QMK 저장소에 기여(Contribute)되었습니다.",
      en:
        "Designed and built 'Purin', a custom mechanical keyboard with an ergonomic Alice layout.\n" +
        "Did the PCB, housing, and QMK firmware port myself — the firmware was later merged into the official QMK repository.",
      jp:
        "人間工学的なAliceレイアウトを採用したカスタム機械式キーボード「Purin」を自作しました。\n" +
        "PCB設計、筐体デザイン、QMKファームウェアの移植まで自分で行い、公式QMKリポジトリにコントリビュートされました。",
    },
    tags: ["PCB Design", "QMK Firmware", "C", "Hardware"],
    links: [
      { name: "Firmware Repo", url: "https://github.com/qmk/qmk_firmware/tree/master/keyboards/purin" },
      { name: "PCB Repo", url: "https://github.com/oRE-o/Purin_PCB" },
    ],
  },
];
