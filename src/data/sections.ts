import { dockCopy } from './introData';

/** Scroll-navigable page sections, in page order. Single source of truth for App and the dock. */
export const SECTIONS = [
  { id: 'intro-section', label: dockCopy.sections.intro },
  { id: 'experience-section', label: dockCopy.sections.experience },
  { id: 'project-showcase', label: dockCopy.sections.projects },
  { id: 'contact-footer', label: dockCopy.sections.contact },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const SECTION_IDS: readonly SectionId[] = SECTIONS.map((section) => section.id);
