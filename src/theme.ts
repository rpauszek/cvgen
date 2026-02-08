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
};

export function themeToCss(theme: Theme): string {
  const vars = Object.entries(theme.colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");

  return `:root {\n${vars}\n}`;
}
