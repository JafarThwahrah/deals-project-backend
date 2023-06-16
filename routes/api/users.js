const express = require("express");
const router = express.Router();
const userController = require("../../controller/api/userController");
const { verifyPassport } = require("../../middleware/verifyPassport");
const verifyAdmin = require("../../middleware/verifyAdmin");
router
  .route("/")
  .get(verifyPassport, verifyAdmin, userController.getAllUsers)
  .delete(verifyPassport, verifyAdmin, userController.destroy);

// router.route("/:id").get(userController.getSingleUser);

module.exports = router;
