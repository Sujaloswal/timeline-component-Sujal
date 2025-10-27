export const truncate = (s: string, max = 24) => (s.length > max ? s.slice(0, max - 1) + "…" : s);

