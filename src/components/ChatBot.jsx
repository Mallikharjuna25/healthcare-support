import React, { useState, useEffect, useRef } from 'react'
import { matchFAQ, SUGGESTIONS, GREETING_MSG, FALLBACK_RESPONSE } from '../utils/chatbotKB'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Initialize from sessionStorage or with greeting
  useEffect(() => {
    const savedChat = sessionStorage.getItem('healthngo_chat_history');
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch (e) {
        setMessages([{ sender: 'bot', text: GREETING_MSG }]);
      }
    } else {
      const initial = [{ sender: 'bot', text: GREETING_MSG }];
      setMessages(initial);
      sessionStorage.setItem('healthngo_chat_history', JSON.stringify(initial));
    }
  }, []);

  // Save to sessionStorage and scroll down when messages update
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('healthngo_chat_history', JSON.stringify(messages));
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Trigger typing state
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const match = matchFAQ(text);
      const botResponseText = match ? match.answer : FALLBACK_RESPONSE;
      const botMsg = { sender: 'bot', text: botResponseText };
      
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className="chat-fab" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chatbot Assistance"
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && <span className="chat-badge">1</span>}
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'chat-open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-avatar">⚕️</div>
          <div className="chat-header-info">
            <div className="chat-header-name">HealthBot</div>
            <div className="chat-header-status">
              <span className="status-dot"></span> Online
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={index} className={`msg-row ${isUser ? 'user-msg' : ''}`}>
                <div className={`msg-avatar ${isUser ? 'user-avatar' : 'bot-avatar'}`}>
                  {isUser ? '👤' : '⚕️'}
                </div>
                <div 
                  className={`msg-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            );
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="msg-row">
              <div className="msg-avatar bot-avatar">⚕️</div>
              <div className="msg-bubble bot-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Reply Suggestions */}
        <div className="chat-suggestions">
          {SUGGESTIONS.map((sug, idx) => (
            <button 
              key={idx} 
              className="suggestion-btn" 
              onClick={() => handleSendMessage(sug)}
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Row */}
        <div className="chat-input-row">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask a question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="chat-send-btn" 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
          >
            ➡️
          </button>
        </div>
      </div>
    </>
  );
}
