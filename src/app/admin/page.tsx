'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Save, Eye, EyeOff, Plus, Trash2, Music, Calendar, MapPin, Link, Users, LogOut, Clock, TrendingUp, Activity, Settings, Copy, Check, AlertCircle, Info } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface Collaborator {
  name: string;
  role: string;
  social: string;
  image?: string;
  project?: string;
  year?: string;
  genre?: string;
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

interface CollaborationsData {
  isActive: boolean;
  collaborations: Collaborator[];
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

  const [collaborationsData, setCollaborationsData] = useState<CollaborationsData>({
    isActive: true,
    collaborations: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Helper function to update show data and mark as unsaved
  const updateShowData = (updater: (prev: ShowData) => ShowData) => {
    setShowData(updater);
    setHasUnsavedChanges(true);
  };

  // Helper function to update collaborations data and mark as unsaved
  const updateCollaborationsData = (updater: (prev: CollaborationsData) => CollaborationsData) => {
    setCollaborationsData(updater);
    setHasUnsavedChanges(true);
  };

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
    loadCollaborationsData();
  }, []);

  const loadShowData = async () => {
    try {
      const response = await fetch('/api/show-data?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=3d118359e4c93c7c44f3507e8a0907c2');
      if (response.ok) {
        const data = await response.json();
        setShowData(data);
      }
    } catch (error) {
      console.error('Error loading show data:', error);
    }
  };

  const loadCollaborationsData = async () => {
    try {
      const response = await fetch('/api/collaborations?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=3d118359e4c93c7c44f3507e8a0907c2');
      if (response.ok) {
        const data = await response.json();
        setCollaborationsData(data);
      }
    } catch (error) {
      console.error('Error loading collaborations data:', error);
    }
  };

