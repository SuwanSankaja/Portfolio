const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET requests (for testing)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Contact API is working! Use POST to send messages.',
      timestamp: new Date().toISOString(),
      environmentCheck: {
        hasGmailUser: !!process.env.GMAIL_USER,
        hasGmailPassword: !!process.env.GMAIL_PASSWORD
      }
    });
  }

  // Handle POST requests
  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Check for environment variables
      if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
        console.error('Missing environment variables: GMAIL_USER or GMAIL_PASSWORD');
        return res.status(500).json({ message: 'Server configuration error - missing email credentials' });
      }

      // Create a transporter object using the default SMTP transport
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER, // Use your Gmail as sender
        replyTo: email, // Set reply-to as the form submitter's email
        to: process.env.GMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <h3>Contact Details</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Subject:</strong> ${subject}</li>
          </ul>
          <h3>Message</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Sent via suwansankaja.com contact form at ${new Date().toISOString()}</em></p>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      
      console.log('Email sent successfully from:', email, 'to:', process.env.GMAIL_USER);
      
      return res.status(200).json({ 
        message: 'Email sent successfully',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error sending email:', error);
      
      // More detailed error logging
      if (error.code === 'EAUTH') {
        console.error('Gmail authentication failed - check credentials');
        return res.status(500).json({ message: 'Email authentication failed' });
      }
      
      return res.status(500).json({ 
        message: 'Failed to send email',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  // Handle other methods
  return res.status(405).json({ message: 'Method not allowed' });
};