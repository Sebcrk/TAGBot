const { log } = require("console");
const puppeteer = require("puppeteer");
const credentials = require("../../credentials.json");

const delay = (seconds) => new Promise(resolve => {
    setTimeout(resolve, seconds*1000)
})

const loadTAGWeb = async (req, res) => {
  
  const {username, password } = req.body

  const { url } = credentials.TAGWeb

  console.log("\x1b[0m", "[started TAGWeb]");

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 10
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  );


  let isLoggedIn = false;

  try {
    /* ----------------------------------- Getting page ----------------------------------- */
    await page.goto(url);

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
    console.log(await page.$("#DivSession"))
    if ((await page.$("#DivSession")) !== null) {
      console.log(
        "You already have an open Session or you didn't close the previous one."
      );
      console.log("Clicking ~here~ to use this session");
      await page.screenshot({
        path: "anotherSessionAlert.png", // Image Dimensions : 800 x 600
      });
      await page.click("a"), console.log("here button clicked");
    }

    // If network error (not able to reproduce yet)
    // if ((await page.$("div.")) !== null) {
    //   console.log(
    //     "An error occurred while processing your request. Please verify you have network connectivity and access to Sykes Network"
    //   );
    //   console.log("Clicking ~here~ to try again");
    //   await page.screenshot({
    //     path: "networkError.png", // Image Dimensions : 800 x 600
    //   });
    //   await page.click("a", { delay: 100 }), console.log("here button clicked, going to Login again...");
      /* ----------------------------------- Filling out username input ----------------------------------- */
    //   console.log("-- Entering username");
    //   await page.waitForSelector("#username");
    //   await page.type("#username", username);
    //   console.log("\x1b[0m", "Typed username");
    
    //   /* ----------------------------------- Filling out Password input ----------------------------------- */
    //   console.log("-- Entering Password");
    //   await page.type("#Password", password);
    //   console.log("\x1b[0m", "Typed Password");
    
    //   /* ----------------------------------- Submitting credentials ----------------------------------- */
    //   console.log("-- Submitting credentials");
    //   await page.click("#btnLoginButton");
    //   console.log("Submited credentials!");
    // }

    // If logIn succeds
    await page.waitForSelector("#MainTag");
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
      (await page.click("#btnLogout"),
      console.log("Log Out button clicked"));

    /* ----------------------------------- Logging in  ----------------------------------- */
    !isLoggedIn &&
      (await page.click("#btnLogin"),
      console.log("Log In button clicked"));

    /* ----------------------------------- Disconnecting session  ----------------------------------- */
    console.log(Boolean(await page.$(".Processing")) )

    console.log("Waiting for Disconnect button");
    await page.waitForSelector("#divEndSession > a");
    let delayInSeconds = 3
    console.log(`Button found. Clicking Disconnect button in ${delayInSeconds} seconds`);
    await delay(delayInSeconds)
    await page.click("#divEndSession > a",);
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
  return res.json("Process completed");

  } catch (error) {
      //   res.json("something bad happened")
      console.error(error.message);
      return res.json(error.message)
  }
};

module.exports = { loadTAGWeb };
