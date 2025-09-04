'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Save, Eye, EyeOff, Plus, Trash2, Music, Calendar, MapPin, Link, Users, LogOut, Clock, TrendingUp, Activity, Settings, Copy, Check, AlertCircle, Info } from 'lucide-react';

interface Collaborator {
  name: string;
  role: string;
  social: string;
}

interface ShowData {
  isActive: boolean;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  link: string;
  linkText: string;
  type: 'live' | 'streaming' | 'recording';
  description: string;
  collaborators: Collaborator[];
}

export default function AdminPanel() {
  const router = useRouter();
  const [showData, setShowData] = useState<ShowData>({
    isActive: false,
    title: '',
    date: '',
    time: '',
    venue: '',
    location: '',
    link: '',
    linkText: '',
    type: 'live',
    description: '',
    collaborators: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_auth');
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  // Load current show data
  useEffect(() => {
    loadShowData();
  }, []);

  const loadShowData = async () => {
    try {
      const response = await fetch('/api/show-data');
      if (response.ok) {
        const data = await response.json();
        setShowData(data);
      }
    } catch (error) {
      console.error('Error loading show data:', error);
    }
  };

  const saveShowData = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/show-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showData),
      });

      if (response.ok) {
        setMessage('Show information updated successfully! 🎵');
        setLastUpdated(new Date().toLocaleString());
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error updating show information. Please try again.');
      }
    } catch (error) {
      setMessage('Error updating show information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addCollaborator = () => {
    setShowData(prev => ({
      ...prev,
      collaborators: [...prev.collaborators, { name: '', role: '', social: '' }]
    }));
  };

  const removeCollaborator = (index: number) => {
    setShowData(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter((_, i) => i !== index)
    }));
  };

  const updateCollaborator = (index: number, field: keyof Collaborator, value: string) => {
    setShowData(prev => ({
      ...prev,
      collaborators: prev.collaborators.map((collab, i) => 
        i === index ? { ...collab, [field]: value } : collab
      )
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getShowStatus = () => {
    if (!showData.isActive) return { status: 'hidden', color: 'text-gray-400', bg: 'bg-gray-500/20' };
    if (showData.type === 'live') return { status: 'live', color: 'text-red-400', bg: 'bg-red-500/20' };
    if (showData.type === 'streaming') return { status: 'streaming', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    return { status: 'recording', color: 'text-purple-400', bg: 'bg-purple-500/20' };
  };

  const hasShowData = () => {
    return showData.title.trim() !== '' || 
           showData.venue.trim() !== '' || 
           showData.date.trim() !== '' || 
           showData.description.trim() !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-[#fbbf24] to-[#a855f7] rounded-xl">
                <Music className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-light text-white">Show Manager</h1>
                <p className="text-[#C9C9D0] text-sm">Manage your live performances and events</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Status Indicator */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getShowStatus().bg} border border-white/10`}>
                <div className={`w-2 h-2 rounded-full ${getShowStatus().color.replace('text-', 'bg-')}`}></div>
                <span className={`text-sm font-medium ${getShowStatus().color} capitalize`}>
                  {getShowStatus().status}
                </span>
              </div>
              
              {/* Tips Button */}
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 px-3 py-2 bg-[#fbbf24]/20 text-[#fbbf24] rounded-lg hover:bg-[#fbbf24]/30 transition-all"
              >
                <Info className="w-4 h-4" />
                Tips
              </button>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Last Updated & Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#1a1a2e]/60 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#fbbf24]" />
                <div>
                  <p className="text-xs text-[#C9C9D0] uppercase tracking-wide">Last Updated</p>
                  <p className="text-sm text-white font-medium">
                    {lastUpdated || 'Never'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1a2e]/60 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#a855f7]" />
                <div>
                  <p className="text-xs text-[#C9C9D0] uppercase tracking-wide">Widget Status</p>
                  <p className="text-sm text-white font-medium">
                    {showData.isActive ? 'Active' : 'Hidden'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1a2e]/60 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-[#C9C9D0] uppercase tracking-wide">Collaborators</p>
                  <p className="text-sm text-white font-medium">
                    {showData.collaborators.length} artist{showData.collaborators.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Panel */}
          {showTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#1a1a2e]/80 backdrop-blur-xl rounded-xl border border-[#fbbf24]/30 p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#fbbf24] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">💡 Pro Tips</h3>
                  <ul className="text-xs text-[#C9C9D0] space-y-1">
                    <li>• Use clear, engaging titles that grab attention</li>
                    <li>• Add collaborators to showcase your musical partnerships</li>
                    <li>• Test your booking links before saving</li>
                    <li>• Hide the widget when you don't have upcoming shows</li>
                    <li>• Changes appear on your website within 5 seconds</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 p-4 rounded-lg text-center ${
              message.includes('successfully') 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-light text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-[#fbbf24]" />
                Live Preview
              </h2>
              <p className="text-sm text-[#C9C9D0] mt-1">See how your widget will appear on the website</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                showData.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span className="text-xs text-[#C9C9D0]">
                {showData.isActive ? 'Live' : 'Hidden'}
              </span>
            </div>
          </div>

          {showPreview && (
            <div className="space-y-4">
              {showData.isActive ? (
                hasShowData() ? (
                  <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-white uppercase tracking-wide">
                        {showData.type === 'live' ? 'LIVE' : 'SHOW'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-white mb-2">
                      {showData.title || 'Untitled Show'}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-[#C9C9D0]">
                      {(showData.date || showData.time) && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {showData.date && showData.time 
                              ? `${showData.date} at ${showData.time}`
                              : showData.date || showData.time || 'Date not set'
                            }
                          </span>
                        </div>
                      )}
                      {(showData.venue || showData.location) && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {showData.venue && showData.location
                              ? `${showData.venue}, ${showData.location}`
                              : showData.venue || showData.location || 'Location not set'
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {showData.description && (
                      <p className="text-sm text-[#C9C9D0] mt-3">{showData.description}</p>
                    )}
                    
                    {showData.collaborators.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-white mb-2">Collaborating Artists:</h4>
                        <div className="flex flex-wrap gap-2">
                          {showData.collaborators.map((collab, index) => (
                            <div key={index} className="flex items-center gap-2 px-2 py-1 bg-[#fbbf24]/20 rounded text-xs">
                              <div className="w-6 h-6 bg-gradient-to-r from-[#fbbf24] to-[#a855f7] rounded-full flex items-center justify-center text-white font-medium">
                                {collab.name.charAt(0)}
                              </div>
                              <span className="text-white">{collab.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {showData.link && (
                      <a
                        href={showData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-[#fbbf24] to-[#a855f7] text-white rounded-lg hover:from-[#f59e0b] hover:to-[#9333ea] transition-all text-sm"
                      >
                        <Link className="w-4 h-4" />
                        {showData.linkText || 'Book Tickets'}
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#C9C9D0] border-2 border-dashed border-[#C9C9D0]/30 rounded-lg">
                    <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-white mb-2">No Show Information</h3>
                    <p className="text-sm mb-4">Fill in the show details below to see a preview</p>
                    <div className="text-xs space-y-1">
                      <p>• Add a show title</p>
                      <p>• Set date and time</p>
                      <p>• Add venue and location</p>
                      <p>• Include a description</p>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-8 text-[#C9C9D0] border-2 border-dashed border-[#C9C9D0]/30 rounded-lg">
                  <EyeOff className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-white mb-2">Widget Hidden</h3>
                  <p className="text-sm mb-4">The collaboration widget is currently hidden from visitors</p>
                  <p className="text-xs">Enable "Show widget on website" to make it visible</p>
                </div>
              )}
            </div>
          )}
          </motion.div>

          {/* Form Section - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-white flex items-center gap-2">
                <Music className="w-6 h-6 text-[#fbbf24]" />
                Show Information
              </h2>
              {!hasShowData() && (
                <div className="flex items-center gap-2 px-3 py-1 bg-[#fbbf24]/20 text-[#fbbf24] rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Empty
                </div>
              )}
            </div>

            {/* Toggle Active */}
            <div className="mb-6 p-4 bg-[#0a0a0a]/30 rounded-xl border border-white/10">
              <label className="flex items-center justify-between text-white cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                    showData.isActive 
                      ? 'bg-[#fbbf24] border-[#fbbf24]' 
                      : 'border-[#C9C9D0] bg-transparent'
                  }`}>
                    {showData.isActive && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-lg font-medium">Show widget on website</span>
                    <p className="text-sm text-[#C9C9D0]">
                      {showData.isActive ? 'Widget is visible to visitors' : 'Widget is hidden from visitors'}
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={showData.isActive}
                  onChange={(e) => setShowData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="sr-only"
                />
              </label>
            </div>

            {/* Basic Info */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[#C9C9D0] mb-2">Show Title</label>
                <input
                  type="text"
                  value={showData.title}
                  onChange={(e) => setShowData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="e.g., Live Performance at Blue Note Paris"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C9C9D0] mb-2">Date</label>
                  <input
                    type="date"
                    value={showData.date}
                    onChange={(e) => setShowData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#C9C9D0] mb-2">Time</label>
                  <input
                    type="time"
                    value={showData.time}
                    onChange={(e) => setShowData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C9C9D0] mb-2">Venue</label>
                <input
                  type="text"
                  value={showData.venue}
                  onChange={(e) => setShowData(prev => ({ ...prev, venue: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="e.g., Blue Note Paris"
                />
              </div>

              <div>
                <label className="block text-[#C9C9D0] mb-2">Location</label>
                <input
                  type="text"
                  value={showData.location}
                  onChange={(e) => setShowData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="e.g., Paris, France"
                />
              </div>

              <div>
                <label className="block text-[#C9C9D0] mb-2">Show Type</label>
                <select
                  value={showData.type}
                  onChange={(e) => setShowData(prev => ({ ...prev, type: e.target.value as 'live' | 'streaming' | 'recording' }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all"
                >
                  <option value="live">Live Performance</option>
                  <option value="streaming">Live Stream</option>
                  <option value="recording">Recording Session</option>
                </select>
              </div>

              <div>
                <label className="block text-[#C9C9D0] mb-2">Description</label>
                <textarea
                  value={showData.description}
                  onChange={(e) => setShowData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all h-20 resize-none"
                  placeholder="Brief description of the show..."
                />
              </div>
            </div>

            {/* Booking Link */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Link className="w-5 h-5 text-[#fbbf24]" />
                Booking Information
              </h3>
              
              <div>
                <label className="block text-[#C9C9D0] mb-2">Booking Link</label>
                <input
                  type="url"
                  value={showData.link}
                  onChange={(e) => setShowData(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="https://example.com/book-tickets"
                />
              </div>

              <div>
                <label className="block text-[#C9C9D0] mb-2">Link Text</label>
                <input
                  type="text"
                  value={showData.linkText}
                  onChange={(e) => setShowData(prev => ({ ...prev, linkText: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="e.g., Book Tickets, Watch Live, Get Tickets"
                />
              </div>
            </div>

            {/* Collaborators */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#fbbf24]" />
                  Collaborating Artists
                </h3>
                <button
                  onClick={addCollaborator}
                  className="flex items-center gap-2 px-3 py-2 bg-[#fbbf24]/20 text-[#fbbf24] rounded-lg hover:bg-[#fbbf24]/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Artist
                </button>
              </div>

              <div className="space-y-3">
                {showData.collaborators.map((collab, index) => (
                  <div key={index} className="p-4 bg-[#0a0a0a]/30 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#C9C9D0] text-sm">Artist {index + 1}</span>
                      <button
                        onClick={() => removeCollaborator(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="text"
                        value={collab.name}
                        onChange={(e) => updateCollaborator(index, 'name', e.target.value)}
                        className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                        placeholder="Artist Name"
                      />
                      <input
                        type="text"
                        value={collab.role}
                        onChange={(e) => updateCollaborator(index, 'role', e.target.value)}
                        className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                        placeholder="Role (e.g., Vocalist, Saxophonist)"
                      />
                      <input
                        type="text"
                        value={collab.social}
                        onChange={(e) => updateCollaborator(index, 'social', e.target.value)}
                        className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                        placeholder="Social Handle (optional)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6 p-4 bg-[#0a0a0a]/30 rounded-xl border border-white/10">
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#fbbf24]" />
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => copyToClipboard(showData.link)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#a855f7]/20 text-[#a855f7] rounded-lg hover:bg-[#a855f7]/30 transition-all text-sm"
                >
                  {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copySuccess ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => setShowData(prev => ({ ...prev, isActive: !prev.isActive }))}
                  className="flex items-center gap-2 px-3 py-2 bg-[#3b82f6]/20 text-[#3b82f6] rounded-lg hover:bg-[#3b82f6]/30 transition-all text-sm"
                >
                  <Eye className="w-4 h-4" />
                  {showData.isActive ? 'Hide Widget' : 'Show Widget'}
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#fbbf24]/20 text-[#fbbf24] rounded-lg hover:bg-[#fbbf24]/30 transition-all text-sm"
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={saveShowData}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#fbbf24] to-[#a855f7] text-white rounded-xl hover:from-[#f59e0b] hover:to-[#9333ea] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl hover:shadow-[#fbbf24]/25"
            >
              <Save className="w-5 h-5" />
              {isLoading ? 'Saving...' : 'Save Show Information'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
