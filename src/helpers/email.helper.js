const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "shawnkebel@kryptomix.digital",
    pass: "Yoshi1988*",
  },
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      let result = await transporter.sendMail(info);

      console.log(info);
      console.log("Message sent: %s", result.messageId);

      resolve(result);
    } catch (error) {
      console.log(error);
    }
  });
};

const emailProcessor = ({ email, pin, type, verificationLink = "" }) => {
  let info = "";
  switch (type) {
    case "request-new-password":
      info = {
        from: '"Tikkit " <shawnkebel@kryptomix.digital>', // sender address
        to: email, // list of receivers
        subject: "Password Reset PIN", // Subject line
        text: "Here is your Password Reset PIN: " + pin + " This PIN will expire in 1 day.", // plain text body
        html: `<b>Hello</b>.
        Here is your PIN:
        <b> ${pin}</b>.
        This PIN will expire in 24 hours.
        <p></p>`, // html body
      };

      send(info);
      break;

    case "update-password-success":
      info = {
        from: '"Tikkit " <shawnkebel@kryptomix.digital>', // sender address
        to: email, // list of receivers
        subject: "Password updated", // Subject line
        text: "Your new password has been updated.", // plain text body
        html: `<b>Hello,</b>.
        <p>Your new password has been updated.</p>`, // html body
      };

      send(info);
      break;

    case "new-user-confirmation-required":
      info = {
        from: '"Tikkit " <shawnkebel@kryptomix.digital>', // sender address
        to: email, // list of receivers
        subject: "Please verify your new user", // Subject line
        text: "Please follow the link to verify your account.", // plain text body
        html: `<b>Hello </b>
            <p>Please follow the link to verify your account.</p> 
            <a href=${verificationLink}>${verificationLink}</a>`, // html body
      };

      send(info);
      console.log(info);
      break;

    default:
      break;
  }
};

module.exports = { emailProcessor };
