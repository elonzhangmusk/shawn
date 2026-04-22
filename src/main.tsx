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
        "围绕自动化、计算机视觉与智能系统方向，我希望用一个更清晰的双语网站，把竞赛荣誉、科研经历、项目转化与工程能力完整呈现给老师、同学、面试官和国际访问者。",
      primaryCta: "查看项目",
      secondaryCta: "联系我",
    },
    profile: {
      title: "个人速览",
      highlights: [
        "大一综测专业第一",
        "全国大学生智能车竞赛国家级一等奖",
        "累计获得国家级、省级、校级荣誉 20+ 项",
      ],
    },
    about: {
      eyebrow: "关于",
      title: "一个更适合对外展示的双语入口",
      body:
        "相比只停留在一句自我介绍的个人页，我更希望这个网站能系统呈现自己的学术能力、竞赛表现、工程经验和成长轨迹。双语版本让它更适合简历投递、研究交流、比赛展示和国际访问场景。",
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
            "聚焦自动化、智能系统、视觉感知与工程落地，在课程、竞赛和研究训练之间形成了较强的综合能力，并取得大一综测专业第一。",
        },
        {
          period: "学业亮点",
          title: "奖学金与综合表现",
          subtitle: "持续稳定的学业竞争力",
          body:
            "曾获 2 次校级一等奖学金、校级一等奖学金、省政府奖学金和校三好学生等奖励，也获得优秀团员等综合荣誉。",
        },
      ],
    },
    achievements: {
      eyebrow: "亮点",
      title: "能力标签与代表性成果",
      cards: [
        {
          title: "竞赛成果",
          body: "在智能车、数学建模与 AI 等方向持续参赛，累计获得国家级、省级、校级荣誉 20+ 项，其中在第二十届全国大学生智能车竞赛中获得国家级一等奖。",
        },
        {
          title: "科研与论文",
          body: "围绕可迁移特征、深度学习与视觉任务开展科研训练，形成对相关问题的独立理解，并产出深度学习相关国际 EI 会议论文成果。",
        },
        {
          title: "项目转化",
          body: "完成基于中医白睛眼像的颈动脉斑块智能诊断算法研究立项，并以负责人身份完成睿动轨迹全场景球类教练国家级大创项目立项。",
        },
      ],
      skills: {
        title: "技能矩阵",
        items: [
          "Computer Vision",
          "Automation Systems",
          "Embedded Prototyping",
          "Deep Learning",
          "Research Writing",
          "Huawei AI Certification",
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
        "Built around automation, computer vision, and intelligent systems, this bilingual site is meant to present my competition results, research work, project execution, and technical profile to professors, interviewers, collaborators, and international visitors.",
      primaryCta: "View Projects",
      secondaryCta: "Contact Me",
    },
    profile: {
      title: "Profile Snapshot",
      highlights: [
        "Ranked first in major-level comprehensive evaluation in freshman year",
        "National first prize in the National College Intelligent Vehicle Competition",
        "More than 20 national, provincial, and university-level honors",
      ],
    },
    about: {
      eyebrow: "About",
      title: "A better bilingual front page for external presentation",
      body:
        "Instead of a homepage that stops at a short self-introduction, I want this site to clearly communicate my academic performance, competition record, engineering experience, and research trajectory. The bilingual structure makes it more useful for applications, research communication, competitions, and international audiences.",
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
            "Focused on automation, intelligent systems, visual perception, and applied engineering, with strong integration across coursework, competitions, and research practice. I ranked first in major-level comprehensive evaluation during freshman year.",
        },
        {
          period: "Academic Highlights",
          title: "Scholarships and overall performance",
          subtitle: "Consistent academic competitiveness",
          body:
            "Awarded two university first-class scholarships, a provincial government scholarship, and the title of Outstanding Student, along with other honors such as Outstanding Youth League Member.",
        },
      ],
    },
    achievements: {
      eyebrow: "Highlights",
      title: "Core strengths and representative outcomes",
      cards: [
        {
          title: "Competition Work",
          body: "I have consistently competed in intelligent vehicles, mathematical modeling, and AI-related activities, accumulating 20+ honors across national, provincial, and university levels, including a national first prize in the 20th National College Intelligent Vehicle Competition.",
        },
        {
          title: "Research and Publication",
          body: "My research training covers transferable features, deep learning, and visual intelligence tasks, leading to an independent understanding of the problem space and an international EI conference paper related to deep learning.",
        },
        {
          title: "Project Conversion",
          body: "I completed a project on intelligent diagnosis of carotid plaque based on scleral imagery in traditional Chinese medicine, and served as the person in charge for a national-level innovation and entrepreneurship project on a full-scene ball-sports coaching system.",
        },
      ],
      skills: {
        title: "Skill Matrix",
        items: [
          "Computer Vision",
          "Automation Systems",
          "Embedded Prototyping",
          "Deep Learning",
          "Research Writing",
          "Huawei AI Certification",
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
