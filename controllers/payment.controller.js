const { instance } = require("../config/razorpay");
const PaymentRecord = require("../models/PaymentRecord");
const { validateCoursesAndGetTotal, verifyRazorpaySignature } = require("../services/payment.service");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

// =======================================
// 1. FLUJO AUTOMÁTICO (tu lógica actual) 
// =======================================

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  const validation = await validateCoursesAndGetTotal(courses, userId);
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message });
  }

  const options = {
    amount: validation.totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  const paymentResponse = await instance.orders.create(options);

  return res.status(200).json({ success: true, message: paymentResponse });
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
  const userId = req.user.id;

  if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return res.status(400).json({ success: false, message: "Invalid transaction" });
  }

  await enrollStudents(courses, userId);

  return res.status(200).json({
    success: true,
    message: "Payment Verified and Student Enrolled"
  });
};

// =======================================
// 2. FLUJO NUEVO: ADMINISTRATIVO
// =======================================

exports.capturePaymentAdmin = exports.capturePayment;

exports.verifyPaymentAdmin = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
  const userId = req.user.id;

  if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return res.status(400).json({ success: false, message: "Invalid transaction" });
  }

  await PaymentRecord.create({
    userId,
    courses,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
    status: "PENDING",
  });

  return res.status(200).json({
    success: true,
    message: "Payment verified — pending admin approval"
  });
};

// =======================================
// 3. ADMIN: aprobar o rechazar
// =======================================

exports.approvePayment = async (req, res) => {
  const { paymentId } = req.body;

  const record = await PaymentRecord.findById(paymentId);
  if (!record) return res.status(404).json({ success: false, message: "Payment record not found" });

  await enrollStudents(record.courses, record.userId);

  record.status = "APPROVED";
  await record.save();

  res.json({ success: true, message: "Payment approved and student enrolled" });
};

exports.rejectPayment = async (req, res) => {
  const { paymentId } = req.body;

  const record = await PaymentRecord.findById(paymentId);
  if (!record) return res.status(404).json({ success: false, message: "Payment record not found" });

  record.status = "REJECTED";
  await record.save();

  res.json({ success: true, message: "Payment rejected" });
};

// =======================================
// 4. FUNCIÓN REUTILIZABLE DE INSCRIPCIÓN
// =======================================

const enrollStudents = async (courses, userId) => {
  for (const courseId of courses) {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );

    const courseProgress = await CourseProgress.create({
      courseID: courseId,
      userId: userId,
      completedVideos: [],
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $push: { 
          courses: courseId,
          courseProgress: courseProgress._id 
        } 
      },
      { new: true }
    );

    await mailSender(
      user.email,
      `Successfully Enrolled into ${course.courseName}`,
      courseEnrollmentEmail(course.courseName, user.firstName)
    );
  }
};
