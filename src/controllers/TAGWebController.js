const puppeteer = require("puppeteer");
const credentials = require("../../credentials.json");

const loadTAGWeb = async (req, res) => {
  const { username, password, url } = credentials.TAGWeb;

  console.log("\x1b[0m", "[started TAGWeb]");

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 50,
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  );

  let redirect = false;
  let isLoggedIn = false;

  try {
    /* ----------------------------------- Getting page ----------------------------------- */
    await page.goto(url, { waitUntil: "networkidle0" });

    /* ----------------------------------- Filling out username input ----------------------------------- */
    console.log("-- Entering username");
    await page.waitForSelector("#username");
    await page.type("#username", username);
    console.log("\x1b[0m", "Typed username");

    /* ----------------------------------- Filling out Password input ----------------------------------- */
    console.log("-- Entering Password");
    await page.type("#Password", password);
    console.log("\x1b[0m", "Typed Password");

    /* ----------------------------------- Submitting credentials ----------------------------------- */
    console.log("-- Submitting credentials");
    await page.click("#btnLoginButton");
    console.log("Submited credentials!");

    /* ----------------------------------- Handle results ----------------------------------- */

    // If there is another open session:
    if ((await page.$("#DivSession")) !== null) {
      console.log(
        "You already have an open Session or you didn't close the previous one."
      );
      redirect = true;
    }

    redirect &&
      (console.log("Clicking ~here~ to use this session"),
      await page.screenshot({
        path: "anotherSessionAlert.png", // Image Dimensions : 800 x 600
      }),
      await page.click("a", { delay: 100 }),
      console.log("here button clicked"));

    // If network error (not able to reproduce yet)

    // If logIn succeds
    await page.waitForSelector("#divEndSession > a");
    /* ----------------------------------- Checking if user is logged in ----------------------------------- */

    if ((await page.$("#btnLogout")) !== null) {
      console.log("User is logged in");
      await page.screenshot({
        path: "loadedContent.png", // Image Dimensions : 800 x 600
      });
      isLoggedIn = true;
    }

    /* ----------------------------------- Logging out  ----------------------------------- */
    isLoggedIn &&
      (await page.click("#btnLogout", { delay: 1000 }),
      console.log("Log Out button clicked"));

    /* ----------------------------------- Logging in  ----------------------------------- */
    !isLoggedIn &&
      (await page.click("#btnLogin", { delay: 1000 }),
      console.log("Log In button clicked"));

    /* ----------------------------------- Disconnecting session  ----------------------------------- */
    await page.waitForSelector("#divEndSession > a");
    console.log("Clicking Disconnect button");
    await page.click("#divEndSession > a", { delay: 200 });
    console.log("Disconnect button clicked");

    await page.screenshot({
      path: "loggedOut.png", // Image Dimensions : 800 x 600
    });

    /* ----------------------------------- Closing browser  ----------------------------------- */
    await page.waitForSelector("#btnLoginButton");
    console.log("Logged out. Closing browser");
    await browser.close();
    //   res.json("Bot completed the task successfully")

    console.log("Browser closed");
  } catch (error) {
    //   res.json("something bad happened")
    console.error(error.message);
  }
};

module.exports = { loadTAGWeb };
