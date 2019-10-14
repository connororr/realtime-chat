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
  ],
};
chromeCapabilities.set("chromeOptions", chromeOptions);
const driver = new Builder().withCapabilities(chromeCapabilities).build();

describe("As a Client, I want to create an account so that I can post (private / public) information about some jobs they want it done by a supplier.", () => {
  it("Test 1", async () => {
    await driver.get("http://localhost:3000");

    const data = {
      name: "Sam Smith",
      business: "Ikea",
      email: "test@test.com",
      password: "!!!!AAAABBBBCCCCccccDDDD11111"
    };

    const e = await getElement(By.xpath("//*[text()[contains(.,'Log In')]]"));
    e.click();

    await driver.wait(until.urlContains("login"));

    const e2 = await getElement(
      By.xpath("//*[text()[contains(.,'Click Here')]]")
    );
    e2.click();

    const e3 = await getElement(By.id("name"));
    e3.sendKeys(data.name);

    const e4 = await getElement(By.id("business"));
    e4.sendKeys(data.business);

    const e5 = await getElement(By.id("email"));
    e5.sendKeys(data.email);

    const e6 = await getElement(By.id("password"));
    e6.sendKeys(data.password);

    const e7 = await getElement(
      By.xpath("//*[text()[contains(.,'Register')]]")
    );
    e7.click();

    await driver.wait(until.urlIs("http://localhost:3000/"));

    const e8 = await getElement(
      By.xpath(`//*[text()[contains(.,'${data.business}')]]`)
    );

    expect(e8 !== null).to.equal(true);
  });

  it("Test 2", async () => {
    await driver.get("http://localhost:3000");

    const e9 = await getElement(By.xpath("//*[text()[contains(.,'Profile')]]"));
    e9.click();

    const e10 = await getElement(By.xpath("//*[text()[contains(.,'Logout')]]"));
    e10.click();

    const data = {
      name: "Bill Brown",
      business: "Wrecker*&#@",
      email: "test@test.com",
      password: "!!!!AAAABBBBCasdfasdfCCCccccDDDD11asdfasdf111"
    };

    const e = await getElement(By.xpath("//*[text()[contains(.,'Log In')]]"));
    e.click();

    await driver.wait(until.urlContains("login"));

    const e2 = await getElement(
      By.xpath("//*[text()[contains(.,'Click Here')]]")
    );
    e2.click();

    const e3 = await getElement(By.id("name"));
    e3.sendKeys(data.name);

    const e4 = await getElement(By.id("business"));
    e4.sendKeys(data.business);

    const e5 = await getElement(By.id("email"));
    e5.sendKeys(data.email);

    const e6 = await getElement(By.id("password"));
    e6.sendKeys(data.password);

    const e7 = await getElement(
      By.xpath("//*[text()[contains(.,'Register')]]")
    );
    e7.click();

    await driver.wait(until.urlIs("http://localhost:3000/"));

    const e8 = await getElement(
      By.xpath(`//*[text()[contains(.,'${data.business}')]]`)
    );

    expect(e8 !== null).to.equal(true);
  });

  it("Test 3", async () => {
    await driver.get("http://localhost:3000");

    const e9 = await getElement(By.xpath("//*[text()[contains(.,'Profile')]]"));
    e9.click();

    const e10 = await getElement(By.xpath("//*[text()[contains(.,'Logout')]]"));
    e10.click();

    const data = {
      name: "Tory More",
      business: "Insulator",
      email: "testing@test.com",
      password: "asdfajsdfjlasdlf"
    };

    const e = await getElement(By.xpath("//*[text()[contains(.,'Log In')]]"));
    e.click();

    await driver.wait(until.urlContains("login"));

    const e2 = await getElement(
      By.xpath("//*[text()[contains(.,'Click Here')]]")
    );
    e2.click();

    const e3 = await getElement(By.id("name"));
    e3.sendKeys(data.name);

    const e4 = await getElement(By.id("business"));
    e4.sendKeys(data.business);

    const e5 = await getElement(By.id("email"));
    e5.sendKeys(data.email);

    const e6 = await getElement(By.id("password"));
    e6.sendKeys(data.password);

    const e7 = await getElement(
      By.xpath("//*[text()[contains(.,'Register')]]")
    );
    e7.click();

    await driver.wait(until.urlIs("http://localhost:3000/"));

    const e8 = await getElement(
      By.xpath(`//*[text()[contains(.,'${data.business}')]]`)
    );

    expect(e8 !== null).to.equal(true);
  });

  // after(async () => driver.quit());
});

const getElement = async (locator, maxDuration = 20000) => {
  await driver.wait(until.elementLocated(locator), maxDuration);
  const e = await driver.findElement(locator);
  return e;
};
