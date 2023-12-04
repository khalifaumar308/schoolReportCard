const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'khalifaumar308@gmail.com',
    pass: 'fabl vyky exms tywc'
  }
});
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('src/views/'),
};

transporter.use('compile', hbs(handlebarOptions))

export const sendMail = async (recipeint, content) =>{
  const mailOptions = {
    from: 'khalifaumar308@gmail.com',
    template: "email", 
    to: recipeint.email,
    subject: `Northfield Montessori End Of Term Report Card`,
    context: {
      email: recipeint.email,
      name: recipeint.name,
    },
    attachments: [
      {   
        filename: `${recipeint.name}reportcard.pdf`,
        content: content,
      }
    ]
  }
  try { 
    await transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
        throw error;
      }
      else {
      console.log(`Email sent to ${recipeint.email}: ` + info.response);
      return true}
  });
  } catch (error) {
    return error
  }
}

//  sendMail