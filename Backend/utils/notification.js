
const sgMail = require('@sendgrid/mail'); 
const twilio = require('twilio'); // Twilio for SMS notifications

// SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Twilio configuration
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send email
const sendEmail = async (email, subject, text) => {
  const msg = {
    to: email,
    from: 'your-email@example.com', 
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
};

// Function to send SMS
const sendSms = async (phoneNumber, message) => {
  try {
    const sms = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: phoneNumber,
    });
    console.log(`SMS sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}:`, error);
  }
};

module.exports = {
  sendEmail,
  sendSms,
};
