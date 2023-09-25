const chrome = require("@sparticuz/chromium");
import puppeteer, { PuppeteerLaunchOptions } from "puppeteer-core";

// Path to chrome executable on different platforms
const chromeExecutables: Partial<Record<typeof process.platform, string>> = {
  linux: "/usr/bin/chromium-browser",
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

const getOptions = async (): Promise<PuppeteerLaunchOptions> => {
  if (!process.env.NEXT_PUBLIC_IS_DEV) {
    // In production, use the path of chrome-aws-lambda and its args
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath(),
      headless: chrome.headless,
    };
  }

  // During development use local chrome executable
  return {
    args: [],
    executablePath:
      chromeExecutables[process.platform] || chromeExecutables.linux,
  };
};
export default async function screenshot(url: string) {
  const options = await getOptions();

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(url, { waitUntil: "networkidle0" });
  const file = await page.screenshot({ type: "png" });
  browser.close();
  return file;
}
