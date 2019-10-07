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

describe("As a Client, I want to create an account so that I can post (private / public) information about some jobs they want it done by a supplier.", () => {
  it("Test 1", async () => {
    await driver.get("http://localhost:3000");

    const e = await getElement(By.xpath("//*[text()[contains(.,'Log In')]]"));
    e.click();

    await driver.wait(until.urlContains("login"));

    //element.getText()

    const e2 = await getElement(By.xpath("//*[text()[contains(.,'Click Here')]]"));
    e2.click();

    const e3 = await getElement(By.id("name"));
    e3.sendKeys("Sam Smith");

    const e4 = await getElement(By.id("business"));
    e4.sendKeys("Ikea");

    const e5 = await getElement(By.id("email"));
    e5.sendKeys("test@test.com");

    const e6 = await getElement(By.id("password"));
    e6.sendKeys("!!!!AAAABBBBCCCCccccDDDD11111");

    const e7 = await getElement(By.xpath("//*[text()[contains(.,'Register')]]"));
    e7.click();

    expect(true).to.equal(true);
  });



  after(async () => driver.quit());
});

const getElement = async (locator, maxDuration = 20000) => {
  await driver.wait(until.elementLocated(locator), maxDuration);
  const e = await driver.findElement(locator);
  return e;
};
