import { useEffect, useMemo, useState, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  BookOpen,
  Github,
  Home,
  LogIn,
  LogOut,
  Mail,
  MessageCircle,
  Sparkles,
  UserRound,
} from "lucide-react";

import "./styles.css";

type Language = "zh" | "en";
type AuthMode = "visitor" | "admin";
type UserRole = "visitor" | "admin";

type Metric = {
  value: string;
  label: string;
  detail: string;
};

type Card = {
  title: string;
  body: string;
  meta?: string;
  tags?: string[];
};

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  meta: string;
  body: string[];
  tags: string[];
};

type BlogComment = {
  id: string;
  postId: string;
  author: string;
  handle: string;
  body: string;
  createdAt: string;
};

type UserProfile = {
  name: string;
  handle: string;
  bio: string;
  loggedInAt: string;
  role: UserRole;
};

type Copy = {
  pageTitle: string;
  brand: string;
  displayName: string;
  role: string;
  summary: string;
  heroNote: string;
  heroTags: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  nav: {
    story: string;
    capabilities: string;
    projects: string;
    blog: string;
    contact: string;
  };
  metrics: Metric[];
  story: {
    eyebrow: string;
    title: string;
    cards: Card[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    cards: Card[];
  };
  projects: {
    eyebrow: string;
    title: string;
    cards: Card[];
  };
  blog: {
    eyebrow: string;
    title: string;
    intro: string;
    posts: BlogPost[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    emails: Array<{
      label: string;
      value: string;
    }>;
    phoneLabel: string;
    phone: string;
    locationLabel: string;
    location: string;
  };
};

const POSTS_STORAGE_KEY = "shawn-blog-comments-v1";
const PROFILE_STORAGE_KEY = "shawn-user-profile-v1";
const ADMIN_ACCESS = {
  username: "shawn-admin",
  password: "Shawn@2026",
  name: "Shawn Admin",
  handle: "admin",
  bio: "Site administrator",
} as const;

const content: Record<Language, Copy> = {
  zh: {
    pageTitle: "Shawn | 个人作品集",
    brand: "Shawn / 张航宁",
    displayName: "张航宁",
    role: "自动化专业 · 工程落地 · 科研表达 · 双语展示",
    summary:
      "把课程项目、竞赛经历和研究表达收拢成一页更完整的个人作品集。整体风格参考 modern-portfolio 的浅暖色、极简和玻璃卡片语言。",
    heroNote: "当前重点：自动化、智能系统、视觉感知和工程实践。",
    heroTags: ["自动化", "智能系统", "计算机视觉", "双语展示"],
    ctaPrimary: "查看项目",
    ctaSecondary: "联系我",
    nav: {
      story: "经历",
      capabilities: "能力",
      projects: "项目",
      blog: "博客",
      contact: "联系",
    },
    metrics: [
      { value: "20+", label: "荣誉奖项", detail: "国家级、省级、校级成果累计" },
      { value: "No.1", label: "综合测评", detail: "大一专业综合测评第一" },
      { value: "1st", label: "智能车竞赛", detail: "全国大学生智能汽车竞赛国家一等奖" },
      { value: "ZH / EN", label: "双语作品集", detail: "面向中文与英文读者" },
    ],
    story: {
      eyebrow: "经历",
      title: "学习路径与研究方向",
      cards: [
        {
          title: "杭州电子科技大学",
          meta: "2024 - 至今 · 自动化专业本科",
          body:
            "围绕自动化、智能系统、视觉感知和工程实现持续积累，把课程、竞赛和研究训练串成完整的能力链。",
        },
        {
          title: "学业表现",
          meta: "排名与奖学金",
          body:
            "获得大一专业综合测评第一、两次校级一等奖学金、省政府奖学金，以及优秀学生、优秀团员等荣誉。",
        },
      ],
    },
    capabilities: {
      eyebrow: "能力",
      title: "我最常做的事情",
      cards: [
        {
          title: "工程落地",
          body:
            "把算法、传感器和控制逻辑组织成能跑起来的系统，关注稳定性、可复现性和实际体验。",
          tags: ["C/C++", "控制系统", "嵌入式", "调试"],
        },
        {
          title: "研究表达",
          body:
            "面对图像分析、多模态学习和实验结果时，会把重点整理成清晰的结论、图表和展示材料。",
          tags: ["多模态", "医学影像", "论文表达", "可视化"],
        },
        {
          title: "双语展示",
          body:
            "通过中英文双语作品集，让不同背景的读者都能快速理解方向、项目和合作方式。",
          tags: ["中文", "English", "Portfolio", "Presentation"],
        },
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
            "面向多模态深度学习、图像分析与结果表达，强调研究过程的清晰性和展示质量。",
        },
        {
          title: "CAD 草图识别",
          body:
            "聚焦工程图理解、约束推断与装配关系识别，体现算法能力与工程语境之间的连接。",
        },
      ],
    },
    blog: {
      eyebrow: "博客",
      title: "我会在这里写一些项目笔记和学习记录",
      intro:
        "你可以把它理解成一个轻量博客：先展示文章，再让登录的访客留言。评论会保存在浏览器里，后续也可以接后端升级成真正的多人系统。",
      posts: [
        {
          id: "blog-1",
          title: "我为什么把作品集做成浅暖色",
          excerpt: "比起冷色科技感，我更想让页面像一份认真整理过的个人档案。",
          meta: "Blog / 设计思路",
          tags: ["Design", "Portfolio", "Style"],
          body: [
            "这个页面的目标不是炫技，而是让信息读起来轻、稳、干净。",
            "浅暖色、玻璃卡片、较大的标题和清晰的层次，能让作品集更像一份可以直接交付的材料。",
            "我希望博客也保持同样的节奏：短一点，但每一条都能留下价值。",
          ],
        },
        {
          id: "blog-2",
          title: "把工程项目写成博客的方法",
          excerpt: "真正有用的博客，不是堆术语，而是把过程、问题和结果讲清楚。",
          meta: "Blog / Writing",
          tags: ["Engineering", "Writing", "Notes"],
          body: [
            "先写目标，再写遇到的问题，最后写解决方式和结果。",
            "如果能附上截图、曲线、流程图或者实验现象，读者会更容易跟上。",
            "等以后接后端以后，这些文章也能变成真正可搜索、可评论的内容。",
          ],
        },
        {
          id: "blog-3",
          title: "评论功能接下来怎么升级",
          excerpt: "前端版能先跑起来，但真正的公共评论需要数据库和登录系统。",
          meta: "Blog / Roadmap",
          tags: ["Auth", "Comments", "Backend"],
          body: [
            "当前版本把登录态和评论都先做成前端可用的版本，方便你马上体验。",
            "如果你想让“别人也能登录并在不同设备上看到同一批评论”，下一步就要接后端。",
            "可以选 Supabase、Firebase、Appwrite 或自建 API，我都能继续帮你接。",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "联系",
      title: "如果你想聊合作、项目或机会，欢迎直接联系",
      body:
        "我很乐意交流学习、项目协作或任何可能的合作机会。如果你有问题，直接发邮件给我就好。",
      emails: [
        { label: "教育邮箱", value: "4061733@hdu.edu.cn" },
        { label: "私人邮箱", value: "400136344@qq.com" },
      ],
      phoneLabel: "电话",
      phone: "15957455889",
      locationLabel: "地点",
      location: "杭州，中国",
    },
  },
  en: {
    pageTitle: "Shawn | Portfolio",
    brand: "Shawn / Zhang Hangning",
    displayName: "Zhang Hangning",
    role: "Automation student · Engineering delivery · Research storytelling · Bilingual portfolio",
    summary:
      "I turn coursework, competition practice, and research communication into a polished one-page portfolio. The visual tone follows modern-portfolio: light, warm, minimal, and glassy.",
    heroNote: "Current focus: automation, intelligent systems, computer vision, and engineering delivery.",
    heroTags: ["Automation", "Intelligent Systems", "Computer Vision", "Bilingual"],
    ctaPrimary: "View Projects",
    ctaSecondary: "Contact Me",
    nav: {
      story: "Story",
      capabilities: "Capabilities",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
    },
    metrics: [
      { value: "20+", label: "Honors", detail: "National, provincial, and university-level results" },
      { value: "No.1", label: "Major ranking", detail: "First in freshman-year comprehensive evaluation" },
      { value: "1st", label: "Smart car contest", detail: "National first prize in the smart vehicle competition" },
      { value: "ZH / EN", label: "Bilingual", detail: "Built for both Chinese and international readers" },
    ],
    story: {
      eyebrow: "Story",
      title: "Study path and research direction",
      cards: [
        {
          title: "Hangzhou Dianzi University",
          meta: "2024 - Present · B.Eng. in Automation",
          body:
            "Focused on automation, intelligent systems, visual perception, and hands-on engineering delivery across coursework, competitions, and research training.",
        },
        {
          title: "Academic performance",
          meta: "Rankings and scholarships",
          body:
            "First place in major-level comprehensive evaluation during freshman year, plus two first-class scholarships, a provincial government scholarship, and additional honors.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "What I do most often",
      cards: [
        {
          title: "Engineering delivery",
          body:
            "I organize algorithms, sensors, and control logic into systems that actually run, with an emphasis on stability, reproducibility, and user experience.",
          tags: ["C/C++", "Control", "Embedded", "Debugging"],
        },
        {
          title: "Research communication",
          body:
            "When working with multimodal learning, image analysis, or experimental results, I turn the work into clear conclusions, figures, and presentation assets.",
          tags: ["Multimodal", "Medical imaging", "Writing", "Visualization"],
        },
        {
          title: "Bilingual presentation",
          body:
            "The bilingual portfolio helps different audiences quickly understand my direction, projects, and collaboration style.",
          tags: ["Chinese", "English", "Portfolio", "Presentation"],
        },
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
    blog: {
      eyebrow: "Blog",
      title: "I will write project notes and study logs here",
      intro:
        "Think of this as a lightweight blog: posts first, then comments from logged-in visitors. Comments are stored in the browser for now, and we can upgrade to a real multi-user backend later.",
      posts: [
        {
          id: "blog-1",
          title: "Why I chose a warm palette for this portfolio",
          excerpt: "Instead of a cold tech look, I wanted it to feel like a carefully prepared personal dossier.",
          meta: "Blog / Design",
          tags: ["Design", "Portfolio", "Style"],
          body: [
            "The goal of the page is clarity, not flashy effects.",
            "Warm neutrals, glass cards, large type, and clear hierarchy make the portfolio feel like a polished handoff.",
            "The blog follows the same rhythm: concise, but useful.",
          ],
        },
        {
          id: "blog-2",
          title: "How to turn an engineering project into a blog post",
          excerpt: "A useful blog explains the goal, the obstacles, and the results without drowning in jargon.",
          meta: "Blog / Writing",
          tags: ["Engineering", "Writing", "Notes"],
          body: [
            "Start with the goal, then explain the issue, then show the fix and the result.",
            "Screenshots, charts, flow diagrams, or experiment snapshots make the post much easier to follow.",
            "Once the backend is connected, these posts can become searchable and publicly commentable.",
          ],
        },
        {
          id: "blog-3",
          title: "What comes next for login and comments",
          excerpt: "The front end can get you very far, but shared comments need a backend and auth.",
          meta: "Blog / Roadmap",
          tags: ["Auth", "Comments", "Backend"],
          body: [
            "This version already supports a local sign-in and browser-stored comments so you can try the flow immediately.",
            "If you want real cross-device login and shared comments, the next step is a backend.",
            "Supabase, Firebase, Appwrite, or a custom API all work. I can wire any of them in next.",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "If you'd like to talk about collaboration or opportunities, feel free to reach out",
      body:
        "I am always happy to chat about learning, projects, or potential collaborations. If you have a question, just send me an email.",
      emails: [
        { label: "School email", value: "4061733@hdu.edu.cn" },
        { label: "Private email", value: "400136344@qq.com" },
      ],
      phoneLabel: "Phone",
      phone: "15957455889",
      locationLabel: "Location",
      location: "Hangzhou, China",
    },
  },
};

const navItems = [
  { href: "#top", label: "Home", icon: Home },
  { href: "#story", label: "Story", icon: UserRound },
  { href: "#projects", label: "Work", icon: Briefcase },
  { href: "#blog", label: "Blog", icon: BookOpen },
  { href: "#contact", label: "Contact", icon: Mail },
] as const;

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "zh";
  }

  const saved = window.localStorage.getItem("language");
  if (saved === "zh" || saved === "en") {
    return saved;
  }

  return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  index,
}: {
  eyebrow: string;
  title: string;
  index: string;
}) {
  return (
    <div className="section__head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section__title">{title}</h2>
      </div>
      <span className="section__index" aria-hidden="true">
        {index}
      </span>
    </div>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="metric-card">
      <p className="metric-card__value">{metric.value}</p>
      <p className="metric-card__label">{metric.label}</p>
      <p className="metric-card__detail">{metric.detail}</p>
    </article>
  );
}

function GlassCard({ card }: { card: Card }) {
  return (
    <article className="glass-card">
      {card.meta ? <p className="card-meta">{card.meta}</p> : null}
      <h3>{card.title}</h3>
      <p>{card.body}</p>
      {card.tags?.length ? (
        <div className="pill-row" aria-label={`${card.title} tags`}>
          {card.tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function BlogCard({
  post,
  active,
  onClick,
}: {
  post: BlogPost;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`blog-card ${active ? "active" : ""}`} type="button" onClick={onClick}>
      <p className="blog-card__meta">{post.meta}</p>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="pill-row">
        {post.tags.map((tag) => (
          <span className="pill" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const copy = content[language];
  const [activePostId, setActivePostId] = useState(copy.blog.posts[0].id);
  const [profile, setProfile] = useState<UserProfile | null>(() =>
    readJson<UserProfile | null>(PROFILE_STORAGE_KEY, null),
  );
  const [comments, setComments] = useState<Record<string, BlogComment[]>>(() =>
    readJson<Record<string, BlogComment[]>>(POSTS_STORAGE_KEY, {}),
  );
  const [authOpen, setAuthOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState({ name: "", handle: "", bio: "" });
  const [commentDraft, setCommentDraft] = useState("");

  const activePost = useMemo(
    () => copy.blog.posts.find((post) => post.id === activePostId) ?? copy.blog.posts[0],
    [activePostId, copy.blog.posts],
  );

  const activeComments = comments[activePost.id] ?? [];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = copy.pageTitle;
    window.localStorage.setItem("language", language);
  }, [copy.pageTitle, language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (profile) {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } else {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, [profile]);

  useEffect(() => {
    setActivePostId(copy.blog.posts[0].id);
  }, [language]);

  useEffect(() => {
    if (profile) {
      setProfileDraft({
        name: profile.name,
        handle: profile.handle,
        bio: profile.bio,
      });
    }
  }, [profile]);

  const commentCount = Object.values(comments).reduce((total, items) => total + items.length, 0);

  function openLogin(mode: AuthMode = "visitor") {
    if (mode === "admin") {
      const username = window.prompt(language === "zh" ? "请输入管理员用户名" : "Enter admin username");
      if (!username) {
        return;
      }

      const password = window.prompt(language === "zh" ? "请输入管理员密码" : "Enter admin password");
      if (!password) {
        return;
      }

      if (username === ADMIN_ACCESS.username && password === ADMIN_ACCESS.password) {
        setProfile({
          name: ADMIN_ACCESS.name,
          handle: ADMIN_ACCESS.handle,
          bio: ADMIN_ACCESS.bio,
          loggedInAt: new Date().toISOString(),
          role: "admin",
        });
        window.alert(language === "zh" ? "管理员登录成功" : "Admin login successful");
      } else {
        window.alert(language === "zh" ? "管理员信息不正确" : "Admin credentials are incorrect");
      }

      return;
    }

    setProfileDraft({ name: "", handle: "", bio: "" });
    setAuthOpen(true);
  }

  function closeLogin() {
    setAuthOpen(false);
  }

  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = profileDraft.name.trim();
    const handle = profileDraft.handle.trim() || name;

    if (!name) {
      return;
    }

    setProfile({
      name,
      handle,
      bio: profileDraft.bio.trim(),
      loggedInAt: new Date().toISOString(),
      role: "visitor",
    });
    setAuthOpen(false);
  }

  function handleSignOut() {
    setProfile(null);
    setCommentDraft("");
  }

  function handleDeleteComment(commentId: string) {
    if (profile?.role !== "admin") {
      return;
    }

    setComments((current) => {
      const next = { ...current };

      for (const postId of Object.keys(next)) {
        next[postId] = next[postId].filter((comment) => comment.id !== commentId);
      }

      return next;
    });
  }

  function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile || !commentDraft.trim()) {
      return;
    }

    const nextComment: BlogComment = {
      id: `${activePost.id}-${Date.now()}`,
      postId: activePost.id,
      author: profile.name,
      handle: profile.handle,
      body: commentDraft.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments((current) => ({
      ...current,
      [activePost.id]: [...(current[activePost.id] ?? []), nextComment],
    }));
    setCommentDraft("");
  }

  return (
    <main className="page" id="top">
      <div className="page__backdrop" aria-hidden="true" />
      <div className="page__grid" aria-hidden="true" />

      <div className="page__corner" aria-hidden="true">
        <div className="page__corner-ring" />
        <div className="page__corner-glow" />
      </div>

      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">{copy.brand}</p>
          <h1>{copy.displayName}</h1>
          <p className="brand-role">{copy.role}</p>
        </div>

        <div className="topbar__meta">
          {profile ? (
            <div className="user-chip">
              <span className="user-chip__avatar">{profile.name.slice(0, 1).toUpperCase()}</span>
              <div>
                <p className="user-chip__name">{profile.name}</p>
                <p className="user-chip__meta">
                  {profile.role === "admin"
                    ? language === "zh"
                      ? "管理员模式"
                      : "Admin mode"
                    : language === "zh"
                      ? "已登录，可评论"
                      : "Signed in, ready to comment"}
                </p>
              </div>
              {profile.role === "admin" ? (
                <span className="user-chip__badge">{language === "zh" ? "管理员" : "Admin"}</span>
              ) : null}
              <button type="button" className="user-chip__action" onClick={handleSignOut}>
                <LogOut aria-hidden />
              </button>
            </div>
          ) : (
            <div className="topbar__actions">
              <button type="button" className="social-link social-link--button" onClick={() => openLogin("visitor")}>
                <LogIn aria-hidden />
                <span>{language === "zh" ? "登录 / 注册" : "Sign in / Join"}</span>
              </button>
              <button type="button" className="social-link social-link--button social-link--subtle" onClick={() => openLogin("admin")}>
                <UserRound aria-hidden />
                <span>{language === "zh" ? "管理员登录" : "Admin login"}</span>
              </button>
            </div>
          )}

          <div className="language-switch" aria-label="Language switch">
            <button
              type="button"
              className={language === "zh" ? "language-chip active" : "language-chip"}
              onClick={() => setLanguage("zh")}
            >
              中文
            </button>
            <button
              type="button"
              className={language === "en" ? "language-chip active" : "language-chip"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>

          <a className="social-link" href="https://github.com/" target="_blank" rel="noreferrer">
            <Github aria-hidden />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      <nav className="dock-nav" aria-label={language === "zh" ? "页面导航" : "Page navigation"}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a className="dock-nav__item" href={item.href} key={item.href}>
              <Icon aria-hidden />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <section className="hero">
        <FadeIn className="hero__copy">
          <p className="eyebrow">{language === "zh" ? "个人作品集" : "Portfolio"}</p>
          <h2>{copy.displayName}</h2>
          <p className="hero__text">{copy.summary}</p>

          <div className="chip-row">
            {copy.heroTags.map((tag) => (
              <span className="chip" key={tag}>
                <Sparkles aria-hidden />
                {tag}
              </span>
            ))}
          </div>

          <p className="hero__note">{copy.heroNote}</p>

          <div className="hero__actions">
            <a className="button button--solid" href="#projects">
              {copy.ctaPrimary}
              <ArrowUpRight aria-hidden />
            </a>
            <a className="button button--ghost" href="#blog">
              {copy.nav.blog}
            </a>
          </div>
        </FadeIn>

        <aside className="hero__rail">
          <FadeIn delay={0.08}>
            <div className="profile-card">
              <div className="profile-card__mark" aria-hidden="true">
                <div className="profile-card__ring" />
                <div className="profile-card__core">Z</div>
              </div>

              <div>
                <p className="profile-card__label">Overview</p>
                <h3>{language === "zh" ? "项目、博客与评论" : "Projects, blog, and comments"}</h3>
                <p className="hero__text">
                  {language === "zh"
                    ? "把项目、文章和访客互动整合到一页，让信息更像一个完整作品集。"
                    : "A single page that brings projects, articles, and visitor interaction into one polished portfolio."}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="metric-grid">
              {copy.metrics.map((metric) => (
                <MetricCard metric={metric} key={metric.label} />
              ))}
            </div>
          </FadeIn>
        </aside>
      </section>

      <section className="section" id="story">
        <FadeIn>
          <SectionHeader eyebrow={copy.story.eyebrow} title={copy.story.title} index="01" />
        </FadeIn>
        <div className="content-slab">
          <p className="content-slab__text">
            {language === "zh"
              ? "我希望这个页面像 modern-portfolio 一样，信息清楚、层次轻、视觉统一，阅读时不会被多余装饰打断。"
              : "I want this page to feel like modern-portfolio: clear, light, unified, and free from unnecessary visual noise."}
          </p>
        </div>
        <div className="card-grid card-grid--two">
          {copy.story.cards.map((card, index) => (
            <FadeIn delay={index * 0.09} key={card.title}>
              <GlassCard card={card} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section" id="capabilities">
        <FadeIn>
          <SectionHeader eyebrow={copy.capabilities.eyebrow} title={copy.capabilities.title} index="02" />
        </FadeIn>
        <div className="card-grid card-grid--three">
          {copy.capabilities.cards.map((card, index) => (
            <FadeIn delay={index * 0.09} key={card.title}>
              <article className="glass-card service-card">
                <p className="service-card__index">0{index + 1}</p>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                {card.tags?.length ? (
                  <div className="pill-row">
                    {card.tags.map((tag) => (
                      <span className="pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <FadeIn>
          <SectionHeader eyebrow={copy.projects.eyebrow} title={copy.projects.title} index="03" />
        </FadeIn>
        <div className="card-grid card-grid--three">
          {copy.projects.cards.map((card, index) => (
            <FadeIn delay={index * 0.09} key={card.title}>
              <article className="glass-card project-card">
                <p className="project-card__index">0{index + 1}</p>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div className="project-card__footer">
                  <span>{language === "zh" ? "查看详情" : "View details"}</span>
                  <ArrowUpRight aria-hidden />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section section--blog" id="blog">
        <FadeIn>
          <SectionHeader eyebrow={copy.blog.eyebrow} title={copy.blog.title} index="04" />
        </FadeIn>

        <div className="content-slab blog-intro">
          <p className="content-slab__text">{copy.blog.intro}</p>
        </div>

        <div className="blog-layout">
          <div className="blog-list">
            {copy.blog.posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                active={post.id === activePost.id}
                onClick={() => setActivePostId(post.id)}
              />
            ))}
          </div>

          <article className="blog-detail">
            <p className="blog-detail__meta">{activePost.meta}</p>
            <h3>{activePost.title}</h3>
            <p className="blog-detail__excerpt">{activePost.excerpt}</p>

            <div className="blog-detail__body">
              {activePost.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="blog-detail__footer">
              <span>
                {language === "zh" ? "评论数" : "Comments"}: {commentCount}
              </span>
              <button type="button" className="button button--ghost button--small" onClick={() => openLogin("visitor")}>
                {profile ? (language === "zh" ? "切换账号" : "Switch account") : language === "zh" ? "登录后评论" : "Sign in to comment"}
              </button>
            </div>

            <div className="comment-panel">
              <div className="comment-panel__head">
                <h4>{language === "zh" ? "评论" : "Comments"}</h4>
                <p>
                  {profile
                    ? language === "zh"
                      ? "你当前已登录，可以直接发表评论。"
                      : "You are signed in and can leave a comment now."
                    : language === "zh"
                      ? "先登录再评论。"
                      : "Please sign in before commenting."}
                </p>
              </div>

              {profile ? (
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                  <label className="field">
                    <span>{language === "zh" ? "评论内容" : "Comment"}</span>
                    <textarea
                      value={commentDraft}
                      onChange={(event) => setCommentDraft(event.target.value)}
                      rows={4}
                      placeholder={language === "zh" ? "写点想法吧..." : "Share your thoughts..."}
                    />
                  </label>
                  <button type="submit" className="button button--solid">
                    {language === "zh" ? "发布评论" : "Post comment"}
                  </button>
                </form>
              ) : (
                <div className="comment-gate">
                  <p>{language === "zh" ? "登录后就可以发表评论了。" : "Sign in to unlock comments."}</p>
                  <button type="button" className="button button--solid" onClick={() => openLogin("visitor")}>
                    {language === "zh" ? "去登录" : "Sign in"}
                  </button>
                </div>
              )}

              <div className="comment-list">
                {activeComments.length ? (
                  activeComments
                    .slice()
                    .reverse()
                    .map((comment) => (
                      <article className="comment-card" key={comment.id}>
                        <div className="comment-card__avatar">{comment.author.slice(0, 1).toUpperCase()}</div>
                        <div className="comment-card__body">
                          <div className="comment-card__head">
                            <strong>{comment.author}</strong>
                            <span>@{comment.handle}</span>
                          </div>
                          <p>{comment.body}</p>
                        </div>
                        <div className="comment-card__side">
                          <time className="comment-card__time" dateTime={comment.createdAt}>
                            {new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }).format(new Date(comment.createdAt))}
                          </time>
                          {profile?.role === "admin" ? (
                            <button
                              type="button"
                              className="comment-card__delete"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              {language === "zh" ? "删除" : "Delete"}
                            </button>
                          ) : null}
                        </div>
                      </article>
                    ))
                ) : (
                  <div className="empty-state">
                    <MessageCircle aria-hidden />
                    <p>{language === "zh" ? "还没有评论，来抢个沙发吧。" : "No comments yet. Be the first one."}</p>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section section--contact" id="contact">
        <FadeIn>
          <SectionHeader eyebrow={copy.contact.eyebrow} title={copy.contact.title} index="05" />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="contact-card">
            <div>
              <p className="contact-card__body">{copy.contact.body}</p>
              <div className="contact-card__links">
                <a className="social-link social-link--inline" href="mailto:4061733@hdu.edu.cn">
                  <Mail aria-hidden />
                  <span>{copy.contact.emails[0].value}</span>
                </a>
                <a className="social-link social-link--inline" href="mailto:400136344@qq.com">
                  <Mail aria-hidden />
                  <span>{copy.contact.emails[1].value}</span>
                </a>
              </div>
            </div>

            <div className="contact-card__meta">
              <div>
                <span className="contact-label">Email</span>
                <div className="contact-value contact-value--stack">
                  {copy.contact.emails.map((email) => (
                    <a key={email.value} href={`mailto:${email.value}`}>
                      {email.label}: {email.value}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <span className="contact-label">{copy.contact.phoneLabel}</span>
                <a className="contact-value" href={`tel:${copy.contact.phone}`}>
                  {copy.contact.phone}
                </a>
              </div>
              <div>
                <span className="contact-label">{copy.contact.locationLabel}</span>
                <span className="contact-value">{copy.contact.location}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <footer className="footer">
        <p>
          {language === "zh"
            ? "如果你愿意，我可以继续把这个博客接到真正的后端账号系统。"
            : "If you want, I can wire this blog to a real backend auth system next."}
        </p>
      </footer>

      {authOpen ? (
        <div className="auth-overlay" role="presentation" onClick={closeLogin}>
          <div className="auth-card" role="dialog" aria-modal="true" aria-label="Login dialog" onClick={(event) => event.stopPropagation()}>
            <div className="auth-card__head">
              <div>
                <p className="eyebrow">{language === "zh" ? "登录" : "Sign in"}</p>
                <h3>{language === "zh" ? "创建一个访客身份" : "Create a visitor profile"}</h3>
              </div>
              <button type="button" className="auth-close" onClick={closeLogin}>
                ×
              </button>
            </div>
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <label className="field">
                <span>{language === "zh" ? "显示名称" : "Display name"}</span>
                <input
                  value={profileDraft.name}
                  onChange={(event) => setProfileDraft((current) => ({ ...current, name: event.target.value }))}
                  placeholder={language === "zh" ? "例如：Alex" : "For example: Alex"}
                />
              </label>
              <label className="field">
                <span>{language === "zh" ? "用户名 / ID" : "Username / ID"}</span>
                <input
                  value={profileDraft.handle}
                  onChange={(event) => setProfileDraft((current) => ({ ...current, handle: event.target.value }))}
                  placeholder={language === "zh" ? "例如：alex_01" : "For example: alex_01"}
                />
              </label>
              <label className="field">
                <span>{language === "zh" ? "一句简介" : "Short bio"}</span>
                <textarea
                  value={profileDraft.bio}
                  onChange={(event) => setProfileDraft((current) => ({ ...current, bio: event.target.value }))}
                  rows={3}
                  placeholder={language === "zh" ? "你是谁，你对什么感兴趣" : "Who you are and what you care about"}
                />
              </label>
              <button type="submit" className="button button--solid">
                {language === "zh" ? "进入网站" : "Enter site"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
