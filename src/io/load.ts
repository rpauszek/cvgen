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
  return fs.readFileSync(path.join(iconsPath, `${name}.svg`), "utf-8");
}
