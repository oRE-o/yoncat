import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const lenisScrollToMock = vi.fn();
const tickerAddMock = vi.fn();
const tickerRemoveMock = vi.fn();

vi.mock("lenis", () => ({
  default: class LenisMock {
    on() {}
    raf() {}
    destroy() {}
    scrollTo(...args: unknown[]) {
      lenisScrollToMock(...args);
    }
  },
}));

vi.mock("gsap", () => {
  const context = (callback: () => void) => {
    callback();
    return { revert: () => {} };
  };

  const chain = {
    from: () => chain,
  };

  return {
    default: {
      registerPlugin: () => {},
      context,
      from: () => {},
      fromTo: () => {},
      timeline: () => chain,
      ticker: {
        add: (...args: unknown[]) => tickerAddMock(...args),
        lagSmoothing: () => {},
        remove: (...args: unknown[]) => tickerRemoveMock(...args),
      },
    },
    Power3: {
      easeOut: "easeOut",
    },
  };
});

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

import App from "./App";

type ObserverEntry = {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;
};

const observerEntries: ObserverEntry[] = [];
const scrollIntoViewMock = vi.fn();
let mobileDock = false;

class IntersectionObserverMock {
  callback: IntersectionObserverCallback;
  elements = new Set<Element>();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observerEntries.push({ callback, elements: this.elements });
  }

  observe = (element: Element) => {
    this.elements.add(element);
  };

  unobserve = (element: Element) => {
    this.elements.delete(element);
  };

  disconnect = () => {
    this.elements.clear();
  };
}

const triggerIntersection = (id: string) => {
  const element = document.getElementById(id);
  expect(element).not.toBeNull();

  observerEntries.forEach(({ callback, elements }) => {
    if (!element || !elements.has(element)) {
      return;
    }

    callback(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target: element,
          boundingClientRect: element.getBoundingClientRect(),
          intersectionRect: element.getBoundingClientRect(),
          rootBounds: null,
          time: 0,
        },
      ] as IntersectionObserverEntry[],
      {} as IntersectionObserver,
    );
  });
};

const getDock = () => {
  const docks = screen.getAllByRole("navigation", { name: "Floating dock" });
  return docks[docks.length - 1];
};

beforeEach(() => {
  observerEntries.length = 0;
  mobileDock = false;
  lenisScrollToMock.mockReset();
  tickerAddMock.mockReset();
  tickerRemoveMock.mockReset();
  scrollIntoViewMock.mockReset();
  document.documentElement.dataset.theme = "";

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: mobileDock && query.includes("max-width: 768px"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })),
  });

  globalThis.IntersectionObserver =
    IntersectionObserverMock as unknown as typeof IntersectionObserver;
  Element.prototype.scrollIntoView = scrollIntoViewMock;
});

afterEach(() => {
  cleanup();
});

