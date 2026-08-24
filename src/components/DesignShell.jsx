import { useState, useEffect, useRef } from "react";
import { FiMousePointer, FiMove, FiSun, FiMoon } from "react-icons/fi";
import { HiHome, HiUser, HiCode, HiMail } from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";
import OnboardingTip from "./OnboardingTip";
import ColorRow from "./ColorRow";
import { useFirstVisit } from "../hooks/useFirstVisit";
import { useDragReorder, reorder } from "../hooks/useDragReorder";
import { lighten, darken, setCssVars } from "../utils/color";
import "./DesignShell.css";

const fontOptions = [
  { label: "Inter",            value: "'Inter', sans-serif" },
  { label: "Roboto",           value: "'Roboto', sans-serif" },
  { label: "DM Sans",          value: "'DM Sans', sans-serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Space Mono",       value: "'Space Mono', monospace" },
];

const sectionMeta = {
  home:     { label: "Home",     Icon: HiHome },
  about:    { label: "About",    Icon: HiUser },
  projects: { label: "Projects", Icon: HiCode },
  footer:   { label: "Footer",  Icon: HiMail },
};

const PanelSectionLabel = ({ style, children, ...props }) => (
  <div className="panel-section-label" style={{ marginTop: "1.25rem", ...style }} {...props}>
    {children}
  </div>
);

function DesignShell({ sections }) {
  const isFirstVisit = useFirstVisit();
  const [activeTool,   setActiveTool]   = useState("select");
  const [activeLayer,  setActiveLayer]  = useState("home");
  const [sectionOrder, setSectionOrder] = useState(sections.map((s) => s.id));
  const [accentColor,  setAccentColor]  = useState("#60a5fa");
  const [bgColor,      setBgColor]      = useState(null);
  const [cardBg,       setCardBg]       = useState(null);
  const [textColor,    setTextColor]    = useState(null);
  const [fontFamily,   setFontFamily]   = useState(fontOptions[0].value);
  const [shellTheme,   setShellTheme]   = useState("dark");
  const canvasRef = useRef(null);

  // Push colors into CSS variables live
  useEffect(() => {
    setCssVars({
      "--accent":       accentColor,
      "--accent-light": lighten(accentColor),
      "--tag-bg":       lighten(accentColor, 0.75),
      "--tag-hover-bg": lighten(accentColor, 0.55),
      "--tag-text":     darken(accentColor, 0.35),
    });
  }, [accentColor]);

  useEffect(() => {
    if (bgColor) setCssVars({ "--bg-color": bgColor });
  }, [bgColor]);

  useEffect(() => {
    if (cardBg) setCssVars({ "--card-bg": cardBg, "--tag-bg": lighten(cardBg, 0.1) });
  }, [cardBg]);

  useEffect(() => {
    if (textColor) setCssVars({ "--text-color": textColor });
  }, [textColor]);

  useEffect(() => {
    setCssVars({ "--font-family": fontFamily });
  }, [fontFamily]);

  // Sync active layer when user scrolls the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleScroll = () => {
      const trigger = canvas.getBoundingClientRect().top + canvas.clientHeight * 0.4;
      let active = sectionOrder[0];
      for (const id of sectionOrder) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= trigger) active = id;
      }
      setActiveLayer(active);
    };
    canvas.addEventListener("scroll", handleScroll, { passive: true });
    return () => canvas.removeEventListener("scroll", handleScroll);
  }, [sectionOrder]);

  const scrollTo = (id) => {
    setActiveLayer(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { dragOverKey: dragOverId, getDragProps, getDropProps } = useDragReorder(
    (fromId, toId) =>
      setSectionOrder((order) =>
        reorder(order, order.indexOf(fromId), order.indexOf(toId))
      )
  );

  const orderedSections = sectionOrder.map((id) => sections.find((s) => s.id === id));
  const activeMeta      = sectionMeta[activeLayer] || sectionMeta.home;

  return (
    <div className="design-app" data-shell={shellTheme}>

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
          <button
            className="toolbar-btn"
            onClick={() => setShellTheme(shellTheme === "dark" ? "light" : "dark")}
            title="Toggle shell theme"
          >
            {shellTheme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
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
                  {...getDragProps(id)}
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
        <main className="design-canvas" ref={canvasRef}>
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
                {...getDropProps(id)}
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
            <PanelSectionLabel style={{ marginTop: "1rem" }} data-tooltip="customize your experience!">Accent</PanelSectionLabel>
            <ColorRow label="Accent" value={accentColor} onChange={setAccentColor} />
            <ColorRow label="Light" value={lighten(accentColor)} />

            <PanelSectionLabel>Background</PanelSectionLabel>
            <ColorRow label="Page" value={bgColor || "#ffffff"} onChange={setBgColor} />
            <ColorRow label="Card" value={cardBg || "#f0f7ff"} onChange={setCardBg} />

            <PanelSectionLabel>Typography</PanelSectionLabel>
            <div className="prop-row" style={{ flexDirection: "column", alignItems: "stretch", gap: "0.4rem" }}>
              <span className="prop-label">Font</span>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="font-select"
              >
                {fontOptions.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            <PanelSectionLabel>Text Color</PanelSectionLabel>
            <ColorRow label="Text" value={textColor || "#1a1a1a"} onChange={setTextColor} />

            <PanelSectionLabel>Dimensions</PanelSectionLabel>
            {[["W", "900px"], ["H", "Auto"], ["R", "4px"]].map(([label, value]) => (
              <div className="prop-row" key={label}>
                <span className="prop-label">{label}</span>
                <span className="prop-value">{value}</span>
              </div>
            ))}

          </div>
        </aside>

      </div>
    </div>
  );
}

export default DesignShell;
