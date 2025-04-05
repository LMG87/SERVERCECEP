const router = require("express").Router();

const controller = require("../controllers/rol.controller");
const validation = require("../middlewares/validation");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", validation(1) ,controller.create);
router.put("/:id", validation(1) , controller.update);
router.delete("/:id", validation(1) , controller.deleted);

module.exports = router;