import React, { useState } from 'react';
import { ProjectChatMessage } from '../../types';
import { MessageSquare, Send, Paperclip, User } from 'lucide-react';

interface Props {
  messages: ProjectChatMessage[];
  onSendMessage?: (msgText: string) => void;
  isCustomerView?: boolean;
}

export const ProjectChatPanel: React.FC<Props> = ({
  messages,
  onSendMessage,
  isCustomerView = false,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (onSendMessage) {
      onSendMessage(inputText);
    }
    setInputText('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col h-[550px]">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Project PM Communication Stream
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Direct communication channel with your assigned Project Manager & Support Lead.
          </p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-400 italic">
            No project messages exchanged yet. Start a conversation with your PM.
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = isCustomerView ? msg.senderType === 'CUSTOMER' : msg.senderType !== 'CUSTOMER';

            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{msg.senderName}</span>
                  <span>({msg.senderRole})</span>
                  <span>&bull;</span>
                  <span>{msg.timestamp.split('T')[1]?.substring(0, 5) || msg.timestamp.split('T')[0]}</span>
                </div>

                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-sky-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      {onSendMessage && (
        <form onSubmit={handleSend} className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your question or clarification request..."
            className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-all"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </form>
      )}
    </div>
  );
};
