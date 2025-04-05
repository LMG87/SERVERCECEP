const router = require("express").Router();
const multer = require("multer");
const storage = require("../middlewares/user-avatar.multer")

const controller = require("../controllers/user.controller");
const validation = require("../middlewares/validation");

const uploader = multer({storage});

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", validation(1) , controller.update);
router.delete("/:id", validation(1) , controller.deleted);
router.post("/images/avatar/:id",uploader.single('avatar'), controller.uploadAvatar)

module.exports = router;