// config/cloudinary.js
const cloudinary = require("cloudinary").v2;

require("dotenv").config(); // Aseguramos que las variables estén cargadas

const cloudinaryConnect = () => {
  try {
    // Debug para que veas si las credenciales están bien
    console.log("🔑 CLOUD_NAME:", process.env.CLOUD_NAME);
    console.log("🔑 API_KEY:", process.env.CLOUD_API_KEY ? "Existe" : "FALTA");
    console.log("🔑 API_SECRET:", process.env.CLOUD_API_SECRET ? "Existe" : "FALTA");

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
      secure: true, // Obligatorio en versiones recientes
    });

    console.log("☁️  Cloudinary conectado correctamente");
  } catch (error) {
    console.error("❌ Error conectando Cloudinary:", error.message);
    process.exit(1); // Opcional: parar el servidor si Cloudinary falla
  }
};

module.exports = { cloudinaryConnect, cloudinary };