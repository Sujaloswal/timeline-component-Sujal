import { useRef } from "react";

export const useScrollSync = () => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  // TODO: implement synchronized scroll logic and throttling.
  return { leftRef, rightRef };
};