  const saveCollaborationsData = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/collaborations?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=3d118359e4c93c7c44f3507e8a0907c2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collaborationsData),
      });

      if (response.ok) {
        setMessage('✅ Collaborations saved successfully!');
        setHasUnsavedChanges(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Error saving collaborations');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error saving collaborations:', error);
      setMessage('❌ Error saving collaborations');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const saveShowData = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/show-data?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=3d118359e4c93c7c44f3507e8a0907c2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showData),
      });

      if (response.ok) {
        setMessage('✅ Show information saved successfully!');
        setHasUnsavedChanges(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Error saving show information');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error saving show data:', error);
      setMessage('❌ Error saving show information');
      setTimeout(() => setMessage(''), 5000);
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

  // Collaborations management functions
  const addCollaboration = () => {
    setCollaborationsData(prev => ({
      ...prev,
      collaborations: [...prev.collaborations, { 
        name: '', 
        role: '', 
        social: '', 
        image: '', 
        project: '', 
        year: '', 
        genre: '' 
      }]
    }));
  };

  const removeCollaboration = (index: number) => {
    setCollaborationsData(prev => ({
      ...prev,
      collaborations: prev.collaborations.filter((_, i) => i !== index)
    }));
  };

  const updateCollaboration = (index: number, field: keyof Collaborator, value: string) => {
    setCollaborationsData(prev => ({
      ...prev,
      collaborations: prev.collaborations.map((collab, i) => 
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
          className="flex justify-between items-center mb-8 p-6 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <h1 className="text-3xl font-light text-white">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>


        {/* Success/Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-xl border border-white/10 text-white text-center"
          >
            {message}
          </motion.div>
        )}


        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Collaborations Gallery - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-light text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#fbbf24]" />
                  Collaborators
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${collaborationsData.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-[#C9C9D0]">
                    {collaborationsData.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-[#C9C9D0]">
                    {collaborationsData.collaborations.length} collaboration{collaborationsData.collaborations.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Collaborations Widget Toggle */}
            <div className="mb-6 p-4 bg-[#0a0a0a]/30 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${collaborationsData.isActive ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                    <Users className={`w-5 h-5 ${collaborationsData.isActive ? 'text-green-400' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Show on website</h3>
                    <p className="text-sm text-[#C9C9D0]">{collaborationsData.isActive ? 'Visible' : 'Hidden'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      updateCollaborationsData(prev => ({ ...prev, isActive: !prev.isActive }));
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:ring-offset-2 focus:ring-offset-[#1a1a2e] ${
                      collaborationsData.isActive ? 'bg-[#fbbf24]' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      collaborationsData.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to remove the entire collaborations section? This will delete all collaboration data and cannot be undone.')) {
                        setCollaborationsData({ isActive: false, collaborations: [] });
                      }
                    }}
                    className="px-3 py-1 text-red-400 hover:bg-red-400/20 rounded-lg transition-all text-sm border border-red-400/30 hover:border-red-400/50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>


            {/* Collaborations Content */}
            <div className="space-y-4">
              {collaborationsData.collaborations.map((collab, index) => (
                <div key={index} className="p-4 bg-[#1a1a2e]/50 rounded-lg border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fbbf24]/20 to-[#a855f7]/20 rounded-full flex items-center justify-center overflow-hidden">
                      {collab.image ? (
                        <img 
                          src={collab.image} 
                          alt={collab.name}
                          className="w-12 h-12 rounded-full object-cover"
                          style={{ 
                            objectPosition: 'center',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            console.error('Failed to load image:', collab.image);
                            e.currentTarget.style.display = 'none';
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                          onLoad={(e) => {
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'none';
                            }
                          }}
                          style={{ display: 'block' }}
                        />
                      ) : null}
                      <span 
                        className={`text-white font-bold text-sm ${collab.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
                      >
                        {collab.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{collab.name || 'New Collaboration'}</h4>
                      <p className="text-[#C9C9D0] text-sm">{collab.role || 'Role'}</p>
                    </div>
                    <button
                      onClick={() => removeCollaboration(index)}
                      className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={collab.name || ''}
                      onChange={(e) => updateCollaboration(index, 'name', e.target.value)}
                      className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                      placeholder="Artist Name"
                    />
                    <input
                      type="text"
                      value={collab.role || ''}
                      onChange={(e) => updateCollaboration(index, 'role', e.target.value)}
                      className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      value={collab.project || ''}
                      onChange={(e) => updateCollaboration(index, 'project', e.target.value)}
                      className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                      placeholder="Project Name"
                    />
                    <input
                      type="text"
                      value={collab.year || ''}
                      onChange={(e) => updateCollaboration(index, 'year', e.target.value)}
                      className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                      placeholder="Year"
                    />
                    <input
                      type="text"
                      value={collab.genre || ''}
                      onChange={(e) => updateCollaboration(index, 'genre', e.target.value)}
                      className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                      placeholder="Genre"
                    />
                  </div>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-white mb-2">Social Media</label>
                    <input
                      type="text"
                      value={collab.social || ''}
                      onChange={(e) => updateCollaboration(index, 'social', e.target.value)}
                      className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                      placeholder="@username or https://instagram.com/username"
                    />
                  </div>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-white mb-2">Profile Image</label>
                    <ImageUpload
                      onImageUpload={(url) => updateCollaboration(index, 'image', url)}
                      currentImage={collab.image}
                      className="mb-2"
                    />
                  </div>
                </div>
              ))}
              
              {collaborationsData.collaborations.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <Users className="w-12 h-12 mx-auto text-[#C9C9D0]/50 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No Collaborations</h3>
                    <p className="text-sm text-[#C9C9D0] mb-4">Start building your collaborations gallery</p>
                  </div>
                  <button
                    onClick={() => setCollaborationsData(prev => ({ ...prev, isActive: true, collaborations: [
                      { name: "New Artist", role: "Collaborator", social: "", image: "", project: "", year: "", genre: "" }
                    ]}))}
                    className="px-4 py-2 bg-[#fbbf24] text-black rounded-lg hover:bg-[#f59e0b] transition-all font-medium"
                  >
                    Add First
                  </button>
                </div>
              ) : (
                <button
                  onClick={addCollaboration}
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-[#C9C9D0]/30 text-[#C9C9D0] rounded-lg hover:border-[#fbbf24] hover:text-[#fbbf24] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              )}
              
              <button
                onClick={saveCollaborationsData}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium ${
                  hasUnsavedChanges 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' 
                    : 'bg-[#fbbf24] text-black hover:bg-[#fbbf24]/90'
                }`}
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Save All'}
              </button>
            </div>
          </motion.div>

          {/* Show Information - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-white flex items-center gap-2">
                <Music className="w-6 h-6 text-[#fbbf24]" />
                Event Details
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getShowStatus().bg}`}>
                    <Activity className={`w-5 h-5 ${getShowStatus().color}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Show widget on website</h3>
                    <p className="text-sm text-[#C9C9D0]">Widget is {showData.isActive ? 'visible to visitors' : 'hidden from visitors'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setShowData(prev => ({ ...prev, isActive: !prev.isActive }));
                      setHasUnsavedChanges(true);
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:ring-offset-2 focus:ring-offset-[#1a1a2e] ${
                      showData.isActive ? 'bg-[#fbbf24]' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showData.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to remove the show widget? This will clear all show data and cannot be undone.')) {
                        setShowData({
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
                      }
                    }}
                    className="px-3 py-1 text-red-400 hover:bg-red-400/20 rounded-lg transition-all text-sm border border-red-400/30 hover:border-red-400/50"
                  >
                    Remove Widget
                  </button>
                </div>
              </div>
            </div>

            {/* Show Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title</label>
                <input
                  type="text"
                  value={showData.title}
                  onChange={(e) => updateShowData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="Enter show title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Date</label>
                  <div className="relative">
                    <Calendar 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#fbbf24] cursor-pointer hover:text-[#f59e0b] transition-colors z-10" 
                      onClick={() => document.getElementById('date-input')?.showPicker()}
                    />
                    <input
                      id="date-input"
                      type="date"
                      value={showData.date}
                      onChange={(e) => updateShowData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full pl-10 pr-3 py-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-4 [&::-webkit-calendar-picker-indicator]:h-4 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Time</label>
                  <div className="relative">
                    <Clock 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#fbbf24] cursor-pointer hover:text-[#f59e0b] transition-colors z-10" 
                      onClick={() => document.getElementById('time-input')?.showPicker()}
                    />
                    <input
                      id="time-input"
                      type="time"
                      value={showData.time}
                      onChange={(e) => updateShowData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full pl-10 pr-3 py-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-4 [&::-webkit-calendar-picker-indicator]:h-4 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Venue</label>
                <input
                  type="text"
                  value={showData.venue}
                  onChange={(e) => updateShowData(prev => ({ ...prev, venue: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="Venue name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Location</label>
                <input
                  type="text"
                  value={showData.location}
                  onChange={(e) => updateShowData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Type</label>
                <select
                  value={showData.type}
                  onChange={(e) => updateShowData(prev => ({ ...prev, type: e.target.value as 'live' | 'streaming' | 'recording' }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                >
                  <option value="live">Live Performance</option>
                  <option value="streaming">Streaming</option>
                  <option value="recording">Recording Session</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <textarea
                  value={showData.description}
                  onChange={(e) => updateShowData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all resize-none"
                  placeholder="Show description..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Booking Information</h3>
                  <Info className="w-5 h-5 text-[#fbbf24]" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Booking Link</label>
                  <input
                    type="url"
                    value={showData.link}
                    onChange={(e) => updateShowData(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                    placeholder="https://tickets.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Link Text</label>
                  <input
                    type="text"
                    value={showData.linkText}
                    onChange={(e) => updateShowData(prev => ({ ...prev, linkText: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                    placeholder="Book Tickets"
                  />
                </div>
              </div>


            {/* Save Button */}
            <button
              onClick={saveShowData}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg ${
                hasUnsavedChanges 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl hover:shadow-orange-500/25' 
                  : 'bg-gradient-to-r from-[#fbbf24] to-[#a855f7] hover:from-[#f59e0b] hover:to-[#9333ea] text-white hover:shadow-xl hover:shadow-[#fbbf24]/25'
              }`}
            >
              <Save className="w-5 h-5" />
              {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Save'}
            </button>
            </div>

            {/* Quick Actions */}
            <div className="mb-6 p-4 bg-[#0a0a0a]/30 rounded-xl border border-white/10">
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#fbbf24]" />
                Quick Actions
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] text-white rounded-lg transition-all text-sm border border-white/10"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
                
                <button
                  onClick={() => copyToClipboard(window.location.origin)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] text-white rounded-lg transition-all text-sm border border-white/10"
                >
                  {copySuccess ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copySuccess ? 'Copied!' : 'Copy Site URL'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}