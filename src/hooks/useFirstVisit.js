import { useState, useEffect } from "react";

export function useFirstVisit() {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("portfolio-onboarding");
    if (!seen) {
      setIsFirst(true);
      localStorage.setItem("portfolio-onboarding", "1");
    }
  }, []);

  return isFirst;
}
