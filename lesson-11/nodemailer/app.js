import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_PASSWORD, UKR_NET_FROM} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 465, 587, 2525
    secure: true,
    auth: {
        user: UKR_NET_FROM,
        pass: UKR_NET_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_FROM,
    to: "deyipa4132@chaladas.com",
    subject: "Test email",
    html: "<strong>Test email</strong>",
};

transport.sendMail(email)
    .then(()=> console.log("Email send sucess"))
    .catch(error => console.log(error.message));