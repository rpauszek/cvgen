#!/usr/bin/env node
import nunjucks from "nunjucks";
import path from "node:path";
import fs from "node:fs";
import { loadCvYaml, loadSvg, loadCssFiles, getSkillIconName } from "@io/load";
import { generatePdf, saveHtmlDebug } from "@io/generate";
import { SkillsCategory } from "types";
import { themes, themeToCss } from "theme";

function resolveInputPath(): string {
  const examplePath = path.resolve(__dirname, "../example/cv.yml");
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.warn("No input provided. Using example file.");
    return examplePath;
  }

  const inputPath = path.resolve(args[0]);

  if (!fs.existsSync(inputPath)) {
    console.warn(`File not found: ${inputPath}`);
    console.warn("Falling back to example file.");
    return examplePath;
  }

  return inputPath;
}

function formatDates(dates: { start: string | number; end?: string | number }) {
  return dates.end ? `${dates.start}–${dates.end}` : `${dates.start}–Present`;
}

function enrichSkills(skills: SkillsCategory[]) {
  return skills.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      label: item,
      icon: group.useIcons ? getSkillIconName(item) : undefined,
    })),
  }));
}

async function main() {
  console.log(process.argv);

  const outputPathHtml = path.resolve(__dirname, "../output/cv.html");
  const outputPath = path.resolve(__dirname, "../output/cv.pdf");

  const inputPath = resolveInputPath();
  console.log("Using input:", inputPath);
  const data = loadCvYaml(inputPath);

  const selectedTheme = themes["tech-duo"]; // todo: use command line arg
  const themeCss = themeToCss(selectedTheme);
  const css = [themeCss, loadCssFiles(["setup", "main"])].join("\n");

  const templatePath = path.resolve(__dirname, "./templates");
  const env = nunjucks.configure(templatePath, {
    autoescape: false,
  });
  env.addGlobal("svg", (name: string) => {
    return new nunjucks.runtime.SafeString(loadSvg(name));
  });

  const html = nunjucks.render("template.njk", {
    ...data,
    experience: data.experience?.map((job) => ({
      ...job,
      dates: formatDates(job.dates),
    })),
    education: data.education?.map((edu) => ({
      ...edu,
      dates: formatDates(edu.dates),
    })),
    skills: enrichSkills(data.skills),
    styles: css,
  });

  saveHtmlDebug(html, outputPathHtml);
  await generatePdf(html, outputPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
