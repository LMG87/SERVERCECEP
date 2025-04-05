const router = require("express").Router();

const controller = require("../controllers/auth.controller");
const validation = require("../middlewares/validation");

router.get("/login", controller.login);
router.post("/", validation(1) , controller.create);

module.exports = router;