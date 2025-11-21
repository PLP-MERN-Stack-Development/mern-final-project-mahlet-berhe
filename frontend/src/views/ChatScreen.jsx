import React from 'react';
import { ChevronLeft, Phone, Paperclip, Send } from 'lucide-react';

const ChatScreen = ({
  activeChat,
  workers = [],
  chatMessages = [],
  chatInput = '',
  setChatInput = () => {},
  sendMessage = () => {},
  navigateTo = () => {},
  t = {},
  language = 'en'
}) => {
  const worker = activeChat || workers[0] || { name: 'User', phone: '' };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 shadow-sm">
        <button
          onClick={() => navigateTo('messages')}
          className="text-gray-600 hover:text-gray-900"
          aria-label="Back to messages"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {worker.name?.charAt(0) || 'U'}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{worker.name}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              {t.online || 'Online'}
            </p>
          </div>
        </div>
        <button
          onClick={() => window.location.href = `tel:${worker.phone}`}
          className="bg-blue-100 text-blue-600 p-2 rounded-xl hover:bg-blue-200 transition-colors"
          aria-label="Call worker"
        >
          <Phone className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500">{language === 'en' ? 'Today' : 'ዛሬ'}</p>
        </div>
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div
              className={`max-w-[75%] ${
                msg.sender === 'me'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              } rounded-2xl px-4 py-3 shadow-sm`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 flex items-center gap-2">
        <button className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Attach file">
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={t.typeMessage || 'Type a message...'}
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
        <button
          onClick={sendMessage}
          disabled={!chatInput.trim()}
          className="bg-blue-600 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-lg"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;