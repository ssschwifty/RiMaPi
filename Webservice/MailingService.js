/*
To send attachment/s generated on the fly you have to pass your attachment/s filename & its base64 encoded chunk data in key-value pair in attachment input.
Prepare your attachment input as mentioned below.

var attachment = {"YourFileName1.Extension":"Base64EncodedChunkData1", "YourFileName2.Extension":"Base64EncodedChunkData2"}

This will send an email with attachment/s from your SendinBlue account.
*/

require("../mailin.js");


var client = new Mailin("https://api.sendinblue.com/v2.0", "your access key");



function prepareData() {
    var data = {
        "to": {
            "to@example.net": "to whom!"
        },
        "cc": {
            "cc@example.net": "cc whom!"
        },
        "bcc": {
            "bcc@example.net": "bcc whom!"
        },
        "from": ["from@email.com", "from email!"],
        "replyto": ["replyto@email.com", "reply to!"],
        "subject": "My subject",
        "text": "This is the text",
        "html": "This is the <h1>HTML</h1> " + "This is inline image 1. < br / >" + "< img src = \"{myinlineimage1.png}\" alt=\"image1\" border=\"0\"><br/>" + "Some text < br / >" + "This is inline image 2. < br / >" + "< img src = \"{myinlineimage2.jpg}\" alt=\"image2\" border=\"0\"><br/>" + "Some more text < br / >" + "Re - used inline image 1. < br / >" + "< img src = \"{myinlineimage1.png}\" alt=\"image3\" border=\"0\">",
        "attachment": {
            "myfilename.pdf": "your_pdf_files_base64_encoded_chunk_data"
        },
        "headers": {
            "Content-Type": "text/html;charset=iso-8859-1",
            "X-param1": "value1",
            "X-param2": "value2",
            "X-Mailin-custom": "my custom value",
            "X-Mailin-IP": "102.102.1.2",
            "X-Mailin-Tag": "My tag"
        },
        "inline_image": {
            "myinlineimage1.png": "your_png_files_base64_encoded_chunk_data",
            "myinlineimage2.jpg": "your_jpg_files_base64_encoded_chunk_data"
        }
    };
    return data;
}

function sendEmail() {
    maildata = prepareData();
    client.send_email(maildata).on('complete', function(maildata) {
        console.log(maildata);
    });
}
