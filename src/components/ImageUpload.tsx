'use client';

import { useState, useRef } from 'react';
import { Upload, X, Check } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
}

export default function ImageUpload({ onImageUpload, currentImage, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setUploadError('File size must be less than 1MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onImageUpload(result.url);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      } else {
        setUploadError(result.error || 'Upload failed');
      }
    } catch (error) {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-4">
        {/* Current Image Preview */}
        {currentImage && (
          <div className="relative">
            <img
              src={currentImage}
              alt="Current"
              className="w-16 h-16 rounded-lg object-cover border border-gray-300"
              style={{ 
                objectPosition: 'center',
                objectFit: 'cover'
              }}
            />
            <button
              onClick={() => onImageUpload('')}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleClick}
          disabled={isUploading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
            isUploading
              ? 'border-gray-400 bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-600'
          }`}
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : uploadSuccess ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              Uploaded!
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              {currentImage ? 'Change Image' : 'Upload Image'}
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {uploadError && (
        <p className="text-red-500 text-sm">{uploadError}</p>
      )}

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Instructions */}
      <p className="text-xs text-gray-500">
        Max 1MB • JPG, PNG, GIF, WebP • Square images work best
      </p>
    </div>
  );
}
