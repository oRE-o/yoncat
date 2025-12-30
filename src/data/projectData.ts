export interface ProjectLink {
  name: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  year: string;
  images: string[];
  description: string;
  tags: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "my-rhythm-game",
    title: "Rhythm Star",
    category: "Game", // ✨ 여기를 Game으로!
    role: "Lead Developer",
    year: "2024",
    images: ["/images/game1.png"],
    description: "Unity based rhythm game...",
    tags: ["Unity", "C#", "Mobile"], // 태그도 개발 관련으로!
    links: [],
  },
  {
    id: "campus-service",
    title: "Smart Campus",
    category: "Services", // ✨ 여기를 Services로!
    role: "Backend Engineer",
    year: "2023",
    images: ["/images/service1.png"],
    description: "Campus utility app...",
    tags: ["React", "Node.js", "AWS"],
    links: [],
  },
];
