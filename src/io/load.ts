import path from "path";
import fs from "fs";
import YAML from "yaml";
import { CvData } from "../types";

export function loadCvYaml(cvPath: string): CvData {
  const file = fs.readFileSync(cvPath, "utf-8");
  return YAML.parse(file);
}

export function loadSvg(name: string): string {
  const iconsPath = path.resolve(__dirname, "../icons");
  let svg = fs.readFileSync(path.join(iconsPath, `${name}.svg`), "utf-8");

  return (
    svg
      // Remove XML header
      .replace(/<\?xml.*?\?>\s*/g, "")
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // Remove width/height attributes
      .replace(/\s(width|height)="[^"]*"/g, "")
      // Remove inline fill styles
      .replace(/fill="[^"]*"/g, 'fill="currentColor"')
      .replace(/style="[^"]*"/g, "")
      .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
      .replace(/<svg/, '<svg fill="currentColor"')
  );
}

export function loadCssFiles(names: string[]): string {
  const stylesPath = path.resolve(__dirname, "../styles");
  return names
    .map((file) => {
      const fullPath = path.join(stylesPath, `${file}.css`);
      return fs.readFileSync(fullPath, "utf-8");
    })
    .join("\n\n");
}

const SKILL_ICON_MAP: Record<string, string> = {
  "c++": "cpp",
  "qml": "qt",
};

export function getSkillIconName(skill: string): string | undefined {
  const normalized = skill.toLowerCase();

  // check if special case
  const iconName = SKILL_ICON_MAP[normalized] ?? normalized;

  // check if file exists
  const ICONS_DIR = path.resolve(__dirname, "../icons");
  const iconPath = path.join(ICONS_DIR, `${iconName}.svg`);
  if (fs.existsSync(iconPath)) {
    return iconName;
  }

  // file doesn't exist, no icon
  return undefined;
}

