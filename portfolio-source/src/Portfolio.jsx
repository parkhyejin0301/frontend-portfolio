import React, { useState, useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────
   여기만 본인 내용으로 바꾸면 사이트 전체가 바뀝니다.
   (이 data 객체가 사이트의 모든 텍스트를 담고 있어요)
   ────────────────────────────────────────────────────────────── */
// 아래 두 이미지를 프로젝트의 public/images/ 폴더에 넣어주세요.
// BASE_URL은 vite.config.js의 base 값("/" 또는 "/portfolio/")을 자동으로 따라갑니다.
// 덕분에 루트 배포든 서브경로(/portfolio) 배포든 이미지 경로가 알아서 맞춰집니다.
const base = import.meta.env.BASE_URL;
const designImg = `${base}images/design-components.jpg`;
const boImg = `${base}images/bo-ip-management.jpg`;

const data = {
  profile: {
    initials: "HJ",
    name: "박혜진",
    role: "Frontend Engineer",
    tagline:
      "화면 구현을 넘어 도메인 전반을 책임지는 프론트엔드 엔지니어입니다. 퍼블리셔에서 출발해 성능·데이터·공통 인프라까지 영역을 넓혀왔습니다.",
    location: "Seoul, KR",
    email: "zeze_0301@naver.com",
    available: true, // true면 'Available for work' 표시
  },
  about: [
    "비전공자로 시작해 웹 퍼블리셔 3년, 프론트엔드 엔지니어 2년, 총 5년간 마크업부터 아키텍처까지 영역을 단계적으로 넓혀왔습니다.",
    "맡은 화면만 그리는 데서 멈추지 않고 공통 인프라·디자인 시스템·성능·데이터 드리븐 개선까지 도메인 전반을 책임지는 작업을 해왔습니다. 모르는 영역도 끝까지 파고드는 성실함과 새로운 기술·도메인을 빠르게 흡수하는 배움의 태도를 가장 큰 강점으로 생각합니다.",
  ],
  skills: [
    { group: "Core", items: ["React", "Vue", "TypeScript", "JavaScript (ES6+)"] },
    { group: "Styling / DS", items: ["Tailwind CSS", "디자인 컴포넌트", "공통 Composables", "반응형 / 웹 접근성"] },
    { group: "Data / Quality", items: ["Mixpanel", "DataDog", "A/B Testing", "트래킹 이벤트 설계"] },
    { group: "Performance / Infra", items: ["Core Web Vitals", "SSR Hydration", "date-fns / dayjs", "BO 보안·권한"] },
  ],
  projects: [
    {
      title: "가격변동 · 셀프톡",
      year: "아정당",
      kind: "New Feature",
      tagline: "서비스 핵심 플로우에 안착시킨 대형 신규 기능",
      description:
        "도메인 요구사항을 직접 분석해 가격변동·셀프톡 등 대형 신규 기능을 설계·구현했습니다. 단순 화면 구현을 넘어 기능 전반을 책임지는 방식으로 작업해 서비스 핵심 플로우에 안착시켰습니다.",
      tech: ["React", "Vue", "TypeScript"],
      links: [{ label: "Live", href: "https://ajdphone.co.kr/phone/mno/deals" }],
    },
    {
      title: "디자인 시스템 · 공통 인프라",
      year: "아정당",
      kind: "Infra / DS",
      tagline: "Tailwind 전환과 vue-core 공통 컴포넌트 설계",
      description:
        "React Core의 Tailwind 전환을 주도해 스타일 일관성과 유지보수성을 개선했습니다. vue-core 공통 컴포넌트와 공통 Composables(validation·트래킹)를 설계해 중복을 제거하고, date-fns·dayjs 통합 및 외부 의존 자산 내재화로 의존성을 줄였습니다.",
      tech: ["Tailwind", "Vue", "Composables", "date-fns"],
      image: designImg,
      links: [{ label: "Preview", href: designImg }],
    },
    {
      title: "데이터 드리븐 개선",
      year: "아정당",
      kind: "Data",
      tagline: "Mixpanel·A/B 테스트 기반 사용자 경험 개선",
      description:
        "Mixpanel 기반 A/B 테스트(맞춤상담·카테고리 탭·셀프가입 개통지연 등 다수)로 가설을 실제 지표로 검증하는 데이터 드리븐 사이클을 운영했습니다. DataDog 로그 추적 모니터링과 트래킹 이벤트 분류 체계화도 함께 진행했습니다.",
      tech: ["Mixpanel", "DataDog", "A/B Testing"],
      links: [],
    },
    {
      title: "운영 백오피스 (BO)",
      year: "아정당",
      kind: "Platform",
      tagline: "백오피스 설계·이전과 보안·권한 체계 구축",
      description:
        "운영 백오피스(BO·상부점)를 설계하고 새 구조로 이전했습니다. 접속경로(IP) 관리 시스템을 신규 구축하고 도메인별 CRUD 권한 체계를 설계했으며, ISMS 대응과 토큰 갱신·인증 어뷰징 방지 로직을 구현했습니다.",
      tech: ["Vue", "보안 / 권한", "ISMS"],
      image: boImg,
      links: [{ label: "Preview", href: boImg }],
    },
    {
      title: "기업 홈페이지 퍼블리싱",
      year: "웹 에이전시",
      kind: "Publishing",
      tagline: "다양한 산업군 기업 홈페이지 구축 · WA 인증",
      description:
        "예림도어·코코도르·더벤티·가마치통닭·현대경제연구원·서울남부지역 장애인보건의료센터·롯데중앙연구소·하나비카레 등 다수 기업 홈페이지를 구축했습니다. 접근성 가이드라인을 준수한 마크업으로 웹 접근성 마크(WA) 인증 획득에 기여했고, 이때 다진 마크업·접근성 기반이 프론트엔드 전환의 토대가 되었습니다.",
      tech: ["HTML5", "CSS3", "JavaScript", "웹 접근성"],
      links: [
        { label: "예림도어", href: "https://www.yerim.net/kor/main/main.html" },
        { label: "더벤티", href: "https://theventi.co.kr/new2022/main/main.html" },
        { label: "코코도르", href: "https://cocodorcorp.com/kor/main/main.html" },
        { label: "현대경제연구원", href: "https://www.hri.co.kr/kor/main" },
      ],
    },
  ],
  experience: [
    {
      company: "아정당",
      role: "Frontend Engineer",
      period: "프론트엔드 2년",
      summary:
        "기존 사업(인터넷·렌탈)의 유지보수·성능/UX 개선과 신규 사업(휴대폰·이사·부동산)의 처음부터 끝까지 구축을 함께 담당했습니다. 시니어 프론트와 함께 디자인 컴포넌트를 구축하고, 공통 인프라·보안/권한·데이터 영역까지 책임 범위를 넓혔습니다.",
    },
    {
      company: "웹 에이전시",
      role: "Web Publisher",
      period: "퍼블리싱 3년",
      summary:
        "다양한 산업군의 기업 홈페이지를 구축하며 웹 표준·접근성·반응형 퍼블리싱 역량을 쌓았습니다. 웹 접근성 마크(WA) 인증 획득에 기여했고, 퍼블리싱 단계에서 컴포넌트 재사용 구조를 고민하며 프론트엔드 전환의 기반을 다졌습니다.",
    },
  ],
  socials: [
    // { label: "이력서 (PDF)", href: "#" }, // 이력서 링크 생기면 주석 해제
    { label: "Email", href: "mailto:zeze_0301@naver.com" },
  ],
};

/* ── 디자인 토큰 ───────────────────────────────────────────── */
const c = {
  bg: "#FFFFFF",
  bgAlt: "#F6F6F2",
  ink: "#141413",
  muted: "#76766E",
  line: "#E8E8E2",
  accent: "#1B33E8",
};
const display = "'Space Grotesk', system-ui, sans-serif";
const body = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

/* 섹션 라벨 — 작은 액센트 막대 + 대문자 트래킹 */
function Label({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: mono,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.18em",
        color: c.muted,
        textTransform: "uppercase",
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: 22, height: 2, background: c.accent, display: "inline-block" }}
      />
      {children}
    </span>
  );
}

