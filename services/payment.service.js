const crypto = require("crypto");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.validateCoursesAndGetTotal = async (courses, userId) => {
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return { ok: false, message: "Please provide Course IDs" };
  }

  let totalAmount = 0;

  for (const courseId of courses) {
    const course = await Course.findById(courseId);
    if (!course) return { ok: false, message: "Course not found" };

    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return { ok: false, message: "Student already enrolled" };
    }
    totalAmount += course.price;
  }

  return { ok: true, totalAmount };
};

exports.verifyRazorpaySignature = (order_id, payment_id, signature) => {
  const body = order_id + "|" + payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === signature;
};
