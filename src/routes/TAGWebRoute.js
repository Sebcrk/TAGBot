const {Router} = require("express")
const TAGWebController = require("../controllers/TAGWebController")


const router = Router()

router.get("/", TAGWebController.loadTAGWeb)

module.exports = router