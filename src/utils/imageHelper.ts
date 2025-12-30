// src/utils/imageHelper.ts
export const getImagePath = (path: string) => {
  if (!path) return "/images/default-thumbnail.jpg"; // 이미지가 없을 때 기본값
  if (path.startsWith("http")) return path; // 외부 링크면 그대로 반환

  // Vite 환경이라면 import.meta.env.BASE_URL을 사용해!
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${baseUrl}${path}`;
};
