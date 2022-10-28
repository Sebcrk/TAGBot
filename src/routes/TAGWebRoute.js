const {Router} = require("express")
const TAGWebController = require("../controllers/TAGWebController")


const router = Router()

// router.get("/", TAGWebController.loadTAGWeb)
router.post("/", TAGWebController.loadTAGWeb)

module.exports = router