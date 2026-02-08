#!/usr/bin/env node
import nunjucks from "nunjucks";
import path from "path";
import { loadCvYaml, loadSvg, loadCssFiles, getSkillIconName } from "@io/load";
import { generatePdf, saveHtmlDebug } from "@io/generate";
import { SkillsCategory } from "types";

function formatDates(dates: { start: string | number; end?: string | number }) {
  return dates.end ? `${dates.start}–${dates.end}` : `${dates.start}–Present`;
}

function enrichSkills(skills: SkillsCategory[]) {
  return skills.map(group => ({
    ...group,
    items: group.items.map(item => ({
      label: item,
      icon: group.useIcons ? getSkillIconName(item) : undefined,
    })),
  }));
}


async function main() {
  const examplePath = path.resolve(__dirname, "../example/cv.yml");
  const outputPathHtml = path.resolve(__dirname, "../output/cv.html");
  const outputPath = path.resolve(__dirname, "../output/cv.pdf");
  console.log(examplePath);

  const data = loadCvYaml(examplePath);
  const css = loadCssFiles(["setup", "main"]);

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
      dates: formatDates(edu.dates)
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
