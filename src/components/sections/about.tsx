
'use client';

import { Music, Piano, Award, Users, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const musicalJourney = [
  {
    year: '2024',
    title: 'Current Projects',
    description: 'Working on new gospel album and jazz fusion collaborations',
    icon: Music
  },
  {
    year: '2023',
    title: 'Breakthrough Year',
    description: 'Performed at major jazz festivals and released debut solo album',
    icon: Piano
  },
  {
    year: '2022',
    title: 'Studio Recognition',
    description: 'Became sought-after session musician in Nashville music scene',
    icon: Award
  },
  {
    year: '2021',
    title: 'Musical Foundation',
    description: 'Established home studio and began professional music career',
    icon: Users
  }
];

const skills = [
  { name: 'Jazz Piano', level: 95, color: 'bg-blue-500' },
  { name: 'Gospel Music', level: 90, color: 'bg-purple-500' },
  { name: 'Pop Arrangement', level: 85, color: 'bg-pink-500' },
  { name: 'Contemporary Christian', level: 88, color: 'bg-gold-500' },
  { name: 'Studio Production', level: 80, color: 'bg-green-500' },
  { name: 'Live Performance', level: 92, color: 'bg-red-500' }
];

const achievements = [
  {
    title: 'Featured Artist',
    description: 'Blue Note Jazz Club, New York',
    icon: Award,
    color: 'text-blue-400'
  },
  {
    title: 'Best Gospel Performance',
    description: 'Nashville Music Awards 2023',
    icon: Award,
    color: 'text-purple-400'
  },
  {
    title: 'Session Musician of the Year',
    description: 'Tennessee Music Association',
    icon: Award,
    color: 'text-gold-400'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Piano className="h-8 w-8 text-white mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About Anefiok
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A passionate keyboardist and composer whose music transcends genres, creating soul-stirring melodies that connect hearts and inspire spirits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Story */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white text-center">The Musical Journey</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Anefiok's musical journey began with a deep love for the piano and a desire to create music that touches the soul. 
                Growing up in a musical family, he was exposed to diverse genres from an early age, developing a unique style that 
                blends jazz sophistication with gospel warmth.
              </p>
              <p>
                His passion for music led him to study classical piano and jazz theory, but it was his natural ability to connect 
                with audiences through heartfelt performances that set him apart. Today, Anefiok is recognized as one of the most 
                versatile keyboardists in the contemporary music scene.
              </p>
              <p>
                Whether performing jazz standards at prestigious venues, leading worship at church services, or creating pop 
                arrangements in the studio, Anefiok brings authenticity and emotion to every note he plays.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Live Performances</div>
              </div>
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Studio Sessions</div>
              </div>
            </div>
          </div>

          {/* Musical Journey Timeline */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white text-center">Musical Timeline</h3>
            <div className="space-y-4">
              {musicalJourney.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {item.year}
                      </Badge>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Musical Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Recognition & Awards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 text-center hover:border-white/50 transition-all hover:scale-105">
                <CardContent className="p-6">
                  <achievement.icon className={`h-12 w-12 mx-auto mb-4 text-white`} />
                  <h4 className="text-xl font-semibold text-white mb-2">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="text-center">
          <Card className="bg-slate-800 border-slate-700 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <Music className="h-16 w-16 text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Musical Philosophy</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                "Music is more than notes on a page—it's a language of the heart that connects us all. 
                Every melody I create is an invitation to feel, to reflect, and to experience the divine 
                through sound. Whether it's jazz, gospel, or pop, my goal is to create moments of 
                connection and inspiration that resonate long after the last note fades."
              </p>
              <div className="mt-6 text-white font-semibold">- Anefiok</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
