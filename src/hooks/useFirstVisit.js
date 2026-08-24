import { useState, useEffect } from "react";

export function useFirstVisit() {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    let seen;
    try {
      seen = localStorage.getItem("portfolio-onboarding");
    } catch (error) {
      console.warn("Unable to read portfolio onboarding state from localStorage.", error);
      return;
    }

    if (!seen) {
      setIsFirst(true);
      try {
        localStorage.setItem("portfolio-onboarding", "1");
      } catch (error) {
        console.warn("Unable to save portfolio onboarding state to localStorage.", error);
      }
    }
  }, []);

  return isFirst;
}
