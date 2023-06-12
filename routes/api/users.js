const express = require("express");
const router = express.Router();
const userController = require("../../controller/api/userController");
const { verifyPassport } = require("../../middleware/verifyPassport");
router.route("/").get(verifyPassport, userController.getAllUsers);
//   .delete(verifyPassport, userController.destroy);

// router.route("/:id").get(userController.getSingleUser);

module.exports = router;
