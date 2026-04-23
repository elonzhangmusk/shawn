import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

type Language = "zh" | "en";

type Card = {
  title: string;
  body: string;
  meta?: string;
};

type Copy = {
  pageTitle: string;
  brand: string;
  name: string;
  role: string;
  intro: string;
  note: string;
  ctaPrimary: string;
  ctaSecondary: string;
  nav: {
    about: string;
    education: string;
    highlights: string;
    projects: string;
    contact: string;
  };
  languageSwitch: {
    label: string;
    zh: string;
    en: string;
  };
  metrics: Array<{
    value: string;
    label: string;
    detail: string;
  }>;
  about: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
  };
  education: {
    eyebrow: string;
    title: string;
    cards: Card[];
  };
  highlights: {
    eyebrow: string;
    title: string;
    cards: Card[];
    skillsTitle: string;
    skills: string[];
  };
  projects: {
    eyebrow: string;
    title: string;
    cards: Card[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    email: string;
    phone: string;
  };
};

const content: Record<Language, Copy> = {
  zh: {
    pageTitle: "张航宁 - 编辑式个人作品集",
    brand: "Shawn / 张航宁",
    name: "张航宁",
    role: "自动化专业学生 · 工程实现 · 研究表达 · 双语展示",
    intro:
      "我希望把竞赛、研究和项目经历放进一页清楚、有秩序、能让人快速理解的作品集中。这个版本把原本偏炫技的视觉，改成更克制、更有层次的编辑式主页。",
    note: "适合老师、面试官、合作方和国际访客快速浏览。",
    ctaPrimary: "查看项目",
    ctaSecondary: "联系我",
    nav: {
      about: "关于",
      education: "教育",
      highlights: "亮点",
      projects: "项目",
      contact: "联系",
    },
    languageSwitch: {
      label: "语言",
      zh: "中文",
      en: "EN",
    },
    metrics: [
      {
        value: "20+",
        label: "荣誉奖项",
        detail: "国家级、省级、校级累计成果",
      },
      {
        value: "No.1",
        label: "综合测评",
        detail: "大一综合测评专业第一",
      },
      {
        value: "1st",
        label: "全国竞赛",
        detail: "全国大学生智能车竞赛国家一等奖",
      },
      {
        value: "ZH / EN",
        label: "双语叙事",
        detail: "面向中文与国际访客同步呈现",
      },
    ],
    about: {
      eyebrow: "关于",
      title: "不是堆信息，而是把经历讲清楚",
      body:
        "这个主页不再依赖夸张的科幻元素，而是把个人信息组织成更容易阅读的结构：先讲定位，再讲教育和方向，接着展示亮点和项目，最后提供清晰的联系方式。内容仍然保持双语，适合正式介绍和持续更新。",
      bullets: [
        "工程实现优先于装饰性效果",
        "用清楚的层级替代炫目的堆叠",
        "保留双语切换与浏览连续性",
      ],
    },
    education: {
      eyebrow: "教育",
      title: "学习路径与研究方向",
      cards: [
        {
          title: "杭州电子科技大学",
          meta: "2022 - 至今 · 自动化本科",
          body:
            "关注自动化、智能系统、视觉感知与工程落地，在课程、竞赛与研究训练之间建立了比较完整的能力链路。",
        },
        {
          title: "学业表现",
          meta: "综合评价与奖学金",
          body:
            "大一综合测评专业第一，获得两次校一等奖学金、省政府奖学金，以及优秀学生、优秀团员等荣誉。",
        },
      ],
    },
    highlights: {
      eyebrow: "亮点",
      title: "能力标签与代表性成果",
      cards: [
        {
          title: "竞赛经历",
          body:
            "长期参与智能车、数学建模和 AI 相关竞赛，累计获得 20+ 项国家级、省级、校级荣誉，训练了完整的工程协作与交付能力。",
        },
        {
          title: "科研表达",
          body:
            "围绕可迁移特征、深度学习与视觉任务持续训练，形成了对问题空间的独立理解，并产出过 EI 会议论文成果。",
        },
        {
          title: "项目转化",
          body:
            "完成过基于中医白眼图像的颈动脉斑块智能诊断研究，也负责过全景球类教练系统的国家级大创项目。",
        },
      ],
      skillsTitle: "技能矩阵",
      skills: [
        "Computer Vision",
        "Automation Systems",
        "Embedded Prototyping",
        "Deep Learning",
        "Research Writing",
        "Frontend Presentation",
        "Bilingual Storytelling",
      ],
    },
    projects: {
      eyebrow: "项目",
      title: "代表性工作",
      cards: [
        {
          title: "智能车系统",
          body:
            "围绕嵌入式感知、路径规划与控制协同展开，用于竞赛级自动驾驶实验与工程验证。",
        },
        {
          title: "医学影像研究",
          body:
            "面向多模态深度学习、图像分析与实验结果表达，强调研究过程的可解释性与展示质量。",
        },
        {
          title: "CAD 草图识别",
          body:
            "聚焦工程图理解、约束推断与装配关系识别，体现算法与应用之间的结合能力。",
        },
      ],
    },
    contact: {
      eyebrow: "联系",
      title: "如果需要，我可以继续把它扩展成完整个人站",
      body:
        "下一步可以补充简历下载、项目详情页、奖项时间线、博客或更细的作品集模块，同时保留语言记忆，让回访者默认回到上次选择的语言。",
      emailLabel: "邮箱",
      phoneLabel: "电话",
      email: "400136344@qq.com",
      phone: "15957455889",
    },
  },
  en: {
    pageTitle: "Zhang Hangning - Editorial Portfolio",
    brand: "Shawn / Zhang Hangning",
    name: "Zhang Hangning",
    role: "Automation student · Engineering delivery · Research communication · Bilingual presentation",
    intro:
      "I wanted a portfolio page that reads clearly in one pass. This version turns the earlier sci-fi styling into a restrained editorial homepage with stronger hierarchy and a calmer visual rhythm.",
    note: "Built for teachers, interviewers, collaborators, and international visitors.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Contact Me",
    nav: {
      about: "About",
      education: "Education",
      highlights: "Highlights",
      projects: "Projects",
      contact: "Contact",
    },
    languageSwitch: {
      label: "Language",
      zh: "中文",
      en: "EN",
    },
    metrics: [
      {
        value: "20+",
        label: "Honors",
        detail: "National, provincial, and university-level results",
      },
      {
        value: "No.1",
        label: "Major ranking",
        detail: "First place in freshman-year comprehensive evaluation",
      },
      {
        value: "1st",
        label: "National contest",
        detail: "National first prize in the smart vehicle competition",
      },
      {
        value: "ZH / EN",
        label: "Bilingual story",
        detail: "A clear experience for local and international readers",
      },
    ],
    about: {
      eyebrow: "About",
      title: "Less spectacle, more clarity",
      body:
        "Instead of stacking flashy sci-fi visuals, this page organizes the profile around what matters most: who I am, what I study, what I have built, and how to get in touch. The bilingual structure makes the portfolio useful across applications, interviews, and ongoing updates.",
      bullets: [
        "Engineering-led rather than decoration-led",
        "Clear hierarchy over visual noise",
        "Bilingual navigation with persistent choice",
      ],
    },
    education: {
      eyebrow: "Education",
      title: "Study path and research direction",
      cards: [
        {
          title: "Hangzhou Dianzi University",
          meta: "2022 - Present · B.Eng. in Automation",
          body:
            "Focused on automation, intelligent systems, visual perception, and real engineering delivery across coursework, competitions, and research training.",
        },
        {
          title: "Academic performance",
          meta: "Rankings and scholarships",
          body:
            "First place in major-level comprehensive evaluation during freshman year, plus two first-class scholarships, a provincial government scholarship, and additional honors.",
        },
      ],
    },
    highlights: {
      eyebrow: "Highlights",
      title: "Strengths and representative outcomes",
      cards: [
        {
          title: "Competition record",
          body:
            "Long-term participation in intelligent vehicles, mathematical modeling, and AI-related contests, resulting in 20+ honors and a practical understanding of team delivery.",
        },
        {
          title: "Research communication",
          body:
            "Training around transferable features, deep learning, and visual tasks led to an independent view of the problem space and an EI conference paper outcome.",
        },
        {
          title: "Project conversion",
          body:
            "Completed research on intelligent carotid-plaque diagnosis from traditional Chinese medicine imagery and led a national innovation project on ball-sports coaching.",
        },
      ],
      skillsTitle: "Skill matrix",
      skills: [
        "Computer Vision",
        "Automation Systems",
        "Embedded Prototyping",
        "Deep Learning",
        "Research Writing",
        "Frontend Presentation",
        "Bilingual Storytelling",
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Representative work",
      cards: [
        {
          title: "Intelligent vehicle system",
          body:
            "Built around embedded perception, path planning, and control coordination for competition-grade autonomous driving experiments.",
        },
        {
          title: "Medical imaging research",
          body:
            "Designed for multimodal deep learning, image analysis, and clear presentation of research results and methods.",
        },
        {
          title: "CAD sketch recognition",
          body:
            "Focused on engineering drawing understanding, constraint inference, and assembly-aware geometric recognition.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "I can extend this into a fuller personal site when needed",
      body:
        "Next steps could include a resume download, project detail pages, a timeline of awards, or a blog section, while keeping language persistence so returning visitors keep their last choice.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      email: "400136344@qq.com",
      phone: "15957455889",
    },
  },
};

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

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const copy = content[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = copy.pageTitle;
    window.localStorage.setItem("language", language);
  }, [copy.pageTitle, language]);

  return (
    <main className="page">
      <div className="page__backdrop" aria-hidden="true" />
      <div className="page__grid" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">{copy.brand}</p>
          <h1>{copy.name}</h1>
          <p className="brand-role">{copy.role}</p>
        </div>

        <div className="topbar__meta">
          <nav className="site-nav" aria-label={language === "zh" ? "主导航" : "Primary navigation"}>
            <a href="#about">{copy.nav.about}</a>
            <a href="#education">{copy.nav.education}</a>
            <a href="#highlights">{copy.nav.highlights}</a>
            <a href="#projects">{copy.nav.projects}</a>
            <a href="#contact">{copy.nav.contact}</a>
          </nav>

          <div className="language-switch" aria-label={copy.languageSwitch.label}>
            <button
              type="button"
              className={language === "zh" ? "language-chip active" : "language-chip"}
              onClick={() => setLanguage("zh")}
            >
              {copy.languageSwitch.zh}
            </button>
            <button
              type="button"
              className={language === "en" ? "language-chip active" : "language-chip"}
              onClick={() => setLanguage("en")}
            >
              {copy.languageSwitch.en}
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h2>{copy.about.title}</h2>
          <p className="hero__text">{copy.intro}</p>
          <p className="hero__note">{copy.note}</p>

          <div className="hero__actions">
            <a className="button button--solid" href="#projects">
              {copy.ctaPrimary}
            </a>
            <a className="button button--ghost" href="#contact">
              {copy.ctaSecondary}
            </a>
          </div>

          <ul className="hero__bullets">
            {copy.about.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="hero__rail">
          <div className="profile-card">
            <div className="profile-card__mark" aria-hidden="true">
              <span className="profile-card__ring" />
              <span className="profile-card__core" />
            </div>
            <div className="profile-card__text">
              <p className="profile-card__label">{copy.education.eyebrow}</p>
              <h3>{copy.education.title}</h3>
            </div>
          </div>

          <div className="metric-grid">
            {copy.metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <p className="metric-card__value">{metric.value}</p>
                <p className="metric-card__label">{metric.label}</p>
                <p className="metric-card__detail">{metric.detail}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="section" id="about">
        <SectionHeader eyebrow={copy.about.eyebrow} title={copy.about.title} />
        <div className="content-slab">
          <p>{copy.about.body}</p>
        </div>
      </section>

      <section className="section" id="education">
        <SectionHeader eyebrow={copy.education.eyebrow} title={copy.education.title} />
        <div className="card-grid card-grid--two">
          {copy.education.cards.map((card) => (
            <article className="glass-card" key={card.title}>
              {card.meta ? <p className="card-meta">{card.meta}</p> : null}
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="highlights">
        <SectionHeader eyebrow={copy.highlights.eyebrow} title={copy.highlights.title} />
        <div className="card-grid card-grid--three">
          {copy.highlights.cards.map((card) => (
            <article className="glass-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>

        <div className="glass-card skills-card">
          <div className="skills-card__head">
            <p className="eyebrow">{copy.highlights.eyebrow}</p>
            <h3>{copy.highlights.skillsTitle}</h3>
          </div>
          <div className="pill-row">
            {copy.highlights.skills.map((skill) => (
              <span className="skill-pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <SectionHeader eyebrow={copy.projects.eyebrow} title={copy.projects.title} />
        <div className="card-grid card-grid--three">
          {copy.projects.cards.map((card, index) => (
            <article className="project-card" key={card.title}>
              <p className="project-card__index">0{index + 1}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--contact" id="contact">
        <SectionHeader eyebrow={copy.contact.eyebrow} title={copy.contact.title} />
        <div className="contact-card">
          <p className="contact-card__body">{copy.contact.body}</p>
          <div className="contact-card__meta">
            <div>
              <span className="contact-label">{copy.contact.emailLabel}</span>
              <a href={`mailto:${copy.contact.email}`}>{copy.contact.email}</a>
            </div>
            <div>
              <span className="contact-label">{copy.contact.phoneLabel}</span>
              <a href={`tel:${copy.contact.phone}`}>{copy.contact.phone}</a>
            </div>
          </div>
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
