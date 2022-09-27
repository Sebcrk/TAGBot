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
const check = () => {
  console.log("Checking the time...");
const date = new Date().toTimeString().split(":")
const time = `${date[0]}:${date[1]} ${date[2].split(" ")[1]}`
const finalTime = time.split(" ")[0]
console.log(finalTime);
if((onTime === finalTime) || (offTime === finalTime) ) {
  console.log("Bot running...");
  loadTAGWeb()
}  
}

check()
setInterval(() => {
  // Check the time every minute
check()

}, 600000);

app.listen(4200, () => console.log("Server started on port 4200"))

module.exports = app