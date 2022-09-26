const express = require("express")
const cors= require("cors")

const TAGWebRoute = require("./routes/TAGWebRoute")
const app = express();


const {loadTAGWeb} = require("./controllers/TAGWebController")
const credentials= require("../credentials.json")
const {onTime, offTime} = credentials.TAGWeb
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use(TAGWebRoute)

setInterval(() => {
  // Check the time every minute
  console.log("Checking the time...");
  const date = new Date().toTimeString().split(":")
  const time = `${date[0]}:${date[1]} ${date[2].split(" ")[1]}`
  const finalTime = time.split(" ")[0]
  
  if((onTime === finalTime) || (offTime === finalTime) ) {
    console.log("Bot running...");
    loadTAGWeb()
  }  

}, 60000);

app.listen(4200, () => console.log("Server started on port 4200"))

module.exports = app