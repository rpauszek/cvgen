#!/usr/bin/env node
import nunjucks from "nunjucks";
import path from "path";
import fs from "fs";
import YAML from "yaml";
import something from "@render/test";
import { CvData } from "types";

export function loadCvYaml(cvPath: string): CvData {
  const file = fs.readFileSync(cvPath, "utf-8");
  return YAML.parse(file);
}

console.log("Hello CV Generator 👋");
something();

const examplePath = path.resolve(__dirname, "../example/cv.yml")
console.log(examplePath)

const data = loadCvYaml(examplePath);
console.log(data)

const templatePath = path.resolve(__dirname, "./templates");
nunjucks.configure(templatePath, {
  autoescape: true
});

const html = nunjucks.render("hello.njk", {
  title: "Hello Test",
  name: "Ray",
  subtitle: "CV Generator in Progress"
});

// console.log(html);

