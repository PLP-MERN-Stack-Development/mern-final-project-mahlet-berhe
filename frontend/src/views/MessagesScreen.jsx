import React from 'react';

const MessagesScreen = ({
  t = {},
  workers = [],
  navigateTo = () => {},
  setActiveChat = () => {}
}) => (
  <div className="min-h-screen bg-gray-50 pb-20">
    {/* Header */}
    <div className="bg-white border-b border-gray-200 p-4">
      <h1 className="text-xl font-bold text-gray-900">{t.messages || 'Messages'}</h1>
    </div>

    {/* Message List */}
    <div className="divide-y divide-gray-200">
      {workers.length > 0 ? (
        workers.slice(0, 2).map((worker, idx) => (
          <button
            key={worker.id}
            onClick={() => {
              setActiveChat(worker);
              navigateTo('chat');
            }}
            className="w-full bg-white p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                {worker.name?.charAt(0) || 'U'}
              </div>
              {idx === 0 && (
                <>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                </>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-gray-900">{worker.name}</p>
                <p className="text-xs text-gray-500">{idx === 0 ? '2 min ago' : '1 hour ago'}</p>
              </div>
              <p className={`text-sm ${idx === 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                {idx === 0 ? 'I can come tomorrow morning' : 'Thank you for booking!'}
              </p>
            </div>
          </button>
        ))
      ) : (
        <div className="text-center py-12 text-gray-500 text-sm">
          {t.noMessages || 'No messages yet.'}
        </div>
      )}
    </div>
  </div>
);

export default MessagesScreen;