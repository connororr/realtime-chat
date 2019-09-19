const { Builder, By, until, Capabilities, Key } = require("selenium-webdriver");
const { expect } = require("chai");

let chromeCapabilities = Capabilities.chrome();
let chromeOptions = {
  /* --headless hides browser during tests */
  args: [
    "--disable-extensions",
    "--disable-extensions",
    "--ignore-certificate-errors",
    "no-sandbox" /*, "--headless"*/
  ]
};
chromeCapabilities.set("chromeOptions", chromeOptions);
const driver = new Builder().withCapabilities(chromeCapabilities).build();

describe("As a Client/Supplier, I want to search relevant job information from the main screen, so that I can find the information I need as soon as possible", () => {
  it("Test 1", async () => {
    await driver.get("http://localhost:3000");

    const filters = ["Roofing", "NSW"];
    filters.forEach(async field => {
      const e = await getElement(By.css(`option[value='${field}']`));
      e.click();
    });

    await driver.sleep(1000);

    const e = await getElement(By.xpath("//*[text()[contains(.,'FIND')]]"));
    e.click();
    //element.getText()
    await driver.wait(until.urlContains("search"));
    const url = await driver.getCurrentUrl();
    expect(new RegExp(filters.join("|")).test(url)).to.equal(true);
  });

  it("Test 2", async () => {
    await driver.get("http://localhost:3000");

    const filters = ["Rain Water Tanks", "ACT"];
    filters.forEach(async field => {
      const e = await getElement(By.css(`option[value='${field}']`));
      e.click();
    });

    await driver.sleep(1000);

    const e = await getElement(By.xpath("//*[text()[contains(.,'FIND')]]"));
    e.click();
    //element.getText()
    await driver.wait(until.urlContains("search"));
    const url = await driver.getCurrentUrl();
    expect(new RegExp(filters.join("|")).test(url)).to.equal(true);
  });

  it("Test 3", async () => {
    await driver.get("http://localhost:3000");

    const filters = ["Waterproofing", "SA"];
    filters.forEach(async field => {
      const e = await getElement(By.css(`option[value='${field}']`));
      e.click();
    });

    await driver.sleep(1000);

    const e = await getElement(By.xpath("//*[text()[contains(.,'FIND')]]"));
    e.click();
    //element.getText()
    await driver.wait(until.urlContains("search"));
    const url = await driver.getCurrentUrl();
    expect(new RegExp(filters.join("|")).test(url)).to.equal(true);
  });

  after(async () => driver.quit());
});

const getElement = async (locator, maxDuration = 20000) => {
  await driver.wait(until.elementLocated(locator), maxDuration);
  const e = await driver.findElement(locator);
  return e;
};
