import puppeteer from "puppeteer";
import fs from "fs";

export function saveHtmlDebug(html: string, outputPath: string) {
  fs.writeFileSync(outputPath, html, "utf-8");
  console.log(`Saved debug HTML to ${outputPath}`);
}

export async function generatePdf(htmlContent: string, outputPath: string): Promise<void> {
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
