const express = require("express");
const router = express.Router();

const {
  createOrder,
  approveOrder,
  rejectOrder,
  getAllOrders
} = require("../controllers/order.controller");

const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/createOrder", auth, isStudent, createOrder);
router.post("/approveOrder", auth, isAdmin, approveOrder);
router.post("/rejectOrder", auth, isAdmin, rejectOrder);
router.get("/getAllOrders", auth, isAdmin, getAllOrders);

module.exports = router;
