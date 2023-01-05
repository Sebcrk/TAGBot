const express = require("express");
const cors = require("cors");

const TAGWebRoute = require("./routes/TAGWebRoute");
const app = express();

const { loadTAGWeb } = require("./controllers/TAGWebController");
const credentials = require("../credentials.json");
const { onTime, offTime } = credentials.TAGWeb;
app.use(cors());

app.use(express.json());

app.use(TAGWebRoute);

const checkTime = () => {
  const date = new Date().toTimeString().split(":");
  const time = `${date[0]}:${date[1]} ${date[2].split(" ")[1]}`;
  const finalTime = time.split(" ")[0];
  console.log("Checking the time every 30 minutes...", finalTime);

  if (onTime === finalTime || offTime === finalTime) {
    console.log("Bot running...");
    loadTAGWeb();
  }
};

checkTime();
setInterval(() => {
  // Check the time every 5 minutes
  checkTime();
}, 30*60*1000);

app.listen(4200, () => console.log("Server started on port 4200"));

module.exports = app;
