const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

//View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//static folder
app.use('/public', express.static(path.join(__dirname,'public')));

//Body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',(req, res) =>{
res.render('contact');
});

app.post('/send',(req, res) =>{
 const output = `
<p> You have a new contact request</p>
<h3></h3>
<ul>
<li>Name : ${req.body.name}</li>
<li>Name : ${req.body.company}</li>
<li>Name : ${req.body.email}</li>
<li>Name : ${req.body.phone}</li>

</ul>
<p>${req.body.message}</p>
 `;

 // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'sumanmr9591@gmail.com', // generated ethereal user
            pass: '$uMan123'  // generated ethereal password
        },
        tls:{
        	rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <sumanmr9591@gmail.com>', // sender address
        to: 'suman.123.msd@gmail.com', // list of receivers
        subject: 'Node contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact', {msg:'Email has been sent'});
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

});


app.listen(3000, () =>{
	console.log('Server started');
})