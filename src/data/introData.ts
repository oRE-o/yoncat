import type { LanguageCode } from "./i18n";

type LocalizedParagraphs = Record<LanguageCode, string[]>;

const supportedLanguages: Array<{ code: LanguageCode; label: string }> = [
  { code: "kr", label: "KR" },
  { code: "en", label: "EN" },
  { code: "jp", label: "JP" },
];

// Chrome labels stay English everywhere — only long-form copy is translated.
export const dockCopy = {
  sections: {
    intro: "Intro",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
  },
  cycleLanguage: "Switch language",
  themeToggle: "Toggle theme",
  expand: "Open",
  collapse: "Close",
};

export const experienceCopy = {
  title: "Experience",
  subtitle: "Where I've been & what I've done",
};

export const contactCopy = {
  title: "Let's Connect",
  subtitle: "Drop me a line any time — builds, collabs, or just hi.",
};

export { supportedLanguages };

export const introData: {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: LocalizedParagraphs;
  links: {
    projects: string;
    contact: string;
  };
  languages: Array<{ code: LanguageCode; label: string }>;
} = {
  eyebrow: "ABOUT ME",
  title: "Yonghyuk Choi",
  subtitle: "who am i",
  paragraphs: {
    kr: [
      "상상을 작동하는 형태로 바꾸고, 그 과정에서 사람의 감정과 사용감을 함께 설계하는 일을 좋아하는 소프트웨어 엔지니어입니다.",
      "게임, 웹 서비스, 그리고 감각적인 인터페이스 사이를 오가며 즐거움과 유용함이 함께 남는 경험을 만드는 쪽에 오래 마음이 기울어 왔습니다.",
      "기술을 단순히 구현의 대상으로 보기보다, 무엇이 더 오래 기억되고 왜 다시 돌아오게 되는지를 고민하며 구조와 연출을 함께 만집니다.",
      "그래서 저는 빠르게 만드는 사람이라기보다, 취향과 완성도를 지키면서도 끝까지 실제 동작으로 연결하는 사람에 가깝습니다.",
    ],
    en: [
      "I am a software engineer who likes turning imagination into working systems while shaping how they feel to the people using them.",
      "I move between games, web services, and expressive interfaces, usually chasing experiences that feel useful in practice but still leave a distinct aftertaste.",
      "I care less about technology as a checklist and more about rhythm, clarity, and the kind of immersion that makes someone want to stay a little longer.",
      "That is why I tend to build with both structure and atmosphere in mind, carrying ideas all the way from vague concept to something real, stable, and worth showing.",
    ],
    jp: [
      "想像をちゃんと動く形に変えながら、その過程で使う人の気分や手触りまで整えていくことが好きなソフトウェアエンジニアです。",
      "ゲーム、Webサービス、そして表現のあるインターフェースを行き来しながら、役に立つだけでなく、あとからふと思い出したくなる体験を目指しています。",
      "技術を機能の積み上げとしてだけ見るよりも、流れの気持ちよさや没入感、そしてもう一度触れたくなる理由を考える時間のほうが好きです。",
      "だから私は、ふわっとしたイメージを丁寧にほどきながら、ちゃんと完成まで連れていくことを大切にしています。",
    ],
  },
  links: {
    projects: "Projects",
    contact: "Contact",
  },
  languages: supportedLanguages,
};
