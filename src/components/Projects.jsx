import { useState, useRef } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import OnboardingTip from './OnboardingTip';
import { useFirstVisit } from '../hooks/useFirstVisit';

const initialProjects = [
  {
    name: "PantryPal",
    description: "Generate recipes based on the ingredients you have available in your pantry",
    link: "https://github.com/swe-students-fall2025/5-final-galls",
    deployment: "http://138.197.30.226:5001/",
    technologies: ["Python", "FastAPI", "Flask", "JavaScript", "MongoDB", "Pytest", "HTML", "CSS"],
  },
  {
    name: "MojiHands",
    description: "Hand gesture classification app using computer vision",
    link: "https://github.com/swe-students-fall2025/4-containers-the-lego-movie",
    technologies: ["Python", "Flask", "NumPy", "base64", "PIL", "MongoDB", "Mediapipe", "JavaScript"],
  },
  {
    name: "AnimalSay",
    description: "Python module for ASCII animal art + moods",
    link: "https://github.com/swe-students-fall2025/3-python-package-team_jubilee",
    technologies: ["Python", "Pytest", "YAML"],
  },
  {
    name: "Roam",
    description: "Beli for Travelling",
    link: "https://github.com/swe-students-fall2025/2-web-app-team-gals",
    technologies: ["Python", "MongoDB", "HTML", "CSS", "JavaScript"],
  },
  {
    name: "Google Developers Group Platform",
    description: "Showcases club events + mentorship opportunities for 500+ members",
    link: "https://github.com/BAMOEQ/GDG_Website",
    technologies: ["React.js", "Flask", "HTML", "CSS"],
  },
  {
    name: "Pawsome Companion",
    description: "Pet adoption website, analyzes web traffic with Google Analytics",
    link: "https://github.com/gracehe04/mypawsomecompanion",
    deployment: "https://mypawsomecompanions.netlify.app/",
    technologies: ["React", "TypeScript", "HTML", "CSS", "Google Analytics", "Google Tag Manager"],
  },
  {
    name: "Negative Keywords Automation Script",
    description: "Analyzes keywords based on the KPIs, identifying applicable negative keywords.",
    link: "N/A",
    technologies: ["JavaScript", "Google Ads Scripts"],
  },
  {
    name: "Budget Quality Checking Script",
    description: "Validates 230 client budgets across 5,000+ data points",
    link: "N/A",
    technologies: ["Python", "Pandas", "Numpy"],
  },
  {
    name: "Snake Game",
    description: "Simple Implementation of the classic Snake Game using React",
    link: "https://github.com/gracehe04/snake-game",
    technologies: ["React", "JavaScript", "CSS"],
  },
];

function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const dragIdx = useRef(null);
  const isFirstVisit = useFirstVisit();

  const onDragStart = (idx) => { dragIdx.current = idx; };
  const onDragOver  = (e, idx) => { e.preventDefault(); setDragOverIdx(idx); };
  const onDragEnd   = () => { dragIdx.current = null; setDragOverIdx(null); };
  const onDrop      = (targetIdx) => {
    if (dragIdx.current === null || dragIdx.current === targetIdx) {
      setDragOverIdx(null);
      return;
    }
    const next = [...projects];
    const [moved] = next.splice(dragIdx.current, 1);
    next.splice(targetIdx, 0, moved);
    setProjects(next);
    dragIdx.current = null;
    setDragOverIdx(null);
  };

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <p>Some projects I've worked on :)</p>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div
            className={`project-card ${dragOverIdx === index ? "project-card--drop-target" : ""}`}
            key={project.name}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDrop={() => onDrop(index)}
            onDragEnd={onDragEnd}
          >
            <div className="card-drag-handle" title="Drag to reorder">
              <MdDragIndicator size={14} />
            </div>
            {isFirstVisit && index === 0 && (
              <OnboardingTip
                text="Drag cards to reorder!"
                tail="bottom"
                style={{ top: "-38px", right: "8px" }}
              />
            )}
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.technologies && project.technologies.map((tech, i) => (
                <span key={i} className="tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.deployment && (
                <a href={project.deployment} target="_blank" rel="noopener noreferrer" className="deployment-link">
                  <FaLink size={21} style={{ marginRight: "0.5rem" }} />
                </a>
              )}
              {project.link && project.link !== "N/A" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                  <FaGithub size={24} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
