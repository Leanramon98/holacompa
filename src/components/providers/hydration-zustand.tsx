"use client";

import { useEffect, useState } from "react";

/**
 * Component to prevent hydration mismatch when using localStorage-based stores.
 * It only renders children after the client has hydrated.
 */
export function HydrationZustand({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // Or a skeleton/loading spinner
  }

  return <>{children}</>;
}
