const nodemailer = require("nodemailer");

const sendMail =  async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sandip@gmail.com', // use env variable => gmail
          pass: '<app password>', // use env variable => password
        },
      });
  
      transporter.sendMail({
        from: '"KIST Workshop" <youremail@gmail.com>', // sender address
        to: "nilanallam@gmail.com,", // list of receivers
        subject: "Medium @edigleyssonsilva ✔", // Subject line
        text: "There is a new article. It's about sending emails, check it out!", // plain text body
        html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
      }).then(info => {
        console.log({info});
      }).catch(console.error);
  }
  sendMail()
  
  