export interface Theme {
  colors: Record<string, string>;
}

export const themes: Record<string, Theme> = {
  classic: {
    colors: {
      "color-bg": "#ffffff",
      "color-text": "#111111",
      "color-muted": "#8a8a8a",
      "color-accent": "#2b6cb0",
      "color-summary-bg": "#c7daf5",
      "color-summary-text": "#111111"
    },
  },
  dark: {
    colors: {
      "color-bg": "#0f172a",
      "color-text": "#e5e7eb",
      "color-muted": "#94a3b8",
      "color-accent": "#38bdf8",
      "color-summary-bg": "#38bdf8",
      "color-summary-text": "#111111"
    },
  },
  sleek: {
    colors: {
      "color-bg": "#f5f7fa",
      "color-text": "#212529",
      "color-muted": "#6c757d",
      "color-accent": "#17a2b8",
      "color-summary-bg": "#d1ecf1",
      "color-summary-text": "#0c5460"
    },
  },
  modern: {
    colors: {
      "color-bg": "#ffffff",
      "color-text": "#222222",
      "color-muted": "#7d7d7d",
      "color-accent": "#ff6f61",
      "color-summary-bg": "#ffe6e1",
      "color-summary-text": "#222222"
    },
  },
   "tech-duo": {
    colors: {
      "color-bg": "#f0f4f8",
      "color-text": "#1a202c",
      "color-muted": "#f1531a",
      "color-accent": "#3182ce",
      "color-summary-bg": "#bee3f8",
      "color-summary-text": "#1a202c",
    },
  },
  "neo-mint": {
    colors: {
      "color-bg": "#ffffff",
      "color-text": "#1a1a1a",
      "color-accent": "#3bc9a6",
      "color-muted": "#ff6f61",
      "color-summary-bg": "#c8f7e8",
      "color-summary-text": "#1a1a1a",
    },
  },
  "bold-sunset": {
    colors: {
      "color-bg": "#ffffff",
      "color-text": "#222222",
      "color-muted": "#d97706",
      "color-accent": "#f59e0b",
      "color-summary-bg": "#fef3c7",
      "color-summary-text": "#92400e",
    },
  },
  "electric-lime": {
    colors: {
      "color-bg": "#ffffff",
      "color-text": "#222222",
      "color-muted": "#65a30d",
      "color-accent": "#84cc16",
      "color-summary-bg": "#d9f99d",
      "color-summary-text": "#4d7c0f",
    },
  },
};

export function themeToCss(theme: Theme): string {
  const vars = Object.entries(theme.colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");

  return `:root {\n${vars}\n}`;
}
