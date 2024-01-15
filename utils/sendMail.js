import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "meproxysk@gmail.com",
      pass: "imhv ckmw ywyk sgmm",
    },
  });
const sendMail = async(email, subject, info) => {
  try {
    const response = await transporter.sendMail({
        from: '"Fred Foo 👻" <meproxysk@gmail.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: info, // plain text body
        html: `<b>${info}</b>`, // html body
      });
    if(!response){
        return {success: false, message: "Email not sent"}
    }
    return {success: true, message: "Email sent"}
    
  } catch (error) {
    return {success: false, message: error.message}
  }
}
export default sendMail;