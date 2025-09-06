'use client';

import { motion } from 'framer-motion';
import { Users, Music, Calendar } from 'lucide-react';

interface Collaboration {
  name: string;
  role: string;
  project: string;
  year: string;
}

const collaborations: Collaboration[] = [
  { name: "Sarah Johnson", role: "Vocalist", project: "Midnight Sessions", year: "2024" },
  { name: "Marcus Williams", role: "Saxophonist", project: "Urban Jazz", year: "2023" },
  { name: "Elena Rodriguez", role: "Producer", project: "Crossroads", year: "2024" },
  { name: "David Chen", role: "Pianist", project: "Sunday Morning", year: "2023" },
  { name: "Lisa Thompson", role: "Songwriter", project: "City Lights", year: "2024" },
  { name: "James Wilson", role: "Drummer", project: "Rhythm & Soul", year: "2023" },
  { name: "Maria Garcia", role: "Bassist", project: "Deep Grooves", year: "2024" },
  { name: "Alex Brown", role: "Guitarist", project: "Acoustic Sessions", year: "2023" }
];

export default function Collaborations() {
  return (
    <section id="collaborations" className="py-16 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#fbbf24] to-[#a855f7]"></div>
            <Users className="w-6 h-6 text-[#fbbf24]" />
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#fbbf24]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Musical Collaborations
          </h2>
          <p className="text-[#C9C9D0] text-lg max-w-2xl mx-auto">
            Working with talented artists to create exceptional music
          </p>
        </motion.div>

        {/* Collaborations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {collaborations.map((collab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="bg-[#1e293b]/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-[#fbbf24]/30 transition-all duration-300 h-full">
                {/* Artist Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#fbbf24] to-[#a855f7] rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-semibold text-lg">
                    {collab.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Artist Info */}
                <div className="text-center">
                  <h3 className="text-white font-medium text-lg mb-1 group-hover:text-[#fbbf24] transition-colors">
                    {collab.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Music className="w-4 h-4 text-[#C9C9D0]" />
                    <span className="text-[#C9C9D0] text-sm">{collab.role}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Calendar className="w-4 h-4 text-[#C9C9D0]" />
                    <span className="text-[#C9C9D0] text-sm">{collab.year}</span>
                  </div>
                  <p className="text-[#fbbf24] text-sm font-medium">
                    {collab.project}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24]/5 to-[#a855f7]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#fbbf24] to-[#a855f7]"></div>
        </motion.div>
      </div>
    </section>
  );
}
