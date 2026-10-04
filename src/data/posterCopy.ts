import type { LanguageCode } from './i18n';

type PosterCopy = { intro: string; bio: string; contact: string; projectLabel: string };
export const posterCopy: Record<LanguageCode, PosterCopy> = {
  kr: {
    intro: '낭만 있는 게임 개발자로 성장 중입니다.',
    bio: 'HAJE에서 게임을 만들고, SPARCS에서 Taxi와 Clubs 개발에 참여했습니다. 직접 설계한 키보드를 만들거나, 그린 그림을 굿즈로 제작해 행사에 참가하기도 합니다.',
    contact: '프로젝트나 협업에 관한 연락은 이메일로 주세요.',
    projectLabel: '프로젝트 상세',
  },
  en: {
    intro: 'I’m growing as a game developer, keeping a sense of wonder along the way.',
    bio: 'I make games at HAJE and have contributed to Taxi and Clubs at SPARCS. I also design custom keyboards and sell my illustrated goods at artist booths.',
    contact: 'For projects and collaborations, you can reach me by email.',
    projectLabel: 'Project details',
  },
  jp: {
    intro: 'ロマンを大切にするゲーム開発者を目指して、成長中です。',
    bio: 'HAJEでゲームを制作し、SPARCSではTaxiとClubsの開発に参加しました。自作キーボードの設計や、イラストを使ったグッズのイベント頒布もしています。',
    contact: 'プロジェクトやコラボのご連絡はメールでお願いします。',
    projectLabel: 'プロジェクトの詳細',
  },
};
