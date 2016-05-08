/*
To send attachment/s generated on the fly you have to pass your attachment/s filename & its base64 encoded chunk data in key-value pair in attachment input.
Prepare your attachment input as mentioned below.

var attachment = {"YourFileName1.Extension":"Base64EncodedChunkData1", "YourFileName2.Extension":"Base64EncodedChunkData2"}

This will send an email with attachment/s from your SendinBlue account.
*/
(function() {
    var nodemailer = require('nodemailer');


    var transporter = nodemailer.createTransport('smtps://lol.rimapi%40gmail.com:Toqshurm1!@smtp.gmail.com');

    function prepareData(mailTo, base64Image) {
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Rimapi" <noreply@RiMaPi.com>', // sender address
            to: 'f.birke@yahoo.de, f.birke92@gmail.com, f-birke@t-online.de', // list of receivers
            subject: 'Hello', // Subject line
            text: 'Hello world', // plaintext body
            html: "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "    <meta charset=\"utf-8\">" +
            "    <title> Summoner Narmor compared himself with you!</title>" +
            "    <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400italic,300italic,300,700,700italic' rel='stylesheet' type='text/css'>" +
            "</head>" +
            "<body style=\" font-family: 'Roboto Condensed', sans-serif; text-align: center; color: white; background-color: black; background-image: url(cid:backgroundImage1);\">" +
            "    <div style=\"margin-left:100px; margin-right:100px;\">" +
            "        <h1> Narmor compared himself with you and wants you to know about it! </h1> <br>" +
            "        <h3> It seems like a Friend of yours wants to let you know, that there is some interesting Information in the comparison of you two. See below for" +
            "        the diagrams and click the image to be forwarded to our website and check it out yourself!</h3>" +
            "        <br>" +
            "        <br>" +
            "        If the image isnt displayed correctly, please click it to view a proper version online." +
            "    </div>" +
            "     <a href=\"http://localhost/riot/Angular-Project/app/#/compare\">" +
            "         <img src=\"cid:embeddedImage1\"/>" +
            "     </a>" +
            "</body>" +
            "</html>",
            attachments: [
                {   // encoded string as an attachment
                    filename: 'image.png',
                    content: base64Image,
                    encoding: 'base64',
                    cid: 'embeddedImage1'
                }
            ]
        };
        return mailOptions;
    }

    function sendEmail(mailTo, base64Image) {
        console.log('prepare Data for email!');
        mailOptions = prepareData(mailTo, base64Image);
        // send mail with defined transport object
        console.log('sending Data for email!');
        transporter.sendMail(mailOptions, function(error, info) {
            console.log('sent Data for email!');
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }

    //---------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------
    //-----------Module Export of all "public" functions


    module.exports.sendEmail = function(mailTo, sender, base64Image) {
        sendEmail(mailTo, sender, base64Image);
    }
}());
