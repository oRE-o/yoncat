// src/types.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  client: string; // "Personal Project" 등
  stack: string[]; // 기술 스택 (React, GSAP 등)
  year: string;
  imageUrl: string;
  link?: string; // 배포 링크
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}
