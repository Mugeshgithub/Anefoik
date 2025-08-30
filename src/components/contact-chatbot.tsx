'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Music } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ContactChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Anefiok's contact assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Thank you for your message! I'll make sure Anefiok gets back to you soon. You can also reach out directly at anefiok@music.com",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* Chatbot Toggle Button - Black Theme */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 bg-black/60 hover:bg-black/80 text-white shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center rounded-full border border-white/20 hover:border-white/40 backdrop-blur-xl"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-none">
          {/* Chat Window - Black Theme */}
          <div className="w-[calc(100vw-2rem)] sm:w-80 max-w-sm rounded-2xl shadow-2xl overflow-hidden pointer-events-auto bg-black/70 border border-white/20 backdrop-blur-xl">
            {/* Header - Black Theme */}
            <div className="relative p-4 border-b bg-gradient-to-r border-white/20 from-black/50 to-black/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full animate-pulse bg-gradient-to-r from-white to-gray-300"></div>
                  <h3 className="font-semibold text-lg text-white">Contact Anefiok</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              

            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black/40 to-black/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-white to-gray-200 text-black'
                        : 'bg-gradient-to-r from-gray-800 to-black text-white'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-white/20 to-gray-200/20 text-white border border-white/30'
                        : 'bg-gradient-to-r from-black/40 to-gray-800/40 text-white border border-white/20'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Invisible div for auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Black Theme */}
            <div className="p-4 border-t bg-gradient-to-r from-black/50 to-black/30 border-white/20">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onKeyDown={(e) => e.stopPropagation()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 backdrop-blur-xl rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-sm bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-white/50 focus:ring-white/20"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="px-4 py-2 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:cursor-not-allowed bg-gradient-to-r from-white/80 to-white/60 hover:from-white to-white/80 text-black disabled:from-gray-600 disabled:to-gray-700"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
