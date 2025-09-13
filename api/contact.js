const nodemailer = require('nodemailer');

export default function handler(req, res) {
  // Ensure we are dealing with a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address from environment variables
      pass: process.env.GMAIL_PASSWORD, // Your Gmail App Password from environment variables
    },
  });

  const mailOptions = {
    from: email, // Sender address
    to: process.env.GMAIL_USER, // List of receivers (your email)
    subject: `New Contact Form Submission: ${subject}`, // Subject line
    html: `<p>You have a new contact form submission</p>
           <h3>Contact Details</h3>
           <ul>
             <li><strong>Name:</strong> ${name}</li>
             <li><strong>Email:</strong> ${email}</li>
             <li><strong>Subject:</strong> ${subject}</li>
           </ul>
           <h3>Message</h3>
           <p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
}