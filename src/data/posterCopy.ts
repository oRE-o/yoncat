import type { LanguageCode } from './i18n';

type PosterCopy = { intro: string; bio: string; contact: string; projectLabel: string };
export const posterCopy: Record<LanguageCode, PosterCopy> = {
  kr: {
    intro: '낭만 있는 게임 개발자로 성장 중입니다.',
    bio: "게임을 만드는 크리에이터입니다. KAIST 전산학부에서 프로그래밍을 중심으로 실력을 쌓으면서, 그림을 그리고 아트 역량도 함께 키워왔습니다. 코드로 구현하고 그림으로 표현하는 두 가지 시선이, 제가 만들 수 있는 게임의 폭을 넓혀주고 있습니다.\n\n겉모습만 그럴듯한 결과물보다, 제 취향과 고민이 깊이 담긴 작품을 만들고 싶습니다. 무엇을 만들 수 있는지만큼 왜 만드는지를 고민하고, 제가 만든 경험이 누군가에게 오래 남는 감동이 되기를 바랍니다.\n\n조금 늦더라도 완성도로 이야기하는 사람. 기술과 아트를 함께 다루며, 저만의 이유와 색깔이 있는 게임을 끝까지 만들어가는 것이 목표입니다. 다양한 능력을 가진 분들과의 협력을 기대하고 있습니다.",
    contact: '프로젝트나 협업에 관한 연락은 이메일로 주세요.',
    projectLabel: '프로젝트 상세',
  },
  en: {
    intro: 'I’m growing as a game developer, keeping a sense of wonder along the way.',
    bio: "I’m a creator who makes games. As a computer science student at KAIST, I’ve built my skills around programming while also developing my illustration and art practice. Working in both code and images broadens the kinds of games I can make.\n\nI want to make work with substance: games shaped by my own taste, thought, and care. I think as much about why I’m making something as how to build it, hoping the experience will stay with someone long after they play.\n\nEven if it takes a little longer, I want the quality of my work to speak for itself. My goal is to bring technology and art together and see games with my own perspective through to completion. I look forward to collaborating with people who bring different skills and perspectives.",
    contact: 'For projects and collaborations, you can reach me by email.',
    projectLabel: 'Project details',
  },
  jp: {
    intro: 'ロマンを大切にするゲーム開発者を目指して、成長中です。',
    bio: "ゲームを作るクリエイターです。KAISTのコンピュータサイエンス学部でプログラミングを軸に学びながら、イラストやアートの力も磨いてきました。コードで実現することと、絵で表現すること。その両方の視点が、作れるゲームの幅を広げてくれています。\n\n見た目だけが整ったものではなく、自分の好みや考えを深く込めた作品を作りたいと思っています。何を作れるかと同じくらい、なぜ作るのかを大切にして、自分の作った体験が誰かの心に長く残ることを願っています。\n\n少し時間がかかっても、作品の完成度で語れる人でありたい。技術とアートの両方に向き合い、自分なりの理由と色があるゲームを最後まで作り上げることが目標です。さまざまな得意分野を持つ方々とのコラボレーションを楽しみにしています。",
    contact: 'プロジェクトやコラボのご連絡はメールでお願いします。',
    projectLabel: 'プロジェクトの詳細',
  },
};
