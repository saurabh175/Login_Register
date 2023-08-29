const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			secure:true,
			auth: {
			  user: '', // Change this to your email address that account done with 2 step authentication
			  pass: '', // Change this to your  apppassword that generate in security section in google account.
			},
		});

		await transporter.sendMail({
			from: '', // Change this to your email address
			to: email,
			subject: 'Email Verification',
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
