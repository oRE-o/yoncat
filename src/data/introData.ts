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
      "머릿속의 상상을 실제로 동작하는 결과물로 옮기는 일을 좋아합니다! 그 과정에서 코드뿐 아니라, 쓰는 사람이 어떤 감정과 사용감을 받게 될지까지 함께 설계하려고 합니다.",
      "게임과 웹 서비스, 그리고 감각적인 인터페이스 사이를 가볍게 오가며 작업하는 편입니다. 즐거움과 유용함이 동시에 남는 경험을 만드는 쪽에 오래 마음이 기울어 있었습니다.",
      "기술을 단순한 구현 수단으로만 보지 않고, 무엇이 더 오래 기억되고 왜 다시 돌아오게 되는지를 함께 고민합니다. 그래서 구조와 연출을 따로 두지 않고 같은 결로 다듬는 편입니다.",
      "빠른 구현보다는 취향과 완성도를 지키면서도 끝까지 실제로 동작하는 형태로 끌고 가는 개발자입니다.",
    ],
    en: [
      "I am a software engineer who loves turning the ideas in my head into things that actually run, and shaping how they feel for the person on the other side of the screen.",
      "I move comfortably between games, web services, and expressive interfaces — drawn to experiences that stay useful in practice but still leave a distinct aftertaste.",
      "I care less about technology as a checklist of features, and more about what makes something stick. So I tend to treat structure and presentation as a single piece rather than two separate concerns.",
      "That is why I am less the person who builds the fastest, and more the one who carries an idea — taste and finish intact — all the way through to a working result.",
    ],
    jp: [
      "頭の中の想像を、実際に動く形に変えていくのが好きなソフトウェアエンジニアです。その過程で、コードだけでなく、使う人がどう感じ、どんな手触りを受け取るかまで一緒に設計しようとしています。",
      "ゲーム、Webサービス、そして表現のあるインターフェースの間を軽やかに行き来しながら作っています。楽しさと実用性が同時に残る体験を作ることに、長く心を寄せてきました。",
      "技術を単なる実装の手段として見ずに、何が長く記憶に残り、なぜまた戻ってきたくなるのかを一緒に考えます。だから構造と演出は別物ではなく、同じ流れの中で一緒に手を入れます。",
      "速く作るタイプというよりは、好みや完成度を守りつつ、最後まで実際に動く形まで連れていく人に近いです。",
    ],
  },
  links: {
    projects: "Projects",
    contact: "Contact",
  },
  languages: supportedLanguages,
};
