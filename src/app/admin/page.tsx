'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Save, Eye, EyeOff, Plus, Trash2, Music, Calendar, MapPin, Link, Users, LogOut, Clock, TrendingUp, Activity, Settings, Copy, Check, AlertCircle, Info } from 'lucide-react';

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
      const response = await fetch('/api/show-data');
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
      const response = await fetch('/api/collaborations');
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
      const response = await fetch('/api/collaborations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collaborationsData),
      });

      if (response.ok) {
        setMessage('✅ Collaborations saved successfully!');
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
      const response = await fetch('/api/show-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showData),
      });

      if (response.ok) {
        setMessage('✅ Show information saved successfully!');
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
          <div>
            <h1 className="text-3xl font-light text-white mb-2">Show Manager</h1>
            <p className="text-[#C9C9D0]">Manage show information and website content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getShowStatus().bg}`}>
                <Activity className={`w-5 h-5 ${getShowStatus().color}`} />
              </div>
              <div>
                <h3 className="text-white font-medium">Widget Status</h3>
                <p className={`text-sm capitalize ${getShowStatus().color}`}>
                  {getShowStatus().status}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Collaborations</h3>
                <p className="text-sm text-[#C9C9D0]">
                  {collaborationsData.collaborations.length} artists
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Last Updated</h3>
                <p className="text-sm text-[#C9C9D0]">Just now</p>
              </div>
            </div>
          </motion.div>
        </div>

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

        {/* Live Preview Section - Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
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
              <span className="text-sm text-[#C9C9D0]">
                {showData.isActive ? 'Widget Active' : 'Widget Hidden'}
              </span>
            </div>
          </div>

          {/* Preview Content */}
          {showPreview ? (
            <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-white/10">
              {hasShowData() ? (
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
                    <div className="mt-4">
                      <a 
                        href={showData.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#fbbf24] text-black rounded-lg hover:bg-[#f59e0b] transition-colors text-sm font-medium"
                      >
                        <Link className="w-4 h-4" />
                        {showData.linkText || 'Book Now'}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-[#C9C9D0] border-2 border-dashed border-[#C9C9D0]/30 rounded-lg">
                  <EyeOff className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-white mb-2">Widget Hidden</h3>
                  <p className="text-sm mb-4">The collaboration widget is currently hidden from visitors</p>
                  <p className="text-xs">Enable "Show widget on website" to make it visible</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-[#C9C9D0] border-2 border-dashed border-[#C9C9D0]/30 rounded-lg">
              <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-white mb-2">Preview Hidden</h3>
              <p className="text-sm mb-4">Click "Show Preview" to see how your widget will appear</p>
            </div>
          )}
        </motion.div>

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
                  Collaborations Gallery
                </h2>
                <p className="text-sm text-[#C9C9D0] mt-1">Manage the collaborations section on your website</p>
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
                    <h3 className="text-white font-medium">Show collaborations section on website</h3>
                    <p className="text-sm text-[#C9C9D0]">Collaborations section is {collaborationsData.isActive ? 'visible to visitors' : 'hidden from visitors'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={async () => {
                      const newData = { ...collaborationsData, isActive: !collaborationsData.isActive };
                      setCollaborationsData(newData);
                      // Auto-save when toggling
                      try {
                        const response = await fetch('/api/collaborations', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(newData),
                        });
                        if (response.ok) {
                          setMessage('✅ Collaborations updated!');
                          setTimeout(() => setMessage(''), 2000);
                        }
                      } catch (error) {
                        console.error('Error auto-saving:', error);
                      }
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
                    Remove Section
                  </button>
                </div>
              </div>
            </div>

            {/* Collaborations Content */}
            <div className="space-y-4">
              {collaborationsData.collaborations.map((collab, index) => (
                <div key={index} className="p-4 bg-[#1a1a2e]/50 rounded-lg border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fbbf24]/20 to-[#a855f7]/20 rounded-full flex items-center justify-center">
                      {collab.image ? (
                        <img 
                          src={collab.image} 
                          alt={collab.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {collab.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      )}
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
                      placeholder="Role (e.g., Vocalist, Producer)"
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
                    <input
                      type="url"
                      value={collab.image || ''}
                      onChange={(e) => updateCollaboration(index, 'image', e.target.value)}
                      className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                      placeholder="Image URL (Cloudinary recommended)"
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
                    Add First Collaboration
                  </button>
                </div>
              ) : (
                <button
                  onClick={addCollaboration}
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-[#C9C9D0]/30 text-[#C9C9D0] rounded-lg hover:border-[#fbbf24] hover:text-[#fbbf24] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Collaboration
                </button>
              )}
              
              <button
                onClick={saveCollaborationsData}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 p-3 bg-[#fbbf24] text-black rounded-lg hover:bg-[#fbbf24]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Saving...' : 'Save Collaborations'}
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
                    onClick={async () => {
                      const newData = { ...showData, isActive: !showData.isActive };
                      setShowData(newData);
                      // Auto-save when toggling
                      try {
                        const response = await fetch('/api/show-data', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(newData),
                        });
                        if (response.ok) {
                          setMessage('✅ Show widget updated!');
                          setTimeout(() => setMessage(''), 2000);
                        }
                      } catch (error) {
                        console.error('Error auto-saving:', error);
                      }
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
                <label className="block text-sm font-medium text-white mb-2">Show Title</label>
                <input
                  type="text"
                  value={showData.title}
                  onChange={(e) => setShowData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="Enter show title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Date</label>
                  <input
                    type="text"
                    value={showData.date}
                    onChange={(e) => setShowData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                    placeholder="Dec 25, 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Time</label>
                  <input
                    type="text"
                    value={showData.time}
                    onChange={(e) => setShowData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                    placeholder="8:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Venue</label>
                <input
                  type="text"
                  value={showData.venue}
                  onChange={(e) => setShowData(prev => ({ ...prev, venue: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="Venue name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Location</label>
                <input
                  type="text"
                  value={showData.location}
                  onChange={(e) => setShowData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Show Type</label>
                <select
                  value={showData.type}
                  onChange={(e) => setShowData(prev => ({ ...prev, type: e.target.value as 'live' | 'streaming' | 'recording' }))}
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
                  onChange={(e) => setShowData(prev => ({ ...prev, description: e.target.value }))}
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
                    onChange={(e) => setShowData(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                    placeholder="https://tickets.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Link Text</label>
                  <input
                    type="text"
                    value={showData.linkText}
                    onChange={(e) => setShowData(prev => ({ ...prev, linkText: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a]/50 border border-white/20 rounded-lg text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all"
                    placeholder="Book Tickets"
                  />
                </div>
              </div>

              {/* Collaborating Artists */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Collaborating Artists</h3>
                  <button
                    onClick={addCollaborator}
                    className="flex items-center gap-2 px-3 py-1 bg-[#fbbf24]/20 text-[#fbbf24] rounded-lg hover:bg-[#fbbf24]/30 transition-all text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Artist
                  </button>
                </div>
                
                <div className="space-y-3">
                  {showData.collaborators.map((collaborator, index) => (
                    <div key={index} className="p-4 bg-[#0a0a0a]/30 rounded-lg border border-white/10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#fbbf24]/20 to-[#a855f7]/20 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {collaborator.name.charAt(0) || '?'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{collaborator.name || 'New Collaborator'}</h4>
                          <p className="text-[#C9C9D0] text-sm">{collaborator.role || 'Role'}</p>
                        </div>
                        <button
                          onClick={() => removeCollaborator(index)}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <input
                          type="text"
                          value={collaborator.name}
                          onChange={(e) => updateCollaborator(index, 'name', e.target.value)}
                          className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                          placeholder="Artist Name"
                        />
                        <input
                          type="text"
                          value={collaborator.role}
                          onChange={(e) => updateCollaborator(index, 'role', e.target.value)}
                          className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                          placeholder="Role (e.g., Vocalist, Producer)"
                        />
                        <input
                          type="text"
                          value={collaborator.social}
                          onChange={(e) => updateCollaborator(index, 'social', e.target.value)}
                          className="w-full p-2 bg-[#0a0a0a]/50 border border-white/20 rounded text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/20 transition-all text-sm"
                          placeholder="@instagram or website"
                        />
                      </div>
                    </div>
                  ))}
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