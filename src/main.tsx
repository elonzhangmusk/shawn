import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

type Language = "zh" | "en";

const content = {
  zh: {
    pageTitle: "张航宁 - 科幻风格个人展示网站",
    brand: "科幻作品集",
    name: "张航宁",
    subtitle: "自动化专业学生，热爱工程实现、科研探索与系统设计。",
    navLabel: "主导航",
    nav: {
      about: "关于",
      education: "教育",
      achievements: "亮点",
      projects: "项目",
      contact: "联系",
    },
    languageSwitch: {
      label: "语言",
      zh: "中文",
      en: "EN",
    },
    hero: {
      eyebrow: "启动序列",
      title: "用中英双语展示智能系统、工程项目与研究经历。",
      description:
        "这个页面现在支持中文和英文切换，适合在个人介绍、项目展示和对外交流场景里自由切换语言，让网站更适合老师、同学、面试官和国际访问者浏览。",
      primaryCta: "查看项目",
      secondaryCta: "联系我",
    },
    profile: {
      title: "个人速览",
      highlights: [
        "全国一等奖智能车竞赛项目经历",
        "计算机视觉与自动化系统方向",
        "科研展示、项目介绍与个人品牌整合",
      ],
    },
    about: {
      eyebrow: "关于",
      title: "一个更适合对外展示的双语入口",
      body:
        "相比只有单一语言的落地页，双语版本更适合用于简历投递、研究交流、比赛展示和海外浏览场景。当前实现已经把页面核心文案接入统一语言字典，后续继续扩展新模块时也能保持一致。",
    },
    education: {
      eyebrow: "教育",
      title: "教育经历与研究方向",
      items: [
        {
          period: "2022 - 至今",
          title: "杭州电子科技大学",
          subtitle: "自动化专业，本科",
          body:
            "聚焦自动化、智能系统、视觉感知与工程落地，在课程、竞赛和研究训练之间建立了较强的综合实践能力。",
        },
        {
          period: "重点方向",
          title: "研究与工程兴趣",
          subtitle: "视觉感知 / 智能决策 / 系统实现",
          body:
            "关注将算法思路转化为可演示、可复现、可部署的系统，强调从问题定义到工程交付的一体化能力。",
        },
      ],
    },
    achievements: {
      eyebrow: "亮点",
      title: "能力标签与代表性成果",
      cards: [
        {
          title: "竞赛成果",
          body: "智能车相关竞赛经验可作为网站中的高价值展示内容，适合面向导师、评委和面试官进行快速说明。",
        },
        {
          title: "技术栈",
          body: "自动化、计算机视觉、深度学习、嵌入式系统与前端展示结合，让这个站点既能讲项目，也能展示工程表达能力。",
        },
        {
          title: "对外表达",
          body: "双语切换、模块化结构和后续可扩展的项目详情页，可以支持更正式的英文介绍和学术交流场景。",
        },
      ],
      skills: {
        title: "技能矩阵",
        items: [
          "Computer Vision",
          "Automation Systems",
          "Embedded Prototyping",
          "Deep Learning",
          "Technical Writing",
          "Frontend Presentation",
        ],
      },
    },
    projects: {
      eyebrow: "项目",
      title: "代表性项目",
      items: [
        {
          title: "智能车系统",
          description:
            "聚焦嵌入式感知、路径规划与控制协同，用于展示竞赛级自动驾驶实验和工程实现能力。",
        },
        {
          title: "医学影像研究",
          description:
            "面向多模态深度学习与影像分析任务，适合承载论文、实验结果和模型思路展示。",
        },
        {
          title: "CAD 草图识别",
          description:
            "围绕工程图纸结构理解、约束推断与装配关系识别，体现算法与应用结合能力。",
        },
      ],
    },
    contact: {
      eyebrow: "联系",
      title: "接下来可以继续把更多模块接入双语",
      body:
        "现在首页的主要文案已经支持中英文切换。下一步我们可以继续扩展教育经历、获奖、博客、简历下载、项目详情页，甚至做语言记忆功能，让访客下次打开时自动保持上一次选择。",
    },
  },
  en: {
    pageTitle: "Zhang Hangning - Sci-Fi Portfolio",
    brand: "Sci-Fi Portfolio",
    name: "Zhang Hangning",
    subtitle: "Automation student focused on engineering, research, and intelligent systems.",
    navLabel: "Primary",
    nav: {
      about: "About",
      education: "Education",
      achievements: "Highlights",
      projects: "Projects",
      contact: "Contact",
    },
    languageSwitch: {
      label: "Language",
      zh: "中",
      en: "EN",
    },
    hero: {
      eyebrow: "Launch Sequence",
      title: "Present intelligent systems, projects, and research in both Chinese and English.",
      description:
        "This landing page now supports bilingual switching, making it easier to introduce your work to classmates, professors, interviewers, and international visitors without maintaining two separate sites.",
      primaryCta: "View Projects",
      secondaryCta: "Contact Me",
    },
    profile: {
      title: "Profile Snapshot",
      highlights: [
        "National first-prize intelligent vehicle competition experience",
        "Computer vision and automation systems focus",
        "Unified space for research, projects, and personal presentation",
      ],
    },
    about: {
      eyebrow: "About",
      title: "A better bilingual front page for external presentation",
      body:
        "Compared with a single-language landing page, this bilingual version is far more useful for applications, research communication, competitions, and international visitors. The main copy is now driven by one language dictionary, so future sections can stay consistent as the site grows.",
    },
    education: {
      eyebrow: "Education",
      title: "Education and research direction",
      items: [
        {
          period: "2022 - Present",
          title: "Hangzhou Dianzi University",
          subtitle: "B.Eng. in Automation",
          body:
            "Focused on automation, intelligent systems, visual perception, and applied engineering, with growing strength across coursework, competitions, and research-oriented practice.",
        },
        {
          period: "Focus Areas",
          title: "Research and engineering interests",
          subtitle: "Vision / Decision-Making / System Delivery",
          body:
            "Interested in turning algorithmic ideas into demo-ready, reproducible, and deployable systems, with emphasis on end-to-end execution from problem framing to implementation.",
        },
      ],
    },
    achievements: {
      eyebrow: "Highlights",
      title: "Core strengths and representative outcomes",
      cards: [
        {
          title: "Competition Work",
          body: "Your intelligent-vehicle experience is strong portfolio material for quickly explaining impact to professors, reviewers, and interviewers.",
        },
        {
          title: "Technical Breadth",
          body: "Automation, computer vision, deep learning, embedded systems, and frontend presentation together make this site useful for both technical depth and communication.",
        },
        {
          title: "External Communication",
          body: "Bilingual switching, modular sections, and future project detail pages support stronger English introductions and more polished academic or recruiting scenarios.",
        },
      ],
      skills: {
        title: "Skill Matrix",
        items: [
          "Computer Vision",
          "Automation Systems",
          "Embedded Prototyping",
          "Deep Learning",
          "Technical Writing",
          "Frontend Presentation",
        ],
      },
    },
    projects: {
      eyebrow: "Projects",
      title: "Featured Work",
      items: [
        {
          title: "Intelligent Vehicle System",
          description:
            "Focused on embedded perception, path planning, and control coordination for competition-grade autonomous driving experiments.",
        },
        {
          title: "Medical Imaging Research",
          description:
            "Designed for multimodal deep-learning workflows, image analysis, and communicating experimental results clearly.",
        },
        {
          title: "CAD Sketch Recognition",
          description:
            "Built around engineering drawing understanding, constraint inference, and assembly-aware geometric recognition.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "We can keep extending bilingual support from here",
      body:
        "The homepage now supports Chinese and English switching. Next, we can extend the same system to education history, awards, blog posts, resume downloads, project detail pages, and even language persistence so returning visitors keep their last choice automatically.",
    },
  },
} as const;

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "zh";
  }

  const savedLanguage = window.localStorage.getItem("language");

  if (savedLanguage === "zh" || savedLanguage === "en") {
    return savedLanguage;
  }

  return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const copy = content[language];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const loading = document.getElementById("loading");

      if (!loading) {
        return;
      }

      loading.style.opacity = "0";
      loading.style.transition = "opacity 0.45s ease";

      window.setTimeout(() => {
        loading.style.display = "none";
      }, 450);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = copy.pageTitle;
    window.localStorage.setItem("language", language);
  }, [copy.pageTitle, language]);

  return (
    <main className="page-shell">
      <div className="particle-bg" />
      <div className="starfield" />

      <header className="site-header">
        <div>
          <p className="eyebrow">{copy.brand}</p>
          <h1>{copy.name}</h1>
          <p className="subtitle">{copy.subtitle}</p>
        </div>

        <div className="header-controls">
          <nav className="nav-links" aria-label={copy.navLabel}>
            <a href="#about">{copy.nav.about}</a>
            <a href="#education">{copy.nav.education}</a>
            <a href="#achievements">{copy.nav.achievements}</a>
            <a href="#projects">{copy.nav.projects}</a>
            <a href="#contact">{copy.nav.contact}</a>
          </nav>

          <div className="language-switch" aria-label={copy.languageSwitch.label}>
            <button
              className={language === "zh" ? "language-chip active" : "language-chip"}
              onClick={() => setLanguage("zh")}
              type="button"
            >
              {copy.languageSwitch.zh}
            </button>
            <button
              className={language === "en" ? "language-chip active" : "language-chip"}
              onClick={() => setLanguage("en")}
              type="button"
            >
              {copy.languageSwitch.en}
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h2>{copy.hero.title}</h2>
          <p className="hero-text">{copy.hero.description}</p>
          <div className="cta-row">
            <a className="neon-button" href="#projects">
              {copy.hero.primaryCta}
            </a>
            <a className="ghost-button" href="#contact">
              {copy.hero.secondaryCta}
            </a>
          </div>
        </div>

        <aside className="scifi-card status-panel">
          <div className="avatar-orb" />
          <h3>{copy.profile.title}</h3>
          <ul className="status-list">
            {copy.profile.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="section" id="about">
        <div className="section-heading">
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h2>{copy.about.title}</h2>
        </div>
        <div className="scifi-card">
          <p>{copy.about.body}</p>
        </div>
      </section>

      <section className="section" id="education">
        <div className="section-heading">
          <p className="eyebrow">{copy.education.eyebrow}</p>
          <h2>{copy.education.title}</h2>
        </div>
        <div className="info-grid">
          {copy.education.items.map((item) => (
            <article className="scifi-card detail-card" key={item.title}>
              <p className="detail-period">{item.period}</p>
              <h3>{item.title}</h3>
              <p className="detail-subtitle">{item.subtitle}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="achievements">
        <div className="section-heading">
          <p className="eyebrow">{copy.achievements.eyebrow}</p>
          <h2>{copy.achievements.title}</h2>
        </div>
        <div className="info-grid">
          {copy.achievements.cards.map((card) => (
            <article className="scifi-card detail-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
        <div className="scifi-card skills-panel">
          <div className="section-heading compact-heading">
            <p className="eyebrow">{copy.achievements.eyebrow}</p>
            <h2>{copy.achievements.skills.title}</h2>
          </div>
          <div className="skills-cloud">
            {copy.achievements.skills.items.map((skill) => (
              <span className="skill-pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">{copy.projects.eyebrow}</p>
          <h2>{copy.projects.title}</h2>
        </div>
        <div className="project-grid">
          {copy.projects.items.map((project) => (
            <article className="scifi-card project-card" key={project.title}>
              <div className="project-badge" />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <h2>{copy.contact.title}</h2>
        </div>
        <div className="scifi-card">
          <p>{copy.contact.body}</p>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
