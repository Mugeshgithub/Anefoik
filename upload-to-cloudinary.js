const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dkcw46zgg',
  api_key: '412414431317836',
  api_secret: '6WVrRvzsEtAbz1LeEo3gG7kxpoA'
});

// ALL Media files to upload (including ultra compressed videos)
const mediaFiles = [
  // Ultra Compressed Video Files
  'public/An_ultra_compressed.mp4',
  'public/v8_writn_super_compressed.mp4',
  'public/Dont cry V2.4.mp4',
  
  // Audio Files
  'public/Don\'t cry - Emmanuel (master) copy.wav',
  'public/Emmanuel - My Life Just Begun (Master 2).wav',
  'public/emmanuel - THE GREATEST STORY new 2.wav',
  'public/NATURE SONG (master 2).wav',
  'public/WRITTEN IN THE STARS (master).wav',
  
  // Image Files
  'public/dontcry.jpeg',
  'public/writtern.jpeg',
  'public/My Pics.jpeg',
  'public/My Pics2.jpeg',
  'public/My Pics 4.jpeg',
  'public/My Pics 6.jpeg',
  'public/FB_IMG_1582829900935.jpg'
];

async function uploadFiles() {
  console.log('🚀 Starting Cloudinary upload for ALL media files (including ultra compressed videos)...\n');
  
  const results = [];
  
  for (const filePath of mediaFiles) {
    if (fs.existsSync(filePath)) {
      try {
        console.log(`📤 Uploading: ${filePath}`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'auto',
          folder: 'anefiok-music',
          chunk_size: 6000000, // 6MB chunks for large files
          eager: [
            { quality: 'auto', fetch_format: 'auto' }
          ]
        });
        
        results.push({
          originalPath: filePath,
          cloudinaryUrl: result.secure_url,
          publicId: result.public_id,
          fileSize: result.bytes,
          format: result.format
        });
        
        console.log(`✅ Success: ${result.secure_url}`);
        console.log(`   Size: ${(result.bytes / 1024 / 1024).toFixed(2)} MB\n`);
      } catch (error) {
        console.error(`❌ Error uploading ${filePath}:`, error.message);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  // Save results to file
  const resultsFile = 'cloudinary-all-urls.json';
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`📝 All results saved to: ${resultsFile}`);
  
  // Calculate total size
  const totalSize = results.reduce((sum, file) => sum + (file.fileSize || 0), 0);
  console.log(`📊 Total uploaded: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  
  return results;
}

uploadFiles().catch(console.error);
