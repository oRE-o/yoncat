import type { LocalizedText } from "./i18n";
import { shiftUpInternship } from './shiftUpInternship';

/** Broad profession track an entry belongs to; drives grouping in the Experience section. */
export type ExperienceTrack = "developer" | "illustration";

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  /** One-line digest shown in the timeline; keep it to a single sentence. */
  summary: LocalizedText;
  /** Full write-up, kept for detail views or future expansion. */
  description: LocalizedText;
  track: ExperienceTrack;
}

export const experiences: Experience[] = [
  {
    id: 8,
    role: 'PM Intern · GODDESS OF VICTORY: NIKKE',
    company: 'SHIFT UP',
    period: shiftUpInternship.period,
    summary: shiftUpInternship.summary,
    description: shiftUpInternship.description,
    track: 'developer',
  },
  {
    id: 7,
    role: "Illustrator",
    company: "Subculture Doujin Events",
    period: "Jun 2025 — Present",
    summary: {
      kr: "코믹월드, 일러스타페스 등 부스 참가 5회 이상, 2차 창작 일러스트 굿즈 제작/판매",
      en: "5+ artist booths at Comic World and Illustar Festa, producing and selling fan-art goods.",
      jp: "コミックワールド、イラスタフェスなどでブース参加5回以上、二次創作グッズを制作/頒布",
    },
    description: {
      kr: "직접 그린 일러스트로 코믹월드, 일러스타페스 등 국내 서브컬쳐 행사에 5회 이상 작가 부스로 참가하고 있습니다. <블루아카이브>, <하츠네 미쿠> 등 2차 창작 일러스트를 굿즈로 제작/판매하며, 취미였던 일러스트 활동을 좀 더 체계적인 작가 활동으로 확장하고 다른 일러스트레이터들과 교류하고 있습니다.",
      en: "Running an artist booth at Korean subculture events — Comic World, Illustar Festa, and others — with 5+ appearances so far. I produce and sell merchandise based on my own fan illustrations of <Blue Archive>, <Hatsune Miku>, and similar series, treating illustration not as a side hobby but as a parallel creative practice that keeps me connected to a community of artists.",
      jp: "自作イラストでコミックワールド、イラスタフェスなど国内サブカルチャー系イベントに作家ブースとして5回以上参加しています。〈ブルーアーカイブ〉や〈初音ミク〉などの二次創作イラストをグッズ化・頒布しながら、趣味のイラスト活動をより体系的な作家活動へと広げ、他のイラストレーターとの交流も大切にしています。",
    },
    track: "illustration",
  },
  {
    id: 6,
    role: "Tech Lead",
    company: "UNIDEV / 3rd UNICON",
    period: "Mar 2025 — Jan 2026",
    summary: {
      kr: "3rd UNICON 팔찌 기반 투표 시스템 설계/제작, 행사 당일 운영과 집계까지 총괄",
      en: "Designed and built the wristband voting system for 3rd UNICON, running it live on event day.",
      jp: "3rd UNICONのリストバンド式投票システムを設計/製作し、当日の運用と集計まで統括",
    },
    description: {
      kr: "전국게임개발동아리연합 UNIDEV 3기 행사팀의 기술 운영진(Tech Lead)으로 1년간 활동하며, 3rd UNICON(2025.11.01)의 투표 시스템 전반을 총괄했습니다. 부원/외부 관람객이 모두 사용하는 팔찌 기반 투표 시스템을 직접 설계/제작해 행사 당일 안정적으로 운영했고, 투표 데이터를 정리해 시상식에 전달했습니다. 행사 종료 후에는 차기 운영진이 그대로 재사용할 수 있도록 시스템을 리디자인, 문서화, 패치하는 작업을 이어가고 있습니다.",
      en: "Served as Tech Lead on UNIDEV's 3rd organizing team, owning the voting system for 3rd UNICON (Nov 1, 2025). Designed and built a wristband-based voting setup used by both club members and external visitors, ran it live on the day, and handed cleaned results off to the awards crew. Post-event I'm redesigning, documenting, and patching the system so the next organizing team can pick it up as a reusable internal tool.",
      jp: "全国ゲーム開発サークル連合UNIDEV 3期運営チームの技術担当(Tech Lead)として1年間活動し、3rd UNICON(2025.11.01)の投票システム全般を統括しました。部員と外部来場者が共用するリストバンド式投票システムを自ら設計・製作し、当日の安定運用と集計データの授賞式への引き渡しまで担当。終了後は次期運営がそのまま再利用できるよう、再設計・ドキュメント化・パッチ作業を継続しています。",
    },
    track: "developer",
  },
  {
    id: 5,
    role: "Developer Intern",
    company: "5minlab (KRAFTON)",
    period: "Dec 2024 — Feb 2025",
    summary: {
      kr: "<Private Military Manager> 파티클/맵 로딩 최적화, <Smash Legends> 서버/AWS 작업 보조",
      en: "Particle and map-loading optimization on <Private Military Manager>, server/AWS support on <Smash Legends>.",
      jp: "〈Private Military Manager〉のパーティクル/マップ最適化、〈Smash Legends〉のサーバー/AWS業務を補助",
    },
    description: {
      kr: "KRAFTON 산하 독립 스튜디오 5minlab에서 겨울 인턴십을 진행했습니다. <Private Military Manager>(Unreal Engine, C++, JS/TS) 개발에 합류해 다량 파티클의 최적화/성능 분석과 맵 로딩 최적화/버그 수정을 담당했고, <Smash Legends>에서는 서버/AWS 관련 작업을 보조했습니다. 학부 1학년을 마친 시점에 현업 개발 파이프라인과 직군별 협업 흐름을 가까이에서 배운 뜻깊은 시기였습니다.",
      en: "Completed a winter internship at 5minlab, an independent studio under KRAFTON. On <Private Military Manager> (Unreal Engine, C++, JS/TS) I worked on large-scale particle optimization and profiling, plus map-loading performance and bug fixes; on <Smash Legends> I supported server and AWS-side tasks. Right after my freshman year, it was a formative window for seeing how a professional game studio actually splits and ships work.",
      jp: "KRAFTON傘下の独立スタジオ5minlabで冬季インターンを行いました。〈Private Military Manager〉(Unreal Engine、C++、JS/TS)では大量パーティクルの最適化・性能分析や、マップロード時の最適化・バグ修正を担当。〈Smash Legends〉ではサーバー・AWS関連業務をサポートしました。学部1年を終えた時点で、実務開発パイプラインと職種ごとの分担を間近で学んだ大きな経験でした。",
    },
    track: "developer",
  },
  {
    id: 4,
    role: "Frontend / Backend Developer",
    company: "SPARCS (KAIST)",
    period: "Jun 2024 — Present",
    summary: {
      kr: "Clubs 백엔드(NestJS) 설계/구현, Taxi 프론트엔드 개발로 토스뱅크 X SPARCS 해커톤 1위",
      en: "Backend for Clubs (NestJS), then frontend for Taxi — 1st place at the Toss Bank X SPARCS hackathon.",
      jp: "ClubsのバックエンドをNestJSで設計/実装、Taxiのフロントエンド開発でハッカソン1位",
    },
    description: {
      kr: "KAIST 학부 총학생회 산하 특별기구 SPARCS에서 두 개의 학내 서비스에 기여했습니다. Clubs(2024.06~2024.12)에서는 NestJS, drizzleORM, MySQL 기반 백엔드를 맡아 동아리연합회 의결기구의 안건/투표 시스템과 동아리 회원 등록 API를 설계/구현했고, Taxi(2025.08~)에서는 프론트엔드 개발자로 참여해 KAIST 구성원 3,900여 명이 사용하는 택시 동승 서비스의 Statistics, 이벤트 페이지, 편의 기능을 만들어 토스뱅크 X SPARCS 해커톤에서 1위를 수상했습니다.",
      en: "Active in SPARCS, KAIST's flagship service-building organization, across two flagship products. On Clubs (Jun–Dec 2024) I owned backend work with NestJS, drizzleORM, and MySQL — designing the council deliberation system (agendas, votes) and club membership registration APIs. On Taxi (Aug 2025 onward) I switched to frontend, shipping the Taxi Statistics dashboard, event pages, and quality-of-life features for a ride-sharing service used by 3,900+ KAIST members. The Statistics build won 1st place at the Toss Bank × SPARCS hackathon.",
      jp: "KAISTを代表するサービス開発団体SPARCSで、2つの学内プロダクトに携わりました。Clubs(2024.06〜2024.12)ではNestJS・drizzleORM・MySQLを用いたバックエンドを担当し、サークル連合会の議決機構(議題・投票)システムやサークル会員登録APIを設計・実装。Taxi(2025.08〜)ではフロントエンドに移り、KAIST構成員3,900名以上が利用する相乗りサービスのStatistics・イベントページ・各種便利機能を開発しました。Statisticsの開発はTossバンク × SPARCSハッカソンで1位を獲得しました。",
    },
    track: "developer",
  },
  {
    id: 3,
    role: "Member / Project Manager",
    company: "HAJE (KAIST Game Dev Club)",
    period: "May 2024 — Present",
    summary: {
      kr: "Unity/Godot 프로젝트와 게임잼 참여, <명랑하제> PM, UNIDEV HAJE 대표자",
      en: "Unity/Godot projects and game jams, PM on <Myeongnang Haje>, HAJE representative in UNIDEV.",
      jp: "Unity/Godotプロジェクトとゲームジャムに参加、〈ミョンランハジェ〉PM、UNIDEV代表者",
    },
    description: {
      kr: "KAIST 게임 제작 동아리 '하제'에서 Unity/Godot 기반 프로젝트와 내부 게임잼에 꾸준히 참여하고 있습니다. 신입생 첫 프로젝트 <명랑하제>에서는 기획 서포트와 PM 역할을 맡아 입문자들의 첫 팀 기반 게임 제작을 멘토링했고, 2025년부터는 전국게임개발동아리연합 UNIDEV에서 HAJE 대표자로 자리하며 동아리 외부 무대로의 연결을 담당하고 있습니다.",
      en: "Building games inside HAJE, KAIST's game development club, with Unity and Godot — both shipping internal jams and supporting newer members. On HAJE's freshman onboarding project <Myeongnang Haje> I served as planning support and project manager, mentoring first-time devs through their first team-based release. Since 2025 I've also represented HAJE inside UNIDEV (the national game-dev club federation), connecting our club to external showcases.",
      jp: "KAISTのゲーム制作サークル「HAJE(ハジェ)」でUnityやGodotを用いたプロジェクト・内部ゲームジャムに継続的に参加しています。新入生の初プロジェクト〈ミョンランハジェ〉では企画サポートとプロジェクトマネージャを担当し、初学者のチーム制作を伴走。2025年からは全国ゲーム開発サークル連合UNIDEVにてHAJE代表者として立ち、サークル外の舞台への接続役も担っています。",
    },
    track: "developer",
  },
  {
    id: 2,
    role: "Undergraduate, School of Computing",
    company: "KAIST",
    period: "Feb 2024 — Present",
    summary: {
      kr: "전산학부 재학, CS 기초를 실사용자 규모의 서비스와 게임 프로젝트로 검증 중",
      en: "School of Computing undergrad, applying CS fundamentals to real services and game projects.",
      jp: "計算機科学部に在学、CSの基礎を実ユーザー規模のサービスとゲーム制作で検証中",
    },
    description: {
      kr: "KAIST 전산학부(School of Computing)에 재학 중입니다. 알고리즘과 시스템 프로그래밍 등 CS 기초를 깊이 있게 학습하면서, 학내 동아리/특별기구 활동을 통해 실제 사용자 규모의 서비스와 게임 프로젝트로 학습 내용을 곧바로 검증해 보고 있습니다.",
      en: "Currently studying at KAIST's School of Computing, going deep into algorithms and systems programming. In parallel, I keep validating what I learn through real services and game projects inside KAIST's clubs and special organizations.",
      jp: "KAIST 計算機科学部に在学中。アルゴリズムやシステムプログラミングなどCSの基礎を深く学びながら、学内サークルや特別機構の活動で実ユーザー規模のサービスやゲーム制作に学んだ内容を即座に持ち込んでいます。",
    },
    track: "developer",
  },
  {
    id: 1,
    role: "Graduate",
    company: "Gyeonggibuk Science High School",
    period: "Mar 2021 — Feb 2024",
    summary: {
      kr: "수어 번역 딥러닝 모델 자율 연구 3년, 자연선택 시뮬레이터/캔위성 등 제작",
      en: "3-year self-directed research on a sign-language translation DL model, plus a natural-selection sim and CanSat.",
      jp: "手話翻訳ディープラーニングモデルを3年間自主研究、自然選択シミュレータや缶サットを制作",
    },
    description: {
      kr: "물리, 공학, 컴퓨터 과학의 기초를 다지며 3년간 비수지신호를 포함한 수어 번역 딥러닝 모델을 자율 연구로 진행했습니다. 자연선택 시뮬레이터, 캔위성, 주니어 SW 창작대회 등 다양한 무대에서 프로그래밍의 즐거움을 본격적으로 발견한 시기입니다.",
      en: "Built a foundation in physics, engineering, and computer science. Spent three years on a self-directed research project building a deep-learning sign-language translation model that incorporates non-manual signals, alongside a Unity natural-selection simulator, CanSat competitions, and Samsung's Junior Software Creative Contest.",
      jp: "物理・工学・コンピュータサイエンスの基礎を築きながら、非手指動作を含む手話翻訳ディープラーニングモデルを3年間にわたり自主研究として進めました。自然選択シミュレータ、缶サット、サムスン・ジュニアSW創作大会など、様々な舞台でプログラミングの楽しさを本格的に見つけた時期です。",
    },
    track: "developer",
  },
];
