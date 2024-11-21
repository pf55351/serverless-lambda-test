const nodemailer = require("nodemailer");

exports.sendEmail = async (event) => {
  const SMTP_SERVER = process.env.SMTP_SERVER;
  const SMTP_PORT = process.env.SMTP_PORT;
  const MAIL_USER = process.env.MAIL_USER;
  const PASSWORD = process.env.PASSWORD;
  const RECIPIENT = process.env.RECIPIENT;
  const FROM = process.env.FROM;
  const transporter = nodemailer.createTransport({
    host: SMTP_SERVER,
    port: SMTP_PORT,
    secure: Number(SMTP_PORT) === 465 ? true : false,

    auth: {
      user: MAIL_USER,
      pass: PASSWORD,
    },
  });

  try {
    console.log("TRYING TO SEND....", transporter.options, FROM, RECIPIENT);
    const res = await transporter.sendMail({
      from: FROM,
      to: RECIPIENT,
      subject: "Test Email",
      text: "Hello, this is a test email!",
      html: "<h1>GOOD MORNING</h1>",
    });
    if (res) console.log("EMAIL SENT");
  } catch (error) {
    console.log(error);
  }
};