/* 스크롤 진입 시 부드럽게 나타나는 래퍼 */
function Reveal({ children, delay = 0, as: Tag = "div", style = {}, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* 클릭하면 펼쳐지는 프로젝트 행 */
function ProjectRow({ project, index, open, onToggle }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${c.line}` }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        className="pf-row"
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          padding: "28px 0",
          display: "grid",
          gridTemplateColumns: "44px 1fr auto",
          gap: 20,
          alignItems: "baseline",
          color: c.ink,
        }}
      >
        <span style={{ fontFamily: mono, fontSize: 13, color: c.muted }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span
            style={{
              fontFamily: display,
              fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              color: hover || open ? c.accent : c.ink,
              transition: "color 0.25s ease",
              display: "block",
            }}
          >
            {project.title}
          </span>
          <span
            style={{
              fontFamily: body,
              fontSize: 15,
              color: c.muted,
              marginTop: 6,
              display: "block",
            }}
          >
            {project.tagline}
          </span>
        </span>
        <span
          style={{
            fontFamily: mono,
            fontSize: 12,
            color: c.muted,
            whiteSpace: "nowrap",
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform 0.3s ease",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* grid-template-rows 트릭으로 높이를 부드럽게 애니메이션 */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "0 0 32px 64px",
              maxWidth: 640,
            }}
          >
            <p
              style={{
                fontFamily: body,
                fontSize: 16,
                lineHeight: 1.65,
                color: c.ink,
                margin: "0 0 18px",
              }}
            >
              {project.description}
            </p>
            {project.image && (
              <a
                href={project.image}
                target="_blank"
                rel="noreferrer"
                style={{ display: "block", marginBottom: 18 }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} 미리보기`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    display: "block",
                    border: `1px solid ${c.line}`,
                    borderRadius: 10,
                  }}
                />
              </a>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: mono,
                    fontSize: 12,
                    color: c.muted,
                    border: `1px solid ${c.line}`,
                    borderRadius: 999,
                    padding: "4px 12px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {project.links && project.links.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 22 }}>
                {project.links.map((l) => (
                  <a
                    key={l.label}
                    className="pf-link"
                    href={l.href}
                    target={l.href.startsWith("#") ? undefined : "_blank"}
                    rel="noreferrer"
                    style={linkStyle}
                  >
                    {l.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  fontFamily: mono,
  fontSize: 13,
  color: c.accent,
  textDecoration: "none",
  borderBottom: `1px solid transparent`,
  paddingBottom: 2,
};

export default function Portfolio() {
  const { profile, about, skills, projects, experience, socials } = data;
  const [openProject, setOpenProject] = useState(0);

  const section = {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 24px",
  };

  return (
    <div style={{ background: c.bg, color: c.ink, fontFamily: body }}>
      {/* 폰트 + 의사클래스(hover/focus) + 키프레임은 style 블록에서 처리 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .pf-root ::selection { background: ${c.accent}; color: #fff; }
        .pf-row:hover { background: ${c.bgAlt}; }
        .pf-link:hover { border-bottom-color: ${c.accent} !important; }
        .pf-nav a { position: relative; }
        .pf-nav a::after {
          content: ""; position: absolute; left: 0; bottom: -3px;
          width: 0; height: 1px; background: ${c.accent}; transition: width 0.25s ease;
        }
        .pf-nav a:hover::after { width: 100%; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${c.accent}; outline-offset: 3px; border-radius: 2px;
        }
        @media (max-width: 640px) {
          .pf-nav-links { display: none; }
        }
      `}</style>

      <div className="pf-root">
        {/* ── 상단 내비게이션 ── */}
        <nav
          className="pf-nav"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "saturate(180%) blur(12px)",
            WebkitBackdropFilter: "saturate(180%) blur(12px)",
            borderBottom: `1px solid ${c.line}`,
          }}
        >
          <div
            style={{
              ...section,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 64,
            }}
          >
            <span style={{ fontFamily: mono, fontWeight: 500, fontSize: 15 }}>
              {profile.initials}
              <span style={{ color: c.accent }}>.</span>
            </span>
            <div
              className="pf-nav-links"
              style={{ display: "flex", gap: 28, fontFamily: mono, fontSize: 13 }}
            >
              {["work", "about", "experience", "contact"].map((s) => (
                <a key={s} href={`#${s}`} style={{ color: c.ink, textDecoration: "none" }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ── 히어로 ── */}
        <header style={{ ...section, paddingTop: "clamp(72px, 14vh, 160px)", paddingBottom: 80 }}>
          {profile.available && (
            <Reveal style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 28 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#16a34a",
                  boxShadow: "0 0 0 3px rgba(22,163,74,0.15)",
                }}
              />
              <span style={{ fontFamily: mono, fontSize: 13, color: c.muted }}>
                Available for work
              </span>
            </Reveal>
          )}
          <Reveal
            as="h1"
            delay={60}
            style={{
              fontFamily: display,
              fontWeight: 700,
              fontSize: "clamp(3rem, 11vw, 7rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {profile.name}
          </Reveal>
          <Reveal
            delay={120}
            style={{
              fontFamily: mono,
              fontSize: "clamp(0.95rem, 2.4vw, 1.15rem)",
              color: c.accent,
              marginTop: 18,
            }}
          >
            {profile.role}
          </Reveal>
          <Reveal
            as="p"
            delay={180}
            style={{
              fontSize: "clamp(1.05rem, 2.6vw, 1.35rem)",
              lineHeight: 1.5,
              color: c.ink,
              maxWidth: 620,
              marginTop: 28,
            }}
          >
            {profile.tagline}
          </Reveal>
          <Reveal
            delay={240}
            style={{ display: "flex", gap: 24, marginTop: 36, fontFamily: mono, fontSize: 13 }}
          >
            <a className="pf-link" href={`mailto:${profile.email}`} style={linkStyle}>
              {profile.email}
            </a>
            <span style={{ color: c.muted }}>{profile.location}</span>
          </Reveal>
        </header>

        {/* ── 프로젝트 ── */}
        <section id="work" style={{ ...section, paddingTop: 40, paddingBottom: 80 }}>
          <Reveal style={{ marginBottom: 8 }}>
            <Label>selected work</Label>
          </Reveal>
          <div>
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <ProjectRow
                  project={p}
                  index={i}
                  open={openProject === i}
                  onToggle={() => setOpenProject(openProject === i ? -1 : i)}
                />
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid ${c.line}` }} />
          </div>
        </section>

        {/* ── 소개 + 스킬 ── */}
        <section id="about" style={{ background: c.bgAlt, borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}` }}>
          <div style={{ ...section, paddingTop: 80, paddingBottom: 80 }}>
            <Reveal style={{ marginBottom: 24 }}>
              <Label>about</Label>
            </Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
                gap: 56,
                alignItems: "start",
              }}
              className="pf-about-grid"
            >
              <Reveal>
                {about.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "clamp(1.1rem, 2.6vw, 1.4rem)",
                      lineHeight: 1.6,
                      margin: i === 0 ? "0 0 20px" : 0,
                      color: c.ink,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={120} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {skills.map((s) => (
                  <div key={s.group}>
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: 12,
                        color: c.muted,
                        marginBottom: 8,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {s.group}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {s.items.map((it) => (
                        <span
                          key={it}
                          style={{
                            fontFamily: body,
                            fontSize: 14,
                            color: c.ink,
                            background: c.bg,
                            border: `1px solid ${c.line}`,
                            borderRadius: 6,
                            padding: "5px 11px",
                          }}
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 경력 ── */}
        <section id="experience" style={{ ...section, paddingTop: 80, paddingBottom: 80 }}>
          <Reveal style={{ marginBottom: 32 }}>
            <Label>experience</Label>
          </Reveal>
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 80}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: 32,
                  padding: "28px 0",
                  borderTop: `1px solid ${c.line}`,
                }}
                className="pf-exp-row"
              >
                <div style={{ fontFamily: mono, fontSize: 13, color: c.muted, paddingTop: 4 }}>
                  {e.period}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: display,
                      fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {e.role}
                  </h3>
                  <div style={{ fontSize: 15, color: c.accent, margin: "4px 0 12px" }}>
                    {e.company}
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: c.ink, margin: 0, maxWidth: 560 }}>
                    {e.summary}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: `1px solid ${c.line}` }} />
        </section>

        {/* ── 연락처 / 푸터 ── */}
        <footer id="contact" style={{ background: c.ink, color: c.bg }}>
          <div style={{ ...section, paddingTop: 90, paddingBottom: 60 }}>
            <Reveal style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <span aria-hidden="true" style={{ width: 22, height: 2, background: "#8f8fff", display: "inline-block" }} />
              <span
                style={{ fontFamily: mono, fontSize: 12, fontWeight: 500, letterSpacing: "0.18em", color: "#8f8fff", textTransform: "uppercase" }}
              >
                contact
              </span>
            </Reveal>
            <Reveal>
              <h2
                style={{
                  fontFamily: display,
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 7vw, 4rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                함께 만들어요.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <a
                href={`mailto:${profile.email}`}
                style={{
                  display: "inline-block",
                  fontFamily: mono,
                  fontSize: "clamp(1rem, 3vw, 1.3rem)",
                  color: c.bg,
                  textDecoration: "none",
                  marginTop: 24,
                  borderBottom: "1px solid #5a5aff",
                  paddingBottom: 4,
                }}
              >
                {profile.email}
              </a>
            </Reveal>
            <Reveal
              delay={140}
              style={{
                display: "flex",
                gap: 24,
                marginTop: 44,
                flexWrap: "wrap",
                fontFamily: mono,
                fontSize: 13,
              }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{ color: "#bdbdbd", textDecoration: "none" }}
                >
                  {s.label} ↗
                </a>
              ))}
            </Reveal>
            <div
              style={{
                marginTop: 64,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.12)",
                fontFamily: mono,
                fontSize: 12,
                color: "#888",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <span>© {new Date().getFullYear()} {profile.name}</span>
              <span>Built with React</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
