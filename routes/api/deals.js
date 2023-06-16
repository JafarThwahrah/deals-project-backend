const express = require("express");
const router = express.Router();
const dealsController = require("../../controller/api/dealController");
const { verifyPassport } = require("../../middleware/verifyPassport");
const verifyAdmin = require("../../middleware/verifyAdmin");

router.route("/").get(verifyPassport, dealsController.getAllDeals);
//   .delete(verifyPassport, userController.destroy);

router
  .route("/store")
  .post(verifyPassport, verifyAdmin, dealsController.storeDeal);

// router.route("/:id").get(userController.getSingleUser);

module.exports = router;
