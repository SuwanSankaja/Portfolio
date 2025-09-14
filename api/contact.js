module.exports = function handler(req, res) {
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
      timestamp: new Date().toISOString()
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

      // For now, just log the message and return success
      console.log('Contact form submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      // TODO: Add email sending functionality later
      return res.status(200).json({ 
        message: 'Email sent successfully',
        note: 'This is a test response. Email functionality will be added next.'
      });

    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ 
        message: 'Server error occurred'
      });
    }
  }

  // Handle other methods
  return res.status(405).json({ message: 'Method not allowed' });
};