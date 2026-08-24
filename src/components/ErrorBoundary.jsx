import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const boundaryLabel = this.props.sectionLabel
      ? ` in ${this.props.sectionLabel}`
      : "";
    console.error(`An application error occurred${boundaryLabel}.`, error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const message = this.props.sectionLabel
      ? `${this.props.sectionLabel} is temporarily unavailable.`
      : "This page is temporarily unavailable. Please refresh to try again.";

    return (
      <div
        role="alert"
        style={{
          padding: "2rem",
          color: "var(--text-color, #1a1a1a)",
          background: "var(--card-bg, #f0f7ff)",
          fontFamily: "inherit",
          textAlign: "center",
        }}
      >
        {message}
      </div>
    );
  }
}

export default ErrorBoundary;
