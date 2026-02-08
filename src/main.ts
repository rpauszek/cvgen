#!/usr/bin/env node
import nunjucks from "nunjucks";
import path from "path";
import { loadCvYaml, loadSvg, loadCssFiles } from "@io/load";
import { generatePdf, saveHtmlDebug } from "@io/generate";

function formatDates(dates: { start: string | number; end?: string | number }) {
  return dates.end ? `${dates.start}–${dates.end}` : `${dates.start}–Present`;
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

  const html = nunjucks.render("hello.njk", {
    ...data,
    experience: data.experience?.map((job) => ({
      ...job,
      dates: formatDates(job.dates),
    })),
    styles: css,
  });

  saveHtmlDebug(html, outputPathHtml);
  await generatePdf(html, outputPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
