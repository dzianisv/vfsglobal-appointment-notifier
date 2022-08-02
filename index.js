const puppeteer = require('puppeteer');
const config = require("./config.json");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: ".data"
  });
  const page = await browser.newPage();
  await page.goto('https://visa.vfsglobal.com/can/en/nld/dashboard');
  await page.waitForNavigation();

  // Login Page
  const signInButtonXPath = "//button/span[contains(text(), 'Sign In')]";
  if ((await page.$x(signInButtonXPath)).length > 0) {
    await page.waitForSelector("#mat-input-0");
    await page.type("#mat-input-0", config.username);

    await page.waitForSelector("#mat-input-1");
    await page.type("#mat-input-1", config.password);

    await page.$x(signInButtonXPath).click();
  }

  // Dashboard Page
  const bookButtonXPath = "//button/span[contains(text(), 'Start New Booking')]";
  await page.waitForXPath(bookButtonXPath);
  await page.waitForTimeout(10000);
  let buttons = await page.$x(bookButtonXPath);
  await buttons[0].click();

  await page.waitForNavigation();

  //Apoitment Details Page
  await page.click("#mat-select-0");
  await page.click("#mat-option-2"); // Vancouver

  await page.click("#mat-select-4");
  await page.click("#mat-option-5"); // Short-Term Visa

  await page.waitForNavigation();
  let alerts = await page.$("div.alert");
  let alertText = alerts[0].innerText;

  console.log(alertText);

  await browser.close();
})();