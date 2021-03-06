(function() {
    var nodemailer = require('nodemailer');
    var username = require('./emailData.json').accountName;
    var password = require('./emailData.json').password;

    /// init smtp
    var transporter = nodemailer.createTransport('smtps://'+ username +'%40gmail.com:' + password +'@smtp.gmail.com');

    /// private method
    /// builds an object, that contains all necessary data for sending an email.
    /// and returns it to the calling function
    function prepareData(mailTo, sender, senderRegion, recipient, recipientRegion, base64Image) {
        var linkToWebsite = "<a href=\"https://www.narmor.com/#/compare/?as=" + sender + "&ar="+ senderRegion +"&bs=" + recipient + "&br=" + recipientRegion + "\" style=\"color:white\">";
        // setup e-mail data with unicode symbols
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
                    linkToWebsite  + "If the image isnt displayed correctly, please click this sentence or the image below to view a proper version online. </a>" +
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

    /// Sends the Email by calling prepare data and sending the email
    /// with the generated options.
    function sendEmail(mailTo, sender, senderRegion, recipient, recipientRegion, base64Image) {
        mailOptions = prepareData(mailTo, sender, senderRegion, recipient, recipientRegion, base64Image);
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            }
        });
    }

    //---------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------
    //-----------Module Export of all "public" functions


    module.exports.sendEmail = function(mailTo, sender, senderRegion, recipient, recipientRegion, base64Image) {
        sendEmail(mailTo, sender, senderRegion, recipient, recipientRegion, base64Image);
    }
}());
