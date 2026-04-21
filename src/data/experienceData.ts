import type { LocalizedText } from "./i18n";

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: LocalizedText;
  color: string;
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Graduate",
    company: "Gyeonggibuk Science High School",
    period: "Mar 2021 — Feb 2024",
    description: {
      kr: "물리와 공학, 그리고 컴퓨터 과학의 기초를 다졌습니다. 프로그래밍 분야에 깊은 관심을 가지고 다양한 탐구 활동을 수행했습니다.",
      en: "Built a foundation in physics, engineering, and computer science. Explored programming through a wide range of research projects.",
      jp: "物理・工学・コンピュータサイエンスの基礎を築きました。プログラミングに強い関心を持ち、幅広い探究活動に取り組みました。",
    },
    color: "text-emerald-500",
  },
  {
    id: 2,
    role: "Undergraduate, School of Computing",
    company: "KAIST",
    period: "Feb 2024 — Present",
    description: {
      kr: "KAIST 전산학부(School of Computing)에 재학 중입니다. CS 기초 전반과 알고리즘, 시스템 프로그래밍 등을 깊이 있게 학습하고 있습니다.",
      en: "Currently studying at KAIST's School of Computing, going deep into CS fundamentals, algorithms, and systems programming.",
      jp: "KAIST 計算機科学部に在学中。CSの基礎からアルゴリズム、システムプログラミングまで深く学んでいます。",
    },
    color: "text-teal-400",
  },
  {
    id: 3,
    role: "Developer",
    company: "SPARCS",
    period: "Mar 2024 — Present",
    description: {
      kr: "KAIST의 대표적인 서비스 개발 단체 SPARCS에서 활동하고 있습니다. 학내 구성원들이 사용하는 실제 서비스를 기획, 개발, 배포하며 풀스택 개발 역량을 키우고 있습니다.",
      en: "Active in SPARCS, KAIST's flagship service-building group. Designing, developing, and shipping real services used across campus while growing as a full-stack engineer.",
      jp: "KAISTを代表するサービス開発団体SPARCSで活動中。学内で実際に使われるサービスを企画・開発・運用しながらフルスタックの経験を積んでいます。",
    },
    color: "text-emerald-400",
  },
  {
    id: 4,
    role: "Game Developer",
    company: "HAJE (KAIST Game Dev Club)",
    period: "Sep 2024 — Present",
    description: {
      kr: "KAIST 게임 제작 동아리 '하제'에서 활동 중입니다. Unity와 Godot 엔진 등을 활용하여 독창적인 게임을 기획하고 개발합니다.",
      en: "Active in HAJE, KAIST's game development club. Designing and building original games with Unity and Godot.",
      jp: "KAISTのゲーム制作サークル「ハジェ」で活動中。UnityやGodotを用いて独自のゲームを企画・開発しています。",
    },
    color: "text-teal-300",
  },
  {
    id: 5,
    role: "Winter Intern",
    company: "5minlab (KRAFTON)",
    period: "Dec 2024 — Feb 2025",
    description: {
      kr: "크래프톤(KRAFTON) 산하의 독립 스튜디오 5minlab에서 겨울방학 인턴십을 수행했습니다. 현업 게임 개발 파이프라인을 경험하며 실무 역량을 쌓았습니다.",
      en: "Completed a winter internship at 5minlab, an independent studio under KRAFTON, and gained hands-on experience with a professional game production pipeline.",
      jp: "KRAFTON傘下の独立スタジオ5minlabで冬季インターンを行い、実務のゲーム開発パイプラインを経験しました。",
    },
    color: "text-emerald-300",
  },
];
