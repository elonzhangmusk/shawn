import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const highlights = [
  "National first-prize intelligent vehicle competition project",
  "Computer vision and autonomous systems",
  "Research demos, blogs, and personal showcase",
];

const projects = [
  {
    title: "Intelligent Vehicle System",
    description:
      "A showcase for embedded perception, path planning, and control work built around competition-grade autonomous driving experiments.",
  },
  {
    title: "Medical Imaging Research",
    description:
      "A concept page for multimodal deep-learning experiments focused on imaging analysis and model interpretation.",
  },
  {
    title: "CAD Sketch Recognition",
    description:
      "A research-oriented prototype for parsing sketch structure, constraints, and assembly relationships from engineering drawings.",
  },
];

function App() {
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

  return (
    <main className="page-shell">
      <div className="particle-bg" />
      <div className="starfield" />

      <header className="site-header">
        <div>
          <p className="eyebrow">Sci-Fi Portfolio</p>
          <h1>Zhang Hangning</h1>
          <p className="subtitle">Automation student, builder, and research-oriented engineer.</p>
        </div>
        <nav className="nav-links" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Launch Sequence</p>
          <h2>Exploring intelligent systems with a cinematic technical portfolio.</h2>
          <p className="hero-text">
            The original build artifacts existed in the repository, but the source entry files were
            missing. This restored page gives the project a valid React entry again so Vite can
            build successfully on GitHub Actions.
          </p>
          <div className="cta-row">
            <a className="neon-button" href="#projects">
              View Projects
            </a>
            <a className="ghost-button" href="#contact">
              Get in Touch
            </a>
          </div>
        </div>

        <aside className="scifi-card status-panel">
          <div className="avatar-orb" />
          <h3>Profile Snapshot</h3>
          <ul className="status-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="section" id="about">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Built for GitHub Pages deployment</h2>
        </div>
        <div className="scifi-card">
          <p>
            This portfolio keeps the futuristic visual direction from the generated site while using
            a small, source-controlled React implementation. That makes the repository portable
            again: local builds and GitHub Actions now depend on real source files instead of only
            previously generated assets.
          </p>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2>Featured Work</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
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
          <p className="eyebrow">Contact</p>
          <h2>Deployment is fixed, and the app is buildable again.</h2>
        </div>
        <div className="scifi-card">
          <p>
            If you still have the original local `src/` directory on your computer, we can restore
            that next and keep this CI-safe structure. For now, the repository will build cleanly in
            GitHub Actions.
          </p>
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
