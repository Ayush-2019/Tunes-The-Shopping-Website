const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service:"Gmail",
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.MAIL_PSWD
    }
});

const registerEmail = async(userEmail, user) => {
    try{

        const emailToken = user.generateRegisterToken();

        let mailGenerator = new Mailgen({
            theme:"neopolitan",
            product:{
                name:"TUNES",
                link:`${process.env.EMAIL_MAIL_URL}`
            }
        });

        const email = {
            body:{
                name:userEmail,
                intro: 'Welcome to Tunes! We are extremely happy to have you as our customer. Yes, we value our customers',
                action:{
                    instructions:'To validate your account, click here',
                    button:{
                        color:'#1a73e8',
                        text:'Validate your account',
                        link:`${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }

        let emailBody = mailGenerator.generate(email);

        let message = {
            from:process.env.EMAIL,
            to:userEmail,
            subject:"Welcome to Tunes",
            html:emailBody
        };

        await transporter.sendMail(message);

        return true;

    }catch(err){
        throw err;
    }
}

module.exports = {
    registerEmail
}