// ==========================================
// 📧 TEMPLATE DE CORREO: VERIFICACIÓN OTP
// Versión mejorada con botón y diseño profesional
// ==========================================

const otpTemplate = (otp) => {
return `<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8" />
	<title>Verificación de OTP</title>

	<style>
		/* ======== ESTILOS GENERALES ======== */
		body {
			background-color: #f2f2f2;
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 0;
			color: #333;
		}

		/* ======== CONTENEDOR PRINCIPAL ======== */
		.container {
			max-width: 600px;
			margin: 40px auto;
			background: #ffffff;
			padding: 30px;
			border-radius: 12px;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
			text-align: center;
		}

		/* ======== LOGO ======== */
		.logo {
			max-width: 140px;
			margin-bottom: 15px;
		}

		/* ======== TÍTULO ======== */
		.title {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 15px;
			color: #000;
		}

		/* ======== TEXTO PRINCIPAL ======== */
		.text {
			font-size: 16px;
			line-height: 1.6;
			margin-bottom: 20px;
		}

		/* ======== CAJA DEL OTP ======== */
		.otp-box {
			font-size: 34px;
			font-weight: bold;
			background: #ffe867;
			border: 2px solid #ffdd33;
			padding: 12px 30px;
			border-radius: 10px;
			display: inline-block;
			margin-bottom: 25px;
			letter-spacing: 4px;
		}

		/* ======== BOTÓN DE VERIFICACIÓN ======== */
		.button {
			background-color: #ffd60a;
			color: #000;
			padding: 14px 24px;
			text-decoration: none;
			font-size: 17px;
			font-weight: bold;
			border-radius: 8px;
			display: inline-block;
			margin-top: 10px;
		}

		/* ======== PIE DE PÁGINA ======== */
		.footer {
			margin-top: 35px;
			font-size: 14px;
			color: #777;
		}

		a {
			color: #0077cc;
		}
	</style>
</head>

<body>
	<div class="container">

		<!-- 🔹 LOGO DEL PROYECTO -->
		<a href="https://studynotion-edtech-project.vercel.app">
			<img src="https://i.ibb.co/7Xyj3PC/logo.png" class="logo" alt="Logo StudyNotion">
		</a>

		<!-- 🔹 TÍTULO -->
		<div class="title">Verificación de tu Código OTP</div>

		<!-- 🔹 TEXTO INTRODUCTORIO -->
		<div class="text">
			<p>Hola,</p>
			<p>
				Gracias por unirte a <b>StudyNotion</b>. Para completar tu registro y activar tu cuenta,
				ingresa el siguiente código de verificación:
			</p>
		</div>

		<!-- 🔹 CÓDIGO OTP GENERADO -->
		<div class="otp-box">${otp}</div>

		<!-- 🔹 BOTÓN (Opcional, redirige a tu página de verificación) -->
		<a class="button" href="https://studynotion-edtech-project.vercel.app/verify">Verificar mi cuenta</a>

		<!-- 🔹 DESCRIPCIÓN ADICIONAL -->
		<div class="text">
			<p>Este código OTP es válido por <b>5 minutos</b>.</p>
			<p>Si no solicitaste este código, puedes ignorar este correo con tranquilidad.</p>
		</div>

		<!-- 🔹 PIE DE PÁGINA -->
		<div class="footer">
			Si necesitas ayuda, contáctanos en  
			<a href="mailto:info@studynotion.com">info@studynotion.com</a>.
			<br />Estamos aquí para ayudarte.
		</div>

	</div>
</body>

</html>`;
};

module.exports = otpTemplate;
