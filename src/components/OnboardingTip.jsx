import "./OnboardingTip.css";

/**
 * tail: "top" | "bottom" | "left" | "right"  — which side the arrow points from
 */
function OnboardingTip({ text, tail = "bottom", style = {} }) {
  return (
    <div className={`onboarding-tip onboarding-tip--${tail}`} style={style}>
      <span className="onboarding-tip__icon">✦</span>
      {text}
    </div>
  );
}

export default OnboardingTip;
