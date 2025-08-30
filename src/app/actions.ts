'use server';

import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactForm(formData: FormData) {
  try {
    // Validate form data
    const validatedFields = contactSchema.safeParse({
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      message: formData.get('message') || '',
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data. Please check your inputs.',
      };
    }

    const { name, email, message } = validatedFields.data;

    // Create email content
    const emailContent = `
New Contact Form Submission from Anefiok Website

Name: ${name}
Email: ${email}
Message: ${message}

Submitted on: ${new Date().toLocaleString()}
    `;

    // For development: Log the email content
    console.log('📧 Contact Form Submission:');
    console.log('To: emmaasuquo87@gmail.com');
    console.log('Subject: New Contact Form Submission - Anefiok Website');
    console.log('Content:', emailContent);
    console.log('---');

    // TODO: Replace with your preferred email service
    // Option 1: SendGrid (recommended for production)
    // Option 2: Nodemailer with Gmail SMTP
    // Option 3: Resend.com
    // Option 4: EmailJS (client-side)
    
    // Example SendGrid integration:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: 'emmaasuquo87@gmail.com',
    //   from: 'your-verified-sender@yourdomain.com',
    //   subject: 'New Contact Form Submission - Anefiok Website',
    //   text: emailContent,
    // });
    
    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    };
  }
}
