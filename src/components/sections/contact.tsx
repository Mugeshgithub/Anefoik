
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Music, Send, Instagram, Youtube, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const services = [
  {
    title: 'Live Performances',
    description: 'Jazz, Gospel, Pop, and Contemporary Christian music for events',
    icon: Music,
    price: 'From $500'
  },
  {
    title: 'Studio Recording',
    description: 'Professional piano/keyboard recording and production services',
    icon: Calendar,
    price: 'From $200/hour'
  },
  {
    title: 'Music Composition',
    description: 'Custom compositions for special occasions and projects',
    icon: Send,
    price: 'From $300'
  }
];

const socialLinks = [
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/emma_asuquo2005/', color: 'text-pink-400' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@asuquo05', color: 'text-red-400' },
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/aniefiok.asuquo.5', color: 'text-blue-400' }
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setIsSubmitting(false);
    // Here you would typically show a success message
  };

  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden">
      {/* Right Corner CONTACT Title - Footer Style */}
      <div className="absolute right-8 top-8 z-10">
        <h1 className="text-8xl md:text-9xl font-bold leading-tight" style={{
          background: 'linear-gradient(135deg, #a7c7e7 0%, #faf9f6 50%, #e1c5c0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 30px rgba(167, 199, 231, 0.3)'
        }}>
          CONTACT
        </h1>
      </div>

      <div className="container px-4 md:px-6 relative z-20 mt-32">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-blue-400" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Services */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span>anefiok@music.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-5 w-5 text-red-400" />
                  <span>Nashville, TN & New York, NY</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <span>Available for bookings</span>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Services & Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/50">
                    <service.icon className="h-6 w-6 text-gold-400 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{service.title}</h4>
                      <p className="text-sm text-gray-400">{service.description}</p>
                      <Badge className="mt-2 bg-gold-500/20 text-gold-300 border-gold-400/30">
                        {service.price}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Follow & Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors ${social.color}`}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Ready to make your event unforgettable with live music?
          </p>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3">
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
}
