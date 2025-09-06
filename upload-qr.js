const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary (you'll need to add your credentials)
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

// Upload the QR code image
cloudinary.uploader.upload('public/paypal-qr.jpeg', {
  public_id: 'aniefiok-paypal-qr',
  folder: 'aniefiok-music',
  resource_type: 'image'
}, function(error, result) {
  if (error) {
    console.error('Upload error:', error);
  } else {
    console.log('Upload successful!');
    console.log('Public URL:', result.secure_url);
  }
});
