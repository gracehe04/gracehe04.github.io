import { FaGithub } from 'react-icons/fa';

function Projects() {
const projectList = [
  {
    name: "MojiHands",
    description: "Hand gesture classification app using computer vision",
    link: "https://github.com/swe-students-fall2025/4-containers-the-lego-movie",
    //link: "demo video"
    technologies: ["Python", "Flask", "NumPy", "base64", "PIL", "MongoDB", "Mediapipe", "JavaScript"]
  },
  { 
    name: "AnimalSay", 
    description: "Python module for ASCII animal art + moods", 
    link: "https://github.com/swe-students-fall2025/3-python-package-team_jubilee",
    technologies: ["Python", "Pytest", "YAML"] 
  },
  { 
    name: "Roam", 
    description: "Beli for Travelling", 
    link: "https://github.com/swe-students-fall2025/2-web-app-team-gals", 
    //photo: require("../assets/roam.png"),
    technologies: ["Python", "MongoDB", "HTML", "CSS", "JavaScript"]
  },
  { 
    name: "Google Developers Group Platform", 
    description: "Showcases club events + mentorship opportunities", 
    link: "https://github.com/BAMOEQ/GDG_Website",
    technologies: ["React.js", "Flask", "HTML", "CSS"]
  },
  { 
    name: "Pawsome Companion", 
    description: "Pet adoption website, analyzes web traffic with Google Analytics", 
    link: "https://github.com/gracehe04/mypawsomecompanion",
    technologies: ["React", "TypeScript", "HTML", "CSS", "Google Analytics", "Google Tag Manager"]
  },
  { 
    name: "Negative Keywords Automation Script", 
    description: "Analyzes keywords based on the KPIs, identifying applicable negative keywords.", 
    link: "N/A",
    technologies: ["JavaScript", "Google Ads Scripts"]
  },
  { 
    name: "Budget Quality Checking Script", 
    description: "Validates 230 client budgets across 5,000+ data points", 
    link: "N/A",
    technologies: ["Python", "Pandas", "Numpy"]
  },
  { 
    name: "Snake Game", 
    description: "Simple Implementation of the classic Snake Game using React", 
    link: "https://github.com/gracehe04/snake-game",
    technologies: ["React", "JavaScript", "CSS"]
  }
];

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <p>Some projects I've worked on :)</p>
      <div className="project-grid">
        {projectList.map((project, index) => (
          <div className="project-card" key={index}>
            {project.photo && <img src={project.photo} alt={project.name} />  }
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.technologies && project.technologies.map((tech, i) => (
                <span key={i} className="tag">{tech}</span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
