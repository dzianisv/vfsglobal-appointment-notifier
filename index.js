const puppeteer = require('puppeteer');
const config = require("./config.json");


async function go(page) {
  await page.goto('https://visa.vfsglobal.com/can/en/nld/dashboard');
  await page.waitForNavigation();

  // Login Page
  try {
    const buttonXPath = "//button/span[contains(text(), 'Sign In')]";
    await page.waitForXPath(buttonXPath, {timeout: 5000});

    const signInButtonXPath = await page.$x(buttonXPath);

    await page.waitForSelector("#mat-input-0");
    await page.type("#mat-input-0", config.username);

    await page.waitForSelector("#mat-input-1");
    await page.type("#mat-input-1", config.password);

    await signInButtonXPath[0].click();
  } catch (err) {
    console.log("No Sign In Page", err);
  }

  // Dashboard Page
  console.log("Start New Booking");
  {
    const xpath = "//button/span[contains(text(), ' Start New Booking ')]";
    await page.waitForXPath(xpath);
    let objects = await page.$x(xpath);
    await objects[1].click();
  }

  console.log("Select Vancouver Apllication center");
  {
    await page.click("#mat-select-0");
    const xpath = "//span[contains(text(), 'Netherlands-Canada-Visa Application center - Vancouver')]";
    await page.waitForXPath(xpath);
    await (await page.$x(xpath))[1].click();
  }

  console.log("Select Short-stay Schenge visa");
  {
    await page.click("#mat-select-4");
    const xpath = "//span[contains(text(), 'Short-stay Schengen visa')]";
    await page.waitForXPath(xpath);
    await (await page.$x(xpath))[1].click();
  }

  await page.waitForNavigation();
  const text = await page.evaluate(() => document.querySelector('div.alert').innerText);
  return text;
}

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
  try {
    const buttonXPath = "//button/span[contains(text(), 'Sign In')]";
    await page.waitForXPath(buttonXPath, {timeout: 5000});

    const signInButtonXPath = await page.$x(buttonXPath);

    await page.waitForSelector("#mat-input-0");
    await page.type("#mat-input-0", config.username);

    await page.waitForSelector("#mat-input-1");
    await page.type("#mat-input-1", config.password);

    await signInButtonXPath[0].click();
  } catch (err) {
    console.log("No Sign In Page", err);
  }

  // Dashboard Page
  console.log(" Start New Booking ");
  {
    await page.waitForTimeout(5000);
    const xpath = "//button/span[contains(text(), ' Start New Booking ')]";
    await page.waitForXPath(xpath);
    let objects = await page.$x(xpath);
    console.log(objects);
    await objects[1].click();
  }

  console.log("Select Vancouver Apllication center");
  {
    await page.waitForSelector("#mat-select-0")
    await page.click("#mat-select-0");
    const xpath = "//span[contains(text(), 'Netherlands-Canada-Visa Application center - Vancouver')]";
    await page.waitForXPath(xpath);
    const objects = await page.$x(xpath);
    console.log(objects);
    objects[0].click();
  }

  console.log("Select Short-stay Schengen visa");
  {
    await page.waitForSelector("#mat-select-4");
    await page.click("#mat-select-4");
    const xpath = "//span[contains(text(), ' Short-stay Schengen visa ')]";
    await page.waitForXPath(xpath);
    const objects = await page.$x(xpath);
    console.log(objects);
    objects[0].click();
  }

  await page.waitForNavigation();
  const text = await page.evaluate(() => document.querySelector('div.alert').innerText);
  console.log(text);
  await browser.close();
})();