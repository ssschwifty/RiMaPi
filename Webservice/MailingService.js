/*
To send attachment/s generated on the fly you have to pass your attachment/s filename & its base64 encoded chunk data in key-value pair in attachment input.
Prepare your attachment input as mentioned below.

var attachment = {"YourFileName1.Extension":"Base64EncodedChunkData1", "YourFileName2.Extension":"Base64EncodedChunkData2"}

This will send an email with attachment/s from your SendinBlue account.
*/
(function() {
    var nodemailer = require('nodemailer');
    var username = require('./emailData.JSON').accountName;
    var password = require('./emailData.JSON').password;

    var transporter = nodemailer.createTransport('smtps://'+ username +'%40gmail.com:' + password +'@smtp.gmail.com');

    function prepareData(mailTo, sender, recipient, base64Image) {
        var linkToWebsite = "<a href=\"http://v22016053572334167.supersrv.de/RiMaPi/app/#/compare/?a=" + sender + "&b=" + recipient + "\">";
        // setup e-mail data with unicode symbols
        console.log(mailTo);
        var mailOptions = {
            from: '"RiMaPi" <noreply@RiMaPi.com>', // sender address
            to: mailTo, // list of receivers
            subject: 'Summoner ' + sender + ' thinks you, ' + recipient + ', should see this!', // Subject line
            text: 'This is an HTML-Email, please view it with HTML enabled to see its proper content.', // plaintext body
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
                    linkToWebsite  + "If the image isnt displayed correctly, please click this sentence to view a proper version online. </a>" +
            "    </div>" +
                    linkToWebsite +
            "         <img src=\"cid:embeddedImage1\"/>" +
            "     </a> <br> <br>" +
            "This is an automatically generated E-Mail, answering is pointless!" +
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

    function sendEmail(mailTo, sender, recipient, base64Image) {
        console.log('prepare Data for email!');
        mailOptions = prepareData(mailTo, sender, recipient, base64Image);
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


    module.exports.sendEmail = function(mailTo, sender, recipient, base64Image) {
        sendEmail(mailTo, sender, recipient, base64Image);
    }
}());
