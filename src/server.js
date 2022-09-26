const express = require("express")
const cors= require("cors")
const TAGWebRoute = require("./routes/TAGWebRoute")

const app = express();

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



app.listen(4200, () => console.log("Server started on port 4200"))

module.exports = app