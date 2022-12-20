const nodemailer = require("nodemailer");
 
exports.sendEmail = (receiver, title, body) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: receiver,
        subject: title,
        html: body
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent.");
        }
    })
}