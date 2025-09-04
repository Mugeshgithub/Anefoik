const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dkcw46zgg',
  api_key: '412414431317836',
  api_secret: '6WVrRvzsEtAbz1LeEo3gG7kxpoA'
});

async function uploadNewVideo() {
  try {
    console.log('🚀 Starting upload of ANIEFIOK small file.mp4 to Cloudinary...\n');
    
    const filePath = 'public/ANIEFIOK small file compressed.mp4';
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('❌ File not found:', filePath);
      return;
    }
    
    console.log('📁 File found:', filePath);
    console.log('📊 File size:', (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2), 'MB');
    
    // Upload video to Cloudinary using large upload
    const result = await cloudinary.uploader.upload_large(filePath, {
      resource_type: 'video',
      folder: 'anefiok-music',
      public_id: 'anefiok-small-file',
      chunk_size: 6000000, // 6MB chunks for large files
      eager: [
        { width: 800, height: 600, crop: 'scale' },
        { width: 400, height: 300, crop: 'scale' }
      ],
      eager_async: true
    });
    
    console.log('✅ Upload successful!');
    console.log('🔗 Video URL:', result.secure_url);
    console.log('📝 Public ID:', result.public_id);
    console.log('📊 File size on Cloudinary:', (result.bytes / (1024 * 1024)).toFixed(2), 'MB');
    
    // Save the URL to a JSON file
    const videoData = {
      fileName: 'ANIEFIOK small file.mp4',
      cloudinaryUrl: result.secure_url,
      publicId: result.public_id,
      uploadedAt: new Date().toISOString()
    };
    
    fs.writeFileSync('new-video-url.json', JSON.stringify(videoData, null, 2));
    console.log('💾 Video data saved to new-video-url.json');
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    if (error.http_code) {
      console.error('HTTP Code:', error.http_code);
    }
  }
}

uploadNewVideo();
