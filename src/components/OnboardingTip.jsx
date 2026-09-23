import "./OnboardingTip.css";

/**
 * tail: "top" | "bottom" | "left" | "right"  — which side the arrow points from
 * duration: how long the tip stays visible, in seconds (fade in/out included)
 */
function OnboardingTip({ text, tail = "bottom", style = {}, duration = 5 }) {
  return (
    <div
      className={`onboarding-tip onboarding-tip--${tail}`}
      style={{ ...style, animationDuration: `${duration}s` }}
    >
      <span className="onboarding-tip__icon">✦</span>
      {text}
    </div>
  );
}

export default OnboardingTip;
