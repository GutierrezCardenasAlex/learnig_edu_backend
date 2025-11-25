const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PaymentRecord", paymentSchema);
