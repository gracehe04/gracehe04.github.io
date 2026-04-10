import { useState, useEffect, useRef } from "react";
import { FiMousePointer, FiMove } from "react-icons/fi";
import { HiHome, HiUser, HiCode, HiMail } from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";
import OnboardingTip from "./OnboardingTip";
import { useFirstVisit } from "../hooks/useFirstVisit";
import "./DesignShell.css";

const sectionMeta = {
  home:     { label: "Home",     Icon: HiHome },
  about:    { label: "About",    Icon: HiUser },
  projects: { label: "Projects", Icon: HiCode },
  footer:   { label: "Footer",  Icon: HiMail },
};

const lighten = (hex, amount = 0.25) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const to255 = (v) => Math.min(255, Math.round(v + (255 - v) * amount));
  return `#${[r, g, b].map(to255).map((v) => v.toString(16).padStart(2, "0")).join("")}`;
};

function DesignShell({ sections, theme, toggleTheme }) {
  const isFirstVisit = useFirstVisit();
  const [activeTool,   setActiveTool]   = useState("select");
  const [activeLayer,  setActiveLayer]  = useState("home");
  const [sectionOrder, setSectionOrder] = useState(sections.map((s) => s.id));
  const [accentColor,  setAccentColor]  = useState("#60a5fa");
  const [bgColor,      setBgColor]      = useState(null);
  const [cardBg,       setCardBg]       = useState(null);
  const [dragOverId,   setDragOverId]   = useState(null);
  const dragItem = useRef(null);

  // Push colors into CSS variables live
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accentColor);
    document.documentElement.style.setProperty("--accent-light", lighten(accentColor));
  }, [accentColor]);

  useEffect(() => {
    if (bgColor) document.documentElement.style.setProperty("--bg-color", bgColor);
  }, [bgColor]);

  useEffect(() => {
    if (cardBg) {
      document.documentElement.style.setProperty("--card-bg", cardBg);
      document.documentElement.style.setProperty("--tag-bg", lighten(cardBg, 0.1));
    }
  }, [cardBg]);

  // Sync active layer when user scrolls the canvas
  useEffect(() => {
    const observers = [];
    sectionOrder.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLayer(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionOrder]);

  const scrollTo = (id) => {
    setActiveLayer(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Drag to reorder ──
  const onDragStart = (id) => { dragItem.current = id; };
  const onDragOver  = (e, id) => { e.preventDefault(); setDragOverId(id); };
  const onDragEnd   = () => { dragItem.current = null; setDragOverId(null); };
  const onDrop      = (targetId) => {
    if (!dragItem.current || dragItem.current === targetId) { setDragOverId(null); return; }
    const next = [...sectionOrder];
    const from = next.indexOf(dragItem.current);
    const to   = next.indexOf(targetId);
    next.splice(from, 1);
    next.splice(to, 0, dragItem.current);
    setSectionOrder(next);
    dragItem.current = null;
    setDragOverId(null);
  };

  const orderedSections = sectionOrder.map((id) => sections.find((s) => s.id === id));
  const activeMeta      = sectionMeta[activeLayer] || sectionMeta.home;

  return (
    <div className="design-app">

      {/* ── Toolbar ── */}
      <header className="design-toolbar">
        <div className="toolbar-left">
          <img src="/favicon.ico" alt="logo" className="toolbar-logo" />
          <div className="toolbar-divider" />
          <button
            className={`tool-btn ${activeTool === "select" ? "tool-btn--active" : ""}`}
            onClick={() => setActiveTool("select")}
            // </div>data-tooltip="Click sections to select (V)"
          >
            <FiMousePointer size={15} />
          </button>
          <button
            className={`tool-btn ${activeTool === "hand" ? "tool-btn--active" : ""}`}
            onClick={() => setActiveTool("hand")}
            // data-tooltip="Scroll through sections (H)"
          >
            <FiMove size={15} />
          </button>
        </div>

        <div className="toolbar-center">
          <span className="toolbar-filename">grace-portfolio</span>
        </div>

        <div className="toolbar-right">
          <button className="toolbar-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <a href="mailto:gh2313@nyu.edu" className="toolbar-btn toolbar-btn--primary">
            Contact
          </a>
        </div>
      </header>

      {/* ── Workspace ── */}
      <div className="design-workspace">

        {/* Left panel — Layers */}
        <aside className="design-panel design-panel--left">
          <div className="panel-header">Layers</div>
          <div className="panel-body">
            <div className="panel-section-label" style={{ position: "relative" }}>
              Pages
              {isFirstVisit && (
                <OnboardingTip
                  text="Drag to reorder sections!"
                  tail="right"
                  style={{ top: "-4px", left: "calc(100% + 10px)" }}
                />
              )}
            </div>
            {sectionOrder.map((id) => {
              const { label, Icon } = sectionMeta[id];
              return (
                <div
                  key={id}
                  className={[
                    "layer-item",
                    activeLayer === id  ? "layer-item--active"    : "",
                    dragOverId  === id  ? "layer-item--drag-over" : "",
                  ].join(" ")}
                  onClick={() => scrollTo(id)}
                  draggable
                  onDragStart={() => onDragStart(id)}
                  onDragOver={(e) => onDragOver(e, id)}
                  onDrop={() => onDrop(id)}
                  onDragEnd={onDragEnd}
                >
                  <span className="drag-handle"><MdDragIndicator size={14} /></span>
                  <span className="layer-icon"><Icon size={13} /></span>
                  <span className="layer-label">{label}</span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Canvas */}
        <main className="design-canvas">
          <div className="design-page">
            {orderedSections.map(({ id, Component }) => (
              <div
                key={id}
                className={[
                  "section-wrapper",
                  activeLayer === id ? "section-wrapper--selected"    : "",
                  dragOverId  === id ? "section-wrapper--drop-target" : "",
                ].join(" ")}
                onClick={() => setActiveLayer(id)}
                onDragOver={(e) => onDragOver(e, id)}
                onDrop={() => onDrop(id)}
              >
<Component />
              </div>
            ))}
          </div>
        </main>

        {/* Right panel — Properties */}
        <aside className="design-panel design-panel--right">
          <div className="panel-header">Design</div>
          <div className="panel-body">

            {/* Active section label */}
            <div className="panel-selection-badge">
              <activeMeta.Icon size={12} />
              <span>{activeMeta.label}</span>
            </div>

            {/* Color pickers */}
            <div className="panel-section-label" style={{ marginTop: "1rem" }} data-tooltip="try changing the color!">Accent</div>
            <div className="color-row">
              <label className="color-input-wrapper">
                <div className="color-swatch-preview" style={{ background: accentColor }} />
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="color-input-hidden" />
              </label>
              <span className="color-hex">{accentColor.replace("#", "").toUpperCase()}</span>
              <span className="color-opacity">Accent</span>
            </div>
            <div className="color-row">
              <div className="color-swatch-preview" style={{ background: lighten(accentColor) }} />
              <span className="color-hex">{lighten(accentColor).replace("#", "").toUpperCase()}</span>
              <span className="color-opacity">Light</span>
            </div>

            <div className="panel-section-label" style={{ marginTop: "1.25rem" }}>Background</div>
            <div className="color-row">
              <label className="color-input-wrapper">
                <div className="color-swatch-preview" style={{ background: bgColor || (theme === "dark" ? "#0f0f14" : "#ffffff") }} />
                <input type="color" value={bgColor || (theme === "dark" ? "#0f0f14" : "#ffffff")} onChange={(e) => setBgColor(e.target.value)} className="color-input-hidden" />
              </label>
              <span className="color-hex">{(bgColor || (theme === "dark" ? "#0f0f14" : "#ffffff")).replace("#", "").toUpperCase()}</span>
              <span className="color-opacity">Page</span>
            </div>
            <div className="color-row">
              <label className="color-input-wrapper">
                <div className="color-swatch-preview" style={{ background: cardBg || (theme === "dark" ? "#1a1a24" : "#f0f7ff") }} />
                <input type="color" value={cardBg || (theme === "dark" ? "#1a1a24" : "#f0f7ff")} onChange={(e) => setCardBg(e.target.value)} className="color-input-hidden" />
              </label>
              <span className="color-hex">{(cardBg || (theme === "dark" ? "#1a1a24" : "#f0f7ff")).replace("#", "").toUpperCase()}</span>
              <span className="color-opacity">Card</span>
            </div>

            <div className="panel-section-label" style={{ marginTop: "1.25rem" }}>Typography</div>
            <div className="prop-row">
              <span className="prop-label">Font</span>
              <span className="prop-value">Inter</span>
            </div>
            <div className="prop-row">
              <span className="prop-label">Weight</span>
              <span className="prop-value">700</span>
            </div>
            <div className="prop-row">
              <span className="prop-label">Size</span>
              <span className="prop-value">16px</span>
            </div>

            <div className="panel-section-label" style={{ marginTop: "1.25rem" }}>Dimensions</div>
            <div className="prop-row">
              <span className="prop-label">W</span>
              <span className="prop-value">900px</span>
            </div>
            <div className="prop-row">
              <span className="prop-label">H</span>
              <span className="prop-value">Auto</span>
            </div>
            <div className="prop-row">
              <span className="prop-label">R</span>
              <span className="prop-value">4px</span>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}

export default DesignShell;
