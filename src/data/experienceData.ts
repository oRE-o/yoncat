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
    role: "경기북과학등학교 재학",
    company: "경기북과학고등학교",
    period: "Feb 2021 — Feb 2024",
    description:
      "항공우주 분야에 관심이 커 경기북과학고등학교에 진학하게 되었습니다. 물리와 공학 분야를 학습하며 로켓 추진에 대한 관심을 키웠습니다.",
    color: "text-blue-400",
  },
  {
    id: 2,
    role: "아주대학교 학부생",
    company: "아주대학교",
    period: "Mar 2024 — Present",
    description: "아주대학교 국방디지털융합학과 10기 재학 중 입니다.",
    color: "text-blue-400",
  },
  {
    id: 3,
    role: "Propulsion Engineer & Advisor",
    company: "AJORO",
    period: "Jun 2024 — Present",
    description:
      "아주대학교의 로켓 동아리 AJOURO에서 추진 시스템 개발을 담당하고 있고, 동체 · 발사대 등 로켓 시스템 전반에 대한 설계/시험 조언을 수행하고 있습니다.",
    color: "text-blue-400",
  },
  {
    id: 4,
    role: "Part-Time Cooling Engineer",
    company: "VF Space",
    period: "Feb 2024 — Aug 2024",
    description:
      "VF Space에서 3kN LOX/Kerosene 재생 냉각 연소기 설계를 담당했습니다.",
    color: "text-blue-400",
  },
  {
    id: 5,
    role: "Propulsion Engineer & Additive Manufacturing Engineer",
    company: "VF Space",
    period: "Aug 2024 — Dec 2024",
    description:
      "VF Space에서 3kN LOX/Kerosene 연소기 개발 및 WLAM Metal 3D Printer 운용·시험을 담당했습니다.",
    color: "text-blue-400",
  },
  {
    id: 6,
    role: "Project Manager & Propulsion Engineer",
    company: "VF Space",
    period: "Jan 2025 — Apr 2025",
    description:
      "VF Space에서 사운딩 로켓 프로젝트의 PM을 수행, 액체 연소기 시스템 및 동체 개발을 담당했습니다.",
    color: "text-blue-400",
  },
];