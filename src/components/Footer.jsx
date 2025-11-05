import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Grace He
      </p>
      <div className="footer-text">
        <a
          href="https://github.com/gracehe04"
          target="_blank"
          rel="noopener noreferrer"
          className="github"
          aria-label="GitHub"
        >
          <Github className="github" />
        </a>
        <a
          href="https://linkedin.com/in/gracehe04"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
          aria-label="LinkedIn"
        >
          <Linkedin className="linkedin" />
        </a>
      </div>
    </footer>
  );
}
