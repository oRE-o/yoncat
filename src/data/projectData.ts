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
    id: "peptide",
    title: "Peptide",
    category: "Game",
    role: "PM / Planner / Client / Art",
    year: "2025 — Present",
    images: ["/images/peptide/main.png"],
    description: {
      kr:
        "중앙 방어형 구조와 로그라이크 런 사이클을 결합한 미소녀 타워 디펜스 게임입니다.\n" +
        "기획 총괄, Unity(C#) 클라이언트 개발, 일러스트까지 직접 맡고 있는 가장 큰 개인 프로젝트로,\n" +
        "올라운더 개발자로서 쌓아온 경험을 모아 2인 팀과 함께 군 복무 이후 2년 내 정식 출시를 목표로 개발하고 있습니다.",
      en:
        "A bishōjo tower defense game that fuses a central-defense layout with a roguelike run loop.\n" +
        "I'm running design direction, Unity (C#) client work, and the illustration side myself — this is the most ambitious personal project I'm building right now.\n" +
        "Built as a two-person team, the goal is a proper release within two years (after my mandatory military service), pulling together everything I've learned across planning, engineering, and art.",
      jp:
        "中央防衛型のレイアウトとローグライクなラン構造を組み合わせた美少女タワーディフェンスゲームです。\n" +
        "企画統括、Unity(C#)クライアント開発、イラストまで自ら担当している、現在進行形で最も力を注いでいる個人プロジェクトです。\n" +
        "2人チームで開発しており、兵役後を含む2年以内の正式リリースを目標に、これまで培ってきたオールラウンドな経験を全投入しています。",
    },
    tags: ["Unity", "C#", "Tower Defense", "Roguelike", "All-rounder"],
    links: [],
  },
  {
    id: "eri",
    title: "ERI",
    category: "Game",
    role: "UI / Custom Controller",
    year: "2025 — Present",
    images: ["/images/eri/main.png"],
    description: {
      kr:
        "키보드 넘패드와 마우스를 동시에 사용하는 복합 입력 기반 리듬 액션 게임입니다.\n" +
        "사용자가 즉시 읽을 수 있도록 가독성과 심미성을 동시에 만족하는 UI를 설계·개선하는 일을 맡고 있으며,\n" +
        "전용 물리 컨트롤러의 PCB 설계와 실물 제작, 행사 출품용 홍보물·디자인 검수까지 함께 담당합니다.\n" +
        "Nexon Dream Members 출전을 거쳐 2026년 PlayX4 참가를 준비 중인, 동아리 출시 목표 프로젝트입니다.",
      en:
        "A rhythm-action game that asks the player to play with a numpad and a mouse at the same time, treating the two devices as one composite input surface.\n" +
        "I lead the UI direction — making sure something this dense stays legible and visually distinct — and also design and build the dedicated physical controller (PCB and chassis), plus review the promotional artwork.\n" +
        "After showing at Nexon Dream Members, the team is now preparing the build for PlayX4 2026, aiming for a full release out of HAJE.",
      jp:
        "キーボードのテンキーとマウスを同時に使う、複合入力ベースのリズムアクションゲームです。\n" +
        "情報量が多くても瞬時に読める可読性と美観を両立させるUI設計・改善を担当し、\n" +
        "専用フィジカルコントローラのPCB設計・実機製作、出展用の宣伝物・デザインの検証まで横断的に行っています。\n" +
        "Nexon Dream Membersへの出展を経て、2026年のPlayX4参加を準備中の、サークル発リリースを目標としたプロジェクトです。",
    },
    tags: ["Rhythm Action", "UI", "PCB", "Hardware"],
    links: [],
  },
  {
    id: "project-mt",
    title: "Project MT",
    category: "Game",
    role: "PM / Planner / Client",
    year: "2025 — Present",
    images: ["/images/project_mt/main.png"],
    description: {
      kr:
        "주인공이 다양한 일과 투자수단을 통해 돈을 벌어나가는 시뮬레이션 타이쿤 게임입니다.\n" +
        "2인 팀에서 PM·기획·클라이언트 개발을 맡고 있으며, 기획과 총괄에 좀 더 무게를 둔 프로젝트로 진행하고 있습니다.\n" +
        "현재는 스토리의 큰 줄기를 어느 정도 잡아둔 상태에서 본격적인 UI와 핵심 게임 로직을 만들어 나가는 단계입니다.",
      en:
        "A simulation tycoon where the protagonist grinds through different jobs and investment tools to build wealth.\n" +
        "On this two-person team I cover PM, planning, and client development — the project leans deliberately into the planning and direction side.\n" +
        "The story spine is roughed in; current focus is shipping the proper UI pass and the core game loop on top of it.",
      jp:
        "主人公が様々な仕事や投資手段を通じてお金を稼いでいくシミュレーションタイクーンゲームです。\n" +
        "2人チームでPM・企画・クライアント開発を担当しており、企画と総括寄りの比重で進めているプロジェクトです。\n" +
        "現在はストーリーの大枠を組んだ上で、本格的なUIとコアロジックを作り込んでいる段階です。",
    },
    tags: ["Unity", "C#", "Tycoon", "Simulation"],
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
        "KAIST 게임 제작 동아리 '하제'의 25' 봄 게임잼에서 3위를 기록했습니다.\n" +
        "'스텔라 블레이드'의 햅틱 피드백에서 영감을 받아, 속도에 따른 진동 강도를 구현해 타격감과 몰입감을 끌어올렸습니다.",
      en:
        "A racing game with an unusual control scheme: voice volume accelerates, a gamepad stick steers.\n" +
        "Placed 3rd at HAJE's Spring 2025 game jam.\n" +
        "Inspired by Stellar Blade's haptic feedback, the vibration intensity scales with speed for a tactile sense of momentum.",
      jp:
        "マイクの音量で加速し、ゲームパッドのスティックで操舵する独特な操作のレーシングゲームです。\n" +
        "KAISTゲーム制作サークル「ハジェ」の25年春ゲームジャムで3位を獲得しました。\n" +
        "「ステラブレイド」のハプティクスに着想を得て、速度に応じた振動で手触りと没入感を強化しました。",
    },
    tags: ["Unity 3D", "Experimental", "Game Jam"],
    links: [],
  },
  {
    id: "pmm-intern",
    title: "Private Military Manager",
    category: "Game",
    role: "Client Programmer Intern",
    year: "2024 — 2025",
    images: ["/images/5minlab/pmm.png"],
    description: {
      kr:
        "KRAFTON 산하 5minlab 인턴십 기간 동안 개발에 참여한 언리얼 엔진 기반 탑뷰 시뮬레이션 게임입니다.\n" +
        "Unreal Engine·C++·JS/TS 환경에서 다량 파티클의 최적화와 성능 분석을 진행하고, 맵 로딩 시점의 최적화와 맵 버그를 수정해 전체 퍼포먼스를 끌어올렸습니다.\n" +
        "병행해 <Smash Legends>의 서버·AWS 관련 작업도 보조하며 라이브 서비스 운영 흐름을 가까이서 학습했습니다.",
      en:
        "An Unreal-based top-down simulation game I contributed to during my internship at 5minlab (KRAFTON).\n" +
        "Worked across Unreal Engine, C++, and JS/TS on large-scale particle optimization and profiling, plus map-loading performance and map-bug fixes that lifted overall runtime.\n" +
        "In parallel I supported server and AWS-side tasks on <Smash Legends>, getting a close-range look at live-service operations.",
      jp:
        "KRAFTON傘下の5minlabでのインターン期間中に開発に携わった、Unrealベースのトップビューシミュレーションゲームです。\n" +
        "Unreal Engine・C++・JS/TS環境で大量パーティクルの最適化と性能分析、マップロード時の最適化やマップバグ修正に取り組み、全体のパフォーマンスを改善しました。\n" +
        "並行して〈Smash Legends〉のサーバー・AWS関連業務もサポートし、ライブサービス運用の流れを間近で学びました。",
    },
    tags: ["Unreal Engine", "C++", "JS/TS", "Optimization", "Internship"],
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
        "고등학교 개인 연구로 진행한, 생물학의 자연선택설(진화론)을 시각적으로 이해할 수 있도록 만든 Unity3D 시뮬레이터입니다.\n" +
        "피식자와 포식자의 상호작용, 안전 구역 설정 등 다양한 변인을 조절해 진화 과정을 관찰하도록 설계했고,\n" +
        "1인칭 카메라와 이동, 간단한 UI 기획을 직접 다루며 게임 엔진 기반 시뮬레이션을 처음으로 깊이 있게 다룬 프로젝트입니다.",
      en:
        "A Unity3D simulator I built as an independent high-school research project to make natural selection (evolution) tangible.\n" +
        "You can tweak predator/prey interactions, safe zones, and other variables and watch evolution play out.\n" +
        "Building the first-person camera, movement, and a small UI from scratch was my first real dive into engine-based simulation.",
      jp:
        "高校の個人研究として制作した、生物学における自然選択(進化論)を視覚的に理解できるUnity3Dシミュレーターです。\n" +
        "被食者と捕食者の相互作用や安全地帯の設定など、様々な変数を調整して進化の過程を観察できるよう設計しました。\n" +
        "一人称カメラ・移動・簡単なUI企画まで自ら扱い、エンジンベースのシミュレーションに本格的に取り組んだ最初のプロジェクトです。",
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
    id: "kaist-taxi",
    title: "KAIST Taxi",
    category: "Services",
    role: "Frontend Developer",
    year: "2025 — Present",
    images: ["/images/taxi/statistics.png"],
    description: {
      kr:
        "KAIST 구성원 3,900여 명이 사용하는 택시 동승 매칭 서비스 'Taxi'의 프론트엔드 개발을 담당하고 있습니다.\n" +
        "TypeScript·React·Express 기반의 코드베이스 위에서 동승 서비스가 만들어 낸 절약 효과를 시각화하는 'Taxi Statistics' 기능을 직접 기획·디자인·개발했고,\n" +
        "이 결과물로 토스뱅크 X SPARCS 해커톤에서 1위를 수상했습니다. 이외에도 이벤트 페이지와 다양한 사용자 편의 기능을 함께 개발하고 있습니다.",
      en:
        "Frontend developer on 'Taxi', the ride-sharing matcher used by 3,900+ KAIST members, on a TypeScript / React / Express stack.\n" +
        "Designed, planned, and built the 'Taxi Statistics' feature end-to-end — a dashboard that surfaces how much money the community has collectively saved by ride-sharing — and won 1st place at the Toss Bank × SPARCS hackathon with it.\n" +
        "On the side, I keep shipping event pages and quality-of-life features for the active service.",
      jp:
        "KAIST構成員3,900名以上が利用する相乗りマッチングサービス「Taxi」のフロントエンド開発を担当しています。\n" +
        "TypeScript・React・Expressベースのコードに、相乗りで生まれた節約効果を可視化する「Taxi Statistics」機能を企画・デザイン・開発し、Tossバンク × SPARCSハッカソンで1位を獲得しました。\n" +
        "並行してイベントページや各種ユーザー向け便利機能も継続的に開発しています。",
    },
    tags: ["React", "TypeScript", "Express", "Data Visualization", "Hackathon Winner"],
    links: [
      { name: "Service Link", url: "https://taxi.sparcs.org" },
      { name: "Front Repo", url: "https://github.com/sparcs-kaist/taxi-front" },
      { name: "Back Repo", url: "https://github.com/sparcs-kaist/taxi-back" },
    ],
  },
  {
    id: "sparcs-clubs",
    title: "SPARCS Clubs",
    category: "Services",
    role: "Backend Developer",
    year: "2024",
    images: ["/images/sparcs_clubs/main.png"],
    description: {
      kr:
        "KAIST 학부 동아리연합회 통합 플랫폼 'Clubs'의 백엔드 개발에 참여했습니다.\n" +
        "TypeScript·NestJS·MySQL·drizzleORM·Zod 환경에서 동아리연합회 의결기구 회의의 공지·안건지 작성/조회·투표 기능과 동아리 회원 등록 신청 API를 설계·구현했습니다.\n" +
        "프론트엔드와 긴밀하게 소통하며 DB 스키마부터 API까지 함께 만들었고, 많은 학생들이 사용하는 실서비스 위에서 협업과 안정성에 대한 감각을 키운 시기입니다.",
      en:
        "Contributed to the backend of 'Clubs', KAIST's unified undergraduate club federation platform.\n" +
        "On a TypeScript / NestJS / MySQL / drizzleORM / Zod stack, I designed and implemented the council deliberation flow (notices, agenda authoring, agenda lookup, voting) and the club membership registration APIs.\n" +
        "Worked closely with frontend on schema and API design — a great window into shipping a real campus-scale service while keeping a team-friendly, type-safe surface.",
      jp:
        "KAIST学部サークル連合会の統合プラットフォーム「Clubs」のバックエンド開発に参加しました。\n" +
        "TypeScript・NestJS・MySQL・drizzleORM・Zod環境で、サークル連合会議決機関会議の告知・議題作成/閲覧・投票機能と、サークル会員登録申請APIを設計・実装。\n" +
        "フロントエンドと密に連携してDBスキーマからAPIまでを共に作り上げ、実運用される学内サービス上で協業と安定性の感覚を磨きました。",
    },
    tags: ["NestJS", "TypeScript", "MySQL", "DrizzleORM", "Zod"],
    links: [
      { name: "Service Link", url: "https://clubs.sparcs.org" },
      { name: "GitHub", url: "https://github.com/academic-relations/ar-002-clubs" },
    ],
  },
  {
    id: "unicon-vote",
    title: "UNICON Vote App",
    category: "Services",
    role: "Tech Lead",
    year: "2025",
    images: ["/images/unicon/vote.png"],
    description: {
      kr:
        "전국게임개발동아리연합 UNIDEV의 3rd UNICON(2025.11.01) 행사에서 사용된 팔찌 기반 투표 시스템입니다.\n" +
        "행사팀의 Tech Lead로서 시스템 설계와 제작, 행사 당일 운영 그리고 투표 데이터 분석·시상대 전달까지 총괄했습니다.\n" +
        "행사 종료 후에는 차기 운영진이 그대로 이어 쓸 수 있도록 리디자인·문서화·기능 패치를 이어가며 재사용 가능한 사내 도구로 다듬고 있습니다.",
      en:
        "A wristband-based voting system used at UNIDEV's 3rd UNICON (Nov 1, 2025), the national university game-dev showcase.\n" +
        "As the Tech Lead, I owned the design, fabrication, day-of operation, and the data pipeline that ultimately fed the awards ceremony.\n" +
        "Now I'm redesigning, documenting, and patching it so the next organizing team can pick it up and reuse it as a proper internal tool.",
      jp:
        "全国ゲーム開発サークル連合UNIDEVの3rd UNICON(2025.11.01)で使用されたリストバンド方式の投票システムです。\n" +
        "運営Tech Leadとしてシステム設計・製作・当日の運用・投票データの集計と授賞式への引き渡しまでを統括しました。\n" +
        "行事終了後は次期運営がそのまま再利用できるよう、再設計・ドキュメント化・機能パッチを続け、組織内ツールとして整備中です。",
    },
    tags: ["TypeScript", "React", "Tech Lead", "Event System"],
    links: [
      { name: "UNIDEV", url: "https://www.unidev.kr" },
      { name: "GitHub", url: "https://github.com/oRE-o/unicon-vote-app" },
    ],
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
        "'학생들의 만남을 만들어주는 서비스'라는 아이디어에서 출발한 개인 프로젝트입니다.\n" +
        "JavaScript·Express·React·MySQL+Prisma 스택으로 다양한 종류의 만남(파티)을 생성하고, 장소·시간·연락처를 공유해 커뮤니티를 형성할 수 있는 매칭 플랫폼으로 기획했습니다.\n" +
        "디자인부터 DB 설계, FE/BE 개발까지 1인으로 끝내며 웹 서비스의 전체 흐름을 손에 익힌 첫 풀스택 프로젝트입니다.",
      en:
        "A solo project that started from one idea: a service that helps students actually meet up.\n" +
        "Built on JavaScript / Express / React / MySQL + Prisma, it lets people create different kinds of get-togethers and share location, time, and contact info to form a community around them.\n" +
        "Carrying every layer alone — design, schema, frontend, backend — was my first real end-to-end pass through the full web-service flow.",
      jp:
        "「学生たちの出会いを作るサービス」というアイデアから始めた個人プロジェクトです。\n" +
        "JavaScript・Express・React・MySQL+Prismaで、様々な種類の集まり(パーティ)を作成し、場所・時間・連絡先を共有してコミュニティを形成できるマッチングプラットフォームとして企画しました。\n" +
        "デザインからDB設計、FE/BE開発までを一人で完結させ、Webサービスの全体フローを手に馴染ませた最初のフルスタックプロジェクトです。",
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
        "인체공학적 배열을 직접 설계하고, 그에 상응하는 키보드의 모든 부분을 만들고자 진행한 커스텀 기계식 키보드 'Purin' 프로젝트입니다.\n" +
        "PCB 회로 설계, 하우징 디자인, QMK 펌웨어까지 전 영역을 직접 개발했으며, 결과물은 가장 널리 사용되는 오픈소스 키보드 펌웨어인 QMK Firmware 공식 저장소에 그대로 머지되어 기여(Contribute)되었습니다.",
      en:
        "'Purin' is a custom mechanical keyboard project where I designed an ergonomic layout and then built every layer of the keyboard around it.\n" +
        "I handled the PCB schematic, the housing, and the QMK firmware port end-to-end. The firmware was eventually merged into the official QMK Firmware repository — the most widely used open-source keyboard firmware project.",
      jp:
        "人間工学的なレイアウトを自ら設計し、それに合わせたキーボードのすべてを作ろうとしたカスタム機械式キーボード「Purin」プロジェクトです。\n" +
        "PCB回路設計、筐体デザイン、QMKファームウェアまで全域を自身で開発し、成果物は世界で最も広く使われているオープンソースキーボードファームウェアQMK Firmwareの公式リポジトリにそのままマージされ、コントリビュートされました。",
    },
    tags: ["PCB Design", "QMK Firmware", "C", "Hardware"],
    links: [
      { name: "Firmware Repo", url: "https://github.com/qmk/qmk_firmware/tree/master/keyboards/purin" },
      { name: "PCB Repo", url: "https://github.com/oRE-o/Purin_PCB" },
    ],
  },
  {
    id: "sign-language-translation",
    title: "Sign Language Translation AI",
    category: "Engineering",
    role: "Researcher",
    year: "2021 — 2023",
    images: ["/images/sign_language/main.png"],
    description: {
      kr:
        "고등학교에서 3년간 진행한 자율 연구 프로젝트입니다.\n" +
        "기존 수어 인식 모델이 손의 특징점만으로 단어를 분석해 수지(手指) 신호에 머물러 있다는 점을 보완점으로 잡아, 표정과 같이 언어의 뉘앙스를 전달하는 비수지 신호까지 포함해 수어를 번역하는 딥러닝 모델을 직접 설계·학습시켰습니다.\n" +
        "Python·PyTorch·OpenCV·MediaPipe 환경에서 데이터 수집부터 모델 구성·학습까지 단독으로 진행한 첫 본격적인 연구 경험입니다.",
      en:
        "A three-year self-directed research project I ran during high school.\n" +
        "Existing sign-language recognition models leaned almost entirely on hand keypoints, which limits them to manual signs. I built a deep-learning model that also takes in non-manual signals (facial expressions and the like) — the part of sign language that carries nuance — and trained it to translate signs in that fuller context.\n" +
        "Across Python / PyTorch / OpenCV / MediaPipe, I owned the entire pipeline from data collection through model architecture and training. It was my first serious research project carried alone.",
      jp:
        "高校で3年間進めた自主研究プロジェクトです。\n" +
        "既存の手話認識モデルが手の特徴点のみで単語を分析し、手指(しゅし)動作に留まっている点を補うべく、表情のように言語のニュアンスを伝える非手指動作まで含めて手話を翻訳するディープラーニングモデルを設計・学習させました。\n" +
        "Python・PyTorch・OpenCV・MediaPipe環境でデータ収集からモデル構成・学習までを単独で進めた、初めての本格的な研究経験です。",
    },
    tags: ["Python", "PyTorch", "OpenCV", "MediaPipe", "Research"],
    links: [],
  },
];
