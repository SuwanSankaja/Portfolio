// Replace your api/contact.js with this debug version
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  console.log('Contact API called - Method:', req.method);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request handled');
    return res.status(200).end();
  }

  // Handle GET requests (for testing)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Contact API is working! Use POST to send messages.',
      timestamp: new Date().toISOString(),
      environmentCheck: {
        hasGmailUser: !!process.env.GMAIL_USER,
        hasGmailPassword: !!process.env.GMAIL_PASSWORD,
        gmailUser: process.env.GMAIL_USER ? process.env.GMAIL_USER.substring(0, 3) + '***' : 'not set'
      }
    });
  }

  // Handle POST requests
  if (req.method === 'POST') {
    try {
      console.log('POST request received');
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      const { name, email, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        console.log('Validation failed - missing fields');
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log('Email validation failed:', email);
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Check for environment variables
      if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
        console.error('Missing environment variables');
        console.error('GMAIL_USER exists:', !!process.env.GMAIL_USER);
        console.error('GMAIL_PASSWORD exists:', !!process.env.GMAIL_PASSWORD);
        return res.status(500).json({ message: 'Server configuration error - missing email credentials' });
      }

      console.log('Creating nodemailer transporter...');
      
      // Create a transporter object with more detailed configuration
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
        debug: true, // Enable debug mode
        logger: true // Enable logging
      });

      console.log('Verifying transporter...');
      
      // Verify the transporter configuration
      try {
        await transporter.verify();
        console.log('Transporter verified successfully');
      } catch (verifyError) {
        console.error('Transporter verification failed:', verifyError);
        return res.status(500).json({ 
          message: 'Email configuration verification failed',
          error: verifyError.message
        });
      }

      const mailOptions = {
        from: process.env.GMAIL_USER,
        replyTo: email,
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

      console.log('Sending email...');
      console.log('Mail options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
      });

      // Send email
      const info = await transporter.sendMail(mailOptions);
      
      console.log('Email sent successfully');
      console.log('Message info:', info.messageId);
      
      return res.status(200).json({ 
        message: 'Email sent successfully',
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Detailed error information:');
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      console.error('Error stack:', error.stack);
      
      // Handle specific Gmail errors
      if (error.code === 'EAUTH') {
        console.error('Gmail authentication failed - check credentials');
        return res.status(500).json({ 
          message: 'Gmail authentication failed - please check email credentials',
          errorCode: 'EAUTH'
        });
      }
      
      if (error.code === 'ENOTFOUND') {
        console.error('Network error - cannot reach Gmail servers');
        return res.status(500).json({ 
          message: 'Network error - cannot reach email server',
          errorCode: 'ENOTFOUND'
        });
      }
      
      return res.status(500).json({ 
        message: 'Failed to send email',
        errorCode: error.code,
        errorMessage: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Handle other methods
  return res.status(405).json({ message: 'Method not allowed' });
};