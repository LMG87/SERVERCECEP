const router = require("express").Router();

const controller = require("../controllers/auth.controller");

router.get("/login", controller.login);
router.post("/", controller.create);

module.exports = router;