import type { Project } from "./projectData";

export type ProjectFilterKey = "All" | Project["category"];

export const projectShowcaseCopy = {
  title: "Projects",
  subtitle: "Selected works",
  filters: {
    All: "All",
    Game: "Game",
    Services: "Services",
    Engineering: "Engineering",
  } as Record<ProjectFilterKey, string>,
};
