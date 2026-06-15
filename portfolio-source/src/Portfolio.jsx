import { useState, useEffect, useRef } from "react";
import s from "./Portfolio.module.css";

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
    {
      group: "Core",
      items: ["React", "Vue", "TypeScript", "JavaScript (ES6+)"],
    },
    {
      group: "Styling / DS",
      items: [
        "Tailwind CSS",
        "디자인 컴포넌트",
        "공통 Composables",
        "반응형 / 웹 접근성",
      ],
    },
    {
      group: "Data / Quality",
      items: ["Mixpanel", "DataDog", "A/B Testing", "트래킹 이벤트 설계"],
    },
    {
      group: "Performance / Infra",
      items: [
        "Core Web Vitals",
        "SSR Hydration",
        "date-fns / dayjs",
        "BO 보안·권한",
      ],
    },
  ],
  projects: [
    {
      title: "API 연동 · 서버 상태 관리",
      year: "아정당",
      kind: "Integration",
      tagline: "REST API 협업과 안정적인 프론트–서버 데이터 연동",
      description:
        "백엔드 스펙을 분석해 REST API를 연동하고, 로딩·에러·빈 상태를 포함한 화면 상태를 설계했습니다. 인증 토큰 갱신·요청 재시도·도메인별 API 레이어 분리로 프론트엔드와 서버 간 데이터 흐름을 안정적으로 유지했습니다.",
      tech: ["REST API", "TypeScript", "React", "Vue"],
      links: [],
    },
    {
      title: "가격변동 · 셀프톡",
      year: "아정당",
      kind: "New Feature",
      tagline: "서비스 핵심 플로우에 안착시킨 대형 신규 기능",
      description:
        "도메인 요구사항을 직접 분석해 가격변동·셀프톡 등 대형 신규 기능을 설계·구현했습니다. 단순 화면 구현을 넘어 기능 전반을 책임지는 방식으로 작업해 서비스 핵심 플로우에 안착시켰습니다.",
      tech: ["React", "Vue", "TypeScript"],
      links: [
        { label: "Live", href: "https://ajdphone.co.kr/phone/mno/deals" },
      ],
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
        {
          label: "더벤티",
          href: "https://theventi.co.kr/new2022/main/main.html",
        },
        {
          label: "코코도르",
          href: "https://cocodorcorp.com/kor/main/main.html",
        },
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

/* 섹션 라벨 — 작은 액센트 막대 + 대문자 트래킹 */
function Label({ children }) {
  return (
    <span className={s.label}>
      <span aria-hidden="true" className={s.labelBar} />
      {children}
    </span>
  );
}

/* 스크롤 진입 시 부드럽게 나타나는 래퍼 */
function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  ...rest
}) {
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
      className={`${s.reveal} ${shown ? s.revealShown : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* 클릭하면 펼쳐지는 프로젝트 행 */
function ProjectRow({ project, index, open, onToggle }) {
  return (
    <div className={s.projectRow}>
      <button onClick={onToggle} aria-expanded={open} className={s.projectBtn}>
        <span className={s.projectIndex}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span
            className={`${s.projectTitle} ${open ? s.projectTitleOpen : ""}`.trim()}
          >
            {project.title}
          </span>
          <span className={s.projectTagline}>{project.tagline}</span>
        </span>
        <span
          className={`${s.projectToggle} ${open ? s.projectToggleOpen : ""}`.trim()}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* grid-template-rows 트릭으로 높이를 부드럽게 애니메이션 */}
      <div
        className={`${s.projectPanel} ${open ? s.projectPanelOpen : ""}`.trim()}
      >
        <div className={s.projectPanelInner}>
          <div className={s.projectBody}>
            <p className={s.projectDesc}>{project.description}</p>
            {project.image && (
              <a
                href={project.image}
                target="_blank"
                rel="noreferrer"
                className={s.projectImageLink}
              >
                <img
                  src={project.image}
                  alt={`${project.title} 미리보기`}
                  loading="lazy"
                  className={s.projectImage}
                />
              </a>
            )}
            <div className={s.techList}>
              {project.tech.map((t) => (
                <span key={t} className={s.techTag}>
                  {t}
                </span>
              ))}
            </div>
            {project.links && project.links.length > 0 && (
              <div className={s.linkList}>
                {project.links.map((l) => (
                  <a
                    key={l.label}
                    className={s.link}
                    href={l.href}
                    target={l.href.startsWith("#") ? undefined : "_blank"}
                    rel="noreferrer"
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

export default function Portfolio() {
  const { profile, about, skills, projects, experience, socials } = data;
  const [openProject, setOpenProject] = useState(0);
  const heroRef = useRef(null);

  // 마우스를 따라 히어로 광채(--mx/--my) 위치 갱신
  const onHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div>
      {/* ── 상단 내비게이션 ── */}
      <nav className={s.nav}>
        <div className={`${s.section} ${s.navInner}`}>
          <span className={s.navBrand}>
            {profile.initials}
            <span className={s.navAccent}>.</span>
          </span>
          <div className={s.navLinks}>
            {["work", "about", "experience", "contact"].map((item) => (
              <a key={item} href={`#${item}`} className={s.navLink}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 히어로 ── */}
      <header
        className={`${s.section} ${s.header}`}
        onMouseMove={onHeroMove}
        ref={heroRef}
      >
        <div className={s.heroAmbient} aria-hidden="true" />
        <div className={s.heroGlow} aria-hidden="true" />
        <div className={s.heroContent}>
          {profile.available && (
            <Reveal className={s.availBadge}>
              <span className={s.availDot} />
              <span className={s.availText}>Available for work</span>
            </Reveal>
          )}
          <Reveal as="h1" delay={60} className={s.heroName}>
            {profile.name}
          </Reveal>
          <Reveal delay={120} className={s.heroRole}>
            {profile.role}
          </Reveal>
          <Reveal as="p" delay={180} className={s.heroTagline}>
            {profile.tagline}
          </Reveal>
          <Reveal delay={240} className={s.heroMeta}>
            <a className={s.link} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <span className={s.heroLocation}>{profile.location}</span>
          </Reveal>
        </div>
      </header>

      {/* ── 프로젝트 ── */}
      <section id="work" className={`${s.section} ${s.workSection}`}>
        <Reveal className={s.workLabel}>
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
          <div className={s.projectEnd} />
        </div>
      </section>

      {/* ── 소개 + 스킬 ── */}
      <section id="about" className={s.about}>
        <div className={`${s.section} ${s.aboutInner}`}>
          <Reveal className={s.aboutLabel}>
            <Label>about</Label>
          </Reveal>
          <div className={s.aboutGrid}>
            <Reveal>
              {about.map((para, i) => (
                <p
                  key={i}
                  className={`${s.aboutPara} ${i === 0 ? s.aboutParaFirst : ""}`.trim()}
                >
                  {para}
                </p>
              ))}
            </Reveal>
            <Reveal delay={120} className={s.skillsCol}>
              {skills.map((group) => (
                <div key={group.group}>
                  <div className={s.skillGroupLabel}>{group.group}</div>
                  <div className={s.skillItems}>
                    {group.items.map((it) => (
                      <span key={it} className={s.skillTag}>
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
      <section id="experience" className={`${s.section} ${s.expSection}`}>
        <Reveal className={s.expLabel}>
          <Label>experience</Label>
        </Reveal>
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 80}>
            <div className={s.expRow}>
              <div className={s.expPeriod}>{e.period}</div>
              <div>
                <h3 className={s.expRole}>{e.role}</h3>
                <div className={s.expCompany}>{e.company}</div>
                <p className={s.expSummary}>{e.summary}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <div className={s.expEnd} />
      </section>

      {/* ── 연락처 / 푸터 ── */}
      <footer id="contact" className={s.footer}>
        <div className={`${s.section} ${s.footerInner}`}>
          <Reveal className={s.contactLabel}>
            <span aria-hidden="true" className={s.contactBar} />
            <span className={s.contactLabelText}>contact</span>
          </Reveal>
          <Reveal>
            <h2 className={s.contactHeading}>함께 만들어요.</h2>
          </Reveal>
          <Reveal delay={80}>
            <a href={`mailto:${profile.email}`} className={s.contactEmail}>
              {profile.email}
            </a>
          </Reveal>
          <Reveal delay={140} className={s.socials}>
            {socials.map((social) => (
              <a key={social.label} href={social.href} className={s.social}>
                {social.label} ↗
              </a>
            ))}
          </Reveal>
          <div className={s.footerBottom}>
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span>Built with React</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
