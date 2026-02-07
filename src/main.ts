#!/usr/bin/env node
import nunjucks from "nunjucks";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import YAML from "yaml";
import something from "@render/test";
import { CvData } from "types";

function loadCvYaml(cvPath: string): CvData {
  const file = fs.readFileSync(cvPath, "utf-8");
  return YAML.parse(file);
}

async function generatePdf(htmlContent: string, outputPath: string): Promise<void> {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1122 }); // A4 approx at 96dpi
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
  } finally {
    await browser.close();
  }
}

console.log("Hello CV Generator 👋");
something();

async function main() {
  const examplePath = path.resolve(__dirname, "../example/cv.yml");
  const outputPath = path.resolve(__dirname, "../output/cv.pdf");
  console.log(examplePath);

  const data = loadCvYaml(examplePath);
  console.log(data);

  const templatePath = path.resolve(__dirname, "./templates");
  nunjucks.configure(templatePath, {
    autoescape: true,
  });

  const html = nunjucks.render("hello.njk", {
    title: "Hello Test",
    name: "Ray",
    subtitle: "CV Generator in Progress",
  });

  // console.log(html);

  await generatePdf(html, outputPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
