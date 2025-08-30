'use client'

import { useState } from 'react';
import { Image, Camera, Music, Users, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Performance' | 'Studio' | 'Behind the Scenes' | 'Events' | 'Portrait';
  description: string;
  location: string;
  date: string;
  imageUrl: string;
}

const sampleGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Live at Blue Note Jazz Club',
    category: 'Performance',
    description: 'Capturing the energy of jazz night at the iconic Blue Note.',
    location: 'New York, NY',
    date: '2024-01-15',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589726/anefiok-music/iyynq7awdsrr6i0vj5be.jpg'
  },
  {
    id: '2',
    title: 'Studio Recording Session',
    category: 'Studio',
    description: 'In the zone during the recording of Gospel Morning.',
    location: 'Studio A, Nashville',
    date: '2024-01-10',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589728/anefiok-music/v9zw8iriorohnkpjxbch.jpg'
  },
  {
    id: '3',
    title: 'Church Performance',
    category: 'Performance',
    description: 'Sharing the gospel through music during Sunday service.',
    location: 'Grace Community Church',
    date: '2024-01-05',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589730/anefiok-music/moafixtfmjhbe87qxy7j.jpg'
  },
  {
    id: '4',
    title: 'Behind the Scenes - Pop Groove',
    category: 'Behind the Scenes',
    description: 'Creative process and studio setup for the latest pop track.',
    location: 'Home Studio',
    date: '2024-01-08',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589731/anefiok-music/ll4kx4hnq4hjhown8lcq.jpg'
  },
  {
    id: '5',
    title: 'Jazz Festival Performance',
    category: 'Events',
    description: 'Outdoor jazz festival with thousands of music lovers.',
    location: 'Central Park, NYC',
    date: '2023-12-20',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589727/anefiok-music/e2tvxhy9btjesmtrwvhw.jpg'
  },
  {
    id: '6',
    title: 'Studio Portrait',
    category: 'Portrait',
    description: 'Professional headshot in the recording studio environment.',
    location: 'Studio B, Nashville',
    date: '2024-01-01',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589728/anefiok-music/v9zw8iriorohnkpjxbch.jpg'
  },
  {
    id: '7',
    title: 'Gospel Choir Recording',
    category: 'Studio',
    description: 'Full choir session for the upcoming gospel album.',
    location: 'Cathedral Studio',
    date: '2023-12-28',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589730/anefiok-music/moafixtfmjhbe87qxy7j.jpg'
  },
  {
    id: '8',
    title: 'Pop Concert Stage',
    category: 'Performance',
    description: 'Energetic performance at the pop music festival.',
    location: 'Music City Arena',
    date: '2023-12-15',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589731/anefiok-music/ll4kx4hnq4hjhown8lcq.jpg'
  },
  {
    id: '9',
    title: 'Studio Equipment Setup',
    category: 'Behind the Scenes',
    description: 'Professional studio setup with vintage and modern equipment.',
    location: 'Home Studio',
    date: '2023-12-10',
    imageUrl: 'https://res.cloudinary.com/dkcw46zgg/image/upload/v1756589727/anefiok-music/e2tvxhy9btjesmtrwvhw.jpg'
  }
];

const categories = ['All', 'Performance', 'Studio', 'Behind the Scenes', 'Events', 'Portrait'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredGallery = selectedCategory === 'All' 
    ? sampleGallery 
    : sampleGallery.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Performance': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'Studio': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'Behind the Scenes': return 'bg-gold-500/20 text-gold-300 border-gold-400/30';
      case 'Events': return 'bg-pink-500/20 text-pink-300 border-pink-400/30';
      case 'Portrait': return 'bg-green-500/20 text-green-300 border-green-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-slate-700 to-slate-600">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Camera className="h-8 w-8 text-gold-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Photo Gallery
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visual journey through Anefiok's musical world - from studio sessions to live performances
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category 
                  ? 'bg-gold-500 hover:bg-gold-600 text-black' 
                  : 'border-gold-400/30 text-gold-300 hover:bg-gold-400/20'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <Card key={item.id} className="bg-slate-600/50 border-slate-500 hover:border-gold-400/50 transition-all hover:scale-105 group overflow-hidden">
              {/* Actual Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-gold-300 hover:bg-gold-400/20"
                  >
                    <Image className="h-6 w-6 mr-2" />
                    View Full
                  </Button>
                </div>
                
                {/* Category Badge */}
                <Badge className={`absolute top-3 left-3 ${getCategoryColor(item.category)}`}>
                  {item.category}
                </Badge>
              </div>
              
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                {/* Image Details */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Want to see more photos from performances and studio sessions?
          </p>
          <Button className="bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-black font-semibold px-8 py-3">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}

