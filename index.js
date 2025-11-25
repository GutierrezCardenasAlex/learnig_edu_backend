const express = require("express");
const app = express();

// Configuraciones
require("dotenv").config();
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary"); // ← Solo conexión

// Middlewares y rutas
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const orderRoutes = require("./routes/Order");


const PORT = process.env.PORT || 4000;

// Conexiones
database.connect();
cloudinaryConnect(); // ← Solo una línea

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
}));


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}));

// Rutas
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/order", orderRoutes);


// Ruta de bienvenida
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running.... 🚀",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});