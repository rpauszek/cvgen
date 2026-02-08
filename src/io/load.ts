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
