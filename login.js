// auto login on zerodha
const puppeteer = require("puppeteer");
const loginUrl = "https://kite.trade/connect/login?api_key=xqdriun7nu65mp4y";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto(loginUrl, { waitUntil: "networkidle0" });

  await page.type("input[type=text]", "HU0145");
  await page.type("input[type=password]", "Anandvyas1!");
  await page.click("button[type=submit]");

  await page.waitFor(1000);

  await page.type("input[type=password]", "438786");
  await page.click("button[type=submit]");

  await page.waitFor(2000);
  // await page.screenshot({ path: "./tmp/google.com.png" });
  await browser.close();
})();