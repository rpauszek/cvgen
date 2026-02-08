#!/usr/bin/env node
import nunjucks from "nunjucks";
import path from "path";
import { loadCvYaml, loadSvg, loadCss } from "@io/load";
import { generatePdf, saveHtmlDebug } from "@io/generate";

async function main() {
  const examplePath = path.resolve(__dirname, "../example/cv.yml");
  const outputPathHtml = path.resolve(__dirname, "../output/cv.html");
  const outputPath = path.resolve(__dirname, "../output/cv.pdf");
  console.log(examplePath);

  const data = loadCvYaml(examplePath);
  // console.log(data);

  const templatePath = path.resolve(__dirname, "./templates");
  const env = nunjucks.configure(templatePath, {
    autoescape: false,
  });
  env.addGlobal("svg", (name: string) => {
    return new nunjucks.runtime.SafeString(loadSvg(name));
  });
  env.addGlobal("inlineCss", () => {
    return new nunjucks.runtime.SafeString(loadCss("main"));
  });

  const html = nunjucks.render("hello.njk", { ...data });

  saveHtmlDebug(html, outputPathHtml);
  await generatePdf(html, outputPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
