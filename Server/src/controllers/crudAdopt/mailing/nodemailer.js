const nodemailer = require("nodemailer")
// const fs = require('fs');
// const htmlForEmail = require('./htmlContent')

const sendEmail = async (toEmails, subject, text, htmlContent) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'sinhogarpatitas@gmail.com',
            pass: 'nikwphrzrtjcklko' // Código que me da el autenticador de dos pasos
        }
    });

    const mailOptions = {
        from: 'sinhogarpatitas@gmail.com',
        to: toEmails,
        subject: subject,
        text: text,
        html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo', error)
        } else {
            console.log('Correo enviado', info.response);
        }
    });
};

module.exports = sendEmail;
