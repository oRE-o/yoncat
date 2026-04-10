export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  color: string;
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: "경기북과학고등학교 졸업",
    company: "Gyeonggibuk Science High School",
    period: "Mar 2021 — Feb 2024",
    description:
      "물리와 공학, 그리고 컴퓨터 과학의 기초를 다졌습니다. 프로그래밍 분야에 깊은 관심을 가지고 다양한 탐구 활동을 수행했습니다.",
    color: "text-emerald-500",
  },
  {
    id: 2,
    role: "전산학부 학부생",
    company: "KAIST",
    period: "Feb 2024 — Present",
    description:
      "KAIST 전산학부(School of Computing)에 재학 중입니다. CS 기초 전반과 알고리즘, 시스템 프로그래밍 등을 깊이 있게 학습하고 있습니다.",
    color: "text-teal-400",
  },
  {
    id: 3,
    role: "Developer",
    company: "SPARCS",
    period: "Mar 2024 — Present",
    description:
      "KAIST의 대표적인 서비스 개발 단체 SPARCS에서 활동하고 있습니다. 학내 구성원들이 사용하는 실제 서비스를 기획, 개발, 배포하며 풀스택 개발 역량을 키우고 있습니다.",
    color: "text-emerald-400",
  },
  {
    id: 4,
    role: "Game Developer",
    company: "HAJE (KAIST Game Dev Club)",
    period: "Sep 2024 — Present",
    description:
      "KAIST 게임 제작 동아리 '하제'에서 활동 중입니다. Unity와 Godot 엔진 등을 활용하여 독창적인 게임을 기획하고 개발합니다.",
    color: "text-teal-300",
  },
  {
    id: 5,
    role: "Winter Intern",
    company: "5minlab (KRAFTON)",
    period: "Dec 2024 — Feb 2025",
    description:
      "크래프톤(KRAFTON) 산하의 독립 스튜디오 5minlab에서 겨울방학 인턴십을 수행했습니다. 현업 게임 개발 파이프라인을 경험하며 실무 역량을 쌓았습니다.",
    color: "text-emerald-300",
  },
];
