'use client';

interface BookReaderProps {
  bookTitle: string;
  pages: string[];
  amazonLink?: string;
}

export default function BookReader({ bookTitle, pages, amazonLink }: BookReaderProps) {
  return (
    <div className="relative w-[300px] mx-auto">
      {/* Glassmorphism Book Container */}
      <div className="relative w-full h-[400px]">
        {/* Glassmorphism Book Display */}
        <div className="relative w-full h-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Book Image */}
          <div className="w-full h-full p-4">
            <img
              src="https://res.cloudinary.com/dkcw46zgg/image/upload/v1757727558/anefiok-music/book-cover-aniefiok.png"
              alt="Book Cover - Music and the Creative Economy"
              className="w-full h-full object-cover rounded-xl shadow-lg"
              onError={(e) => {
                console.error('Book cover image failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
        </div>
      </div>

      {/* Buy Now Button - Below book display */}
      <div className="mt-4">
        <button
          onClick={() => amazonLink && window.open(amazonLink, '_blank')}
          className="w-full px-4 py-2 bg-[#1a1a2e] text-white rounded-lg font-medium hover:bg-[#2a2a3e] hover:shadow-lg transition-all duration-300 text-sm"
        >
          Buy Now on Amazon
        </button>
      </div>
    </div>
  );
}

