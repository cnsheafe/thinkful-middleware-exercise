'use strict';
const {sendEmail} = require('../emailer');
const {ALERT_FROM_NAME, ALERT_TO_EMAIL} = process.env;

function checkError(err, req, res, next) {
  if(err.name === 'BizzError') {
     // no email  sent
    res.send('No need to check your email');
  }
  else {
    const email = {
      from: ALERT_FROM_NAME,
      to: ALERT_TO_EMAIL,
      subject: "ALERT: a "+err.name+" occurred",
      text: 'text',
      html: "<p>"+err.message + '\n' + err.stack+"</p>"
    };
    sendEmail(email);
    res.send('Check your email');
  }
}

module.exports = {checkError};