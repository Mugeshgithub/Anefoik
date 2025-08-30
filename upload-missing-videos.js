const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dkcw46zgg',
  api_key: '412414431317836',
  api_secret: '6WVrRvzsEtAbz1LeEo3gG7kxpoA'
});

// Missing videos to upload
const missingVideos = [
  'public/An_ultra_compressed.mp4',
  'public/v8_writn_super_compressed.mp4'
];

async function uploadMissingVideos() {
  console.log('🚀 Starting upload of missing videos...\n');

  const results = [];

  for (const filePath of missingVideos) {
    if (fs.existsSync(filePath)) {
      try {
        console.log(`📤 Uploading: ${filePath}`);

        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'auto',
          folder: 'anefiok-music'
        });

        results.push({
          originalPath: filePath,
          cloudinaryUrl: result.secure_url,
          publicId: result.public_id
        });

        console.log(`✅ Success: ${result.secure_url}\n`);
      } catch (error) {
        console.error(`❌ Error uploading ${filePath}:`, error.message);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }

  // Save results to file
  const resultsFile = 'missing-videos-urls.json';
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`📝 Results saved to: ${resultsFile}`);

  return results;
}

uploadMissingVideos().catch(console.error);
