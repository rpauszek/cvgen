#!/usr/bin/env node
import nunjucks from "nunjucks";
import path from "path";
import something from "@render/test";

console.log("Hello CV Generator 👋");
something();


const templatePath = path.resolve(__dirname, "./templates");
nunjucks.configure(templatePath, {
  autoescape: true
});

const html = nunjucks.render("hello.njk", {
  title: "Hello Test",
  name: "Ray",
  subtitle: "CV Generator in Progress"
});

console.log(html);