describe("App localization flow", () => {
  it("renders an edge-attached dock with a language cycle button and theme switch", () => {
    render(<App />);

    const dock = getDock();
    const dockAttachment = dock.querySelector('[data-testid="dock-attachment"]') as HTMLElement | null;

    expect(within(dock).getByRole("button", { name: "소개" })).toBeInTheDocument();
    expect(within(dock).getByRole("button", { name: "경험" })).toBeInTheDocument();
    expect(within(dock).getByRole("button", { name: "프로젝트" })).toBeInTheDocument();
    expect(within(dock).getByRole("button", { name: "연락" })).toBeInTheDocument();
    expect(within(dock).getByRole("button", { name: "언어 변경" })).toHaveTextContent("KR");
    expect(within(dock).queryByRole("button", { name: "KR" })).not.toBeInTheDocument();
    expect(within(dock).queryByRole("button", { name: "EN" })).not.toBeInTheDocument();
    expect(within(dock).queryByRole("button", { name: "JP" })).not.toBeInTheDocument();
    expect(within(dock).getByRole("switch", { name: "테마 전환" })).toHaveAttribute("aria-checked", "false");
    expect(dock.style.right).toBe("1rem");
    expect(dock.style.border).toContain("solid");
    expect(dock.style.background).not.toBe("");
    expect(dockAttachment).not.toBeNull();
    expect(dockAttachment?.style.right).toBe("-1.05rem");
    expect(document.documentElement.dataset.theme).toBe("light");

    expect(screen.getByText("who am i")).toBeInTheDocument();
    expect(
      screen.getByText(
        "상상을 작동하는 형태로 바꾸고, 그 과정에서 사람의 감정과 사용감을 함께 설계하는 일을 좋아하는 소프트웨어 엔지니어입니다.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("지금까지의 흐름과 경험")).toBeInTheDocument();
    expect(screen.getByText("함께 재미있는 걸 만들어봅시다.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "미소녀 캐릭터가 돈을 벌기 위해 고군분투하는 모습을 담은 서브컬처 타이쿤 시뮬레이션 게임입니다.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Yonghyuk Choi/i).length).toBeGreaterThan(0);

    fireEvent.click(within(dock).getByRole("switch", { name: "테마 전환" }));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(within(getDock()).getByRole("switch", { name: "테마 전환" })).toHaveAttribute(
      "aria-checked",
      "true",
    );

    fireEvent.click(within(getDock()).getByRole("button", { name: "언어 변경" }));

    expect(within(getDock()).getByRole("button", { name: "Switch language" })).toHaveTextContent("EN");
    expect(within(getDock()).getByRole("button", { name: "Intro" })).toBeInTheDocument();
    expect(within(getDock()).getByRole("button", { name: "Experience" })).toBeInTheDocument();
    expect(within(getDock()).getByRole("button", { name: "Projects" })).toBeInTheDocument();
    expect(within(getDock()).getByRole("button", { name: "Contact" })).toBeInTheDocument();
    expect(within(getDock()).getByRole("switch", { name: "Toggle theme" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "I am a software engineer who likes turning imagination into working systems while shaping how they feel to the people using them.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Where I've been and what I've built"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Let's build something meaningful together."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "A subculture tycoon simulation game about a girl working hard to earn money.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Yonghyuk Choi/i).length).toBeGreaterThan(0);

    fireEvent.click(within(getDock()).getByRole("button", { name: "Switch language" }));

    expect(within(getDock()).getByRole("button", { name: "言語を切り替え" })).toHaveTextContent("JP");
    expect(within(getDock()).getByRole("button", { name: "イントロ" })).toBeInTheDocument();
    expect(within(getDock()).getByRole("button", { name: "経験" })).toBeInTheDocument();
    expect(within(getDock()).getByRole("button", { name: "プロジェクト" })).toBeInTheDocument();
    expect(within(getDock()).getByRole("button", { name: "連絡" })).toBeInTheDocument();
    expect(within(getDock()).getByRole("switch", { name: "テーマを切り替え" })).toBeInTheDocument();
  });

  it("cycles localized experience and project copy without expandable experience controls", () => {
    render(<App />);

    const cycleButton = within(getDock()).getByRole("button", { name: "언어 변경" });

    expect(screen.getByRole("heading", { name: "경험" })).toBeInTheDocument();
    expect(screen.getByText("지금까지의 흐름과 경험")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "프로젝트" })).toBeInTheDocument();
    expect(screen.getByText("선별한 작업들")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "전체" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "크래프톤(KRAFTON) 산하의 독립 스튜디오 5minlab에서 겨울방학 인턴십을 수행했습니다. 현업 게임 개발 파이프라인을 경험하며 실무 역량을 쌓았습니다.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("게임").length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /read more/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /collapse/i })).not.toBeInTheDocument();

    fireEvent.click(cycleButton);

    expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByText("Where I've been and what I've built")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByText("Selected works")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Completed a winter internship at 5minlab, an independent studio under KRAFTON, and gained hands-on experience with a professional game production pipeline.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Game").length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /read more/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /collapse/i })).not.toBeInTheDocument();

    fireEvent.click(within(getDock()).getByRole("button", { name: "Switch language" }));

    expect(screen.getByRole("heading", { name: "経験" })).toBeInTheDocument();
    expect(screen.getByText("これまでの歩みと取り組み")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "プロジェクト" })).toBeInTheDocument();
    expect(screen.getByText("選んだ作品たち")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "すべて" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "KRAFTON傘下の独立スタジオ5minlabで冬季インターンを行い、実務のゲーム開発パイプラインを経験しました。",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("ゲーム").length).toBeGreaterThan(0);
  });

  it("scrolls to sections from the dock and highlights the active section", async () => {
    render(<App />);

    const dock = getDock();

    fireEvent.click(within(dock).getByRole("button", { name: "프로젝트" }));

    expect(lenisScrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    triggerIntersection("about-strip");

    await waitFor(() => {
      expect(within(getDock()).getByRole("button", { name: "경험" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });
  });

  it("preserves an existing dark theme and cleans up the same GSAP ticker callback on unmount", () => {
    document.documentElement.dataset.theme = "dark";

    const { unmount } = render(<App />);

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(tickerAddMock).toHaveBeenCalledTimes(1);

    const addedCallback = tickerAddMock.mock.calls[0]?.[0];

    unmount();

    expect(tickerRemoveMock).toHaveBeenCalledWith(addedCallback);
  });

  it("routes intro CTA buttons through Lenis scrolling", () => {
    render(<App />);

    const introSection = document.getElementById("intro-section");
    expect(introSection).not.toBeNull();

    fireEvent.click(within(introSection as HTMLElement).getByRole("button", { name: "Projects" }));
    fireEvent.click(within(introSection as HTMLElement).getByRole("button", { name: "Contact" }));

    expect(lenisScrollToMock).toHaveBeenCalledTimes(2);
    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });

  it("renders the dock as a bottom row on mobile", async () => {
    mobileDock = true;

    render(<App />);

    await waitFor(() => {
      const dock = getDock();
      const dockAttachment = dock.querySelector('[data-testid="dock-attachment"]') as HTMLElement | null;

      expect(dock).toHaveStyle({ bottom: '0.75rem' });
      expect(dock).toHaveStyle({ flexDirection: 'row' });
      expect(dock).toHaveStyle({ flexWrap: 'wrap' });
      expect(dockAttachment).not.toBeNull();
      expect(dockAttachment?.style.bottom).toBe('-0.95rem');
    });
  });

  it("uses a single-column intro layout on mobile without clipping the hero image and applies hero dark-mode glow", async () => {
    mobileDock = true;

    render(<App />);

    const introGrid = document.querySelector('#intro-section > div') as HTMLElement | null;
    const heroSection = document.getElementById('hero-poster') as HTMLElement | null;
    expect(introGrid).not.toBeNull();
    expect(heroSection).not.toBeNull();

    await waitFor(() => {
      expect(introGrid?.style.gridTemplateColumns).toBe('minmax(0, 1fr)');
    });

    fireEvent.click(within(getDock()).getByRole('switch', { name: '테마 전환' }));

    const heroTitle = document.querySelector('#hero-poster .hero-title') as HTMLElement | null;
    const heroCharWrap = document.querySelector('#hero-poster .hero-char-wrap') as HTMLElement | null;
    expect(heroTitle).not.toBeNull();
    expect(heroCharWrap).not.toBeNull();
    expect(heroSection?.style.overflow).toBe('visible');
    expect(heroTitle?.style.textShadow).toContain('0 0 24px');
  });
});
