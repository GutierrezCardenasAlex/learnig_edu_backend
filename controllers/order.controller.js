const PurchaseOrder = require("../models/PurchaseOrder");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");

// ======================
// 1. Estudiante crea orden manual
// ======================
exports.createOrder = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debe seleccionar un curso",
      });
    }

    let amount = 0;

    for (const courseId of courses) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Curso no encontrado",
        });
      }
      amount += course.price;
    }

    const order = await PurchaseOrder.create({
      userId,
      courses,
      amount,
      status: "PENDING",
    });

    return res.status(200).json({
      success: true,
      message: "Orden creada y enviada al administrador",
      data: order,
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "No se pudo crear la orden",
    });
  }
};


// ======================
// 2. Admin aprueba orden
// ======================
exports.approveOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await PurchaseOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Orden no encontrada",
      });
    }

    // Enrroll students
    for (const courseId of order.courses) {
      const course = await Course.findByIdAndUpdate(
        courseId,
        { $push: { studentsEnrolled: order.userId } },
        { new: true }
      );

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: order.userId,
        completedVideos: [],
      });

      await User.findByIdAndUpdate(
        order.userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );
    }

    order.status = "APPROVED";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Orden aprobada y estudiante matriculado",
    });

  } catch (error) {
    console.log("APPROVE ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "No se pudo aprobar la orden",
    });
  }
};


// ======================
// 3. Admin rechaza orden
// ======================
exports.rejectOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await PurchaseOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Orden no encontrada",
      });
    }

    order.status = "REJECTED";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Orden rechazada",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No se pudo rechazar la orden",
    });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate("userId")
      .populate("courses");

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};