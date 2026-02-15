import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const predefinedResponses = {
  "hello": "Hello! Welcome to our hotel. How can I assist you today?",
  "hi": "Hi there! How may I help you?",
  "booking": "To make a booking, please visit our Booking page or tell me your check-in date, check-out date, and number of guests.",
  "price": "Our rooms range from $149 to $599 per night. Would you like to see available rooms?",
  "amenities": "We offer WiFi, parking, breakfast, gym, pool, restaurant, and 24/7 room service. What specific amenity are you interested in?",
  "location": "We are located at 123 Main Street, New Delhi, India. We're close to major attractions and business districts.",
  "cancel": "You can cancel your booking free of charge up to 24 hours before check-in. Visit 'My Bookings' to manage your reservations.",
  "contact": "You can reach us at +91 98765 43210 or email contact@xyzhotel.com. We're available 24/7!",
  "rooms": "We have Deluxe Suites, Executive Rooms, Family Suites, Premium Suites, and Honeymoon Suites. Which interests you?",
  "checkout": "Check-out time is 11:00 AM. Late check-out can be arranged for an additional fee.",
  "checkin": "Check-in time is 2:00 PM. Early check-in is subject to availability.",
  "default": "I understand you're asking about: {query}. For detailed assistance, please contact our support team at +91 98765 43210 or visit our Contact page."
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in predefined responses
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Default response
    return predefinedResponses.default.replace("{query}", userMessage);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "Book a room",
    "View amenities",
    "Check prices",
    "Contact info",
    "Cancellation policy"
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                   p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 
                   hover:scale-110 group animate-pulse"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-md h-[100vh] sm:h-[600px] flex flex-col 
                      bg-white/10 backdrop-blur-xl border-t sm:border border-white/20 sm:rounded-3xl shadow-2xl 
                      animate-slideUp overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base">Hotel Assistant</h3>
                <p className="text-white/80 text-xs">Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-900/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-2.5 sm:p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <p className="text-xs sm:text-sm">{message.text}</p>
                  <p className="text-[10px] sm:text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-2.5 sm:p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-2 sm:p-3 bg-gray-900/50 border-t border-white/10">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputText(action);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/20 text-white text-xs rounded-full 
                           hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 bg-gray-900/50 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/20 text-white text-sm
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl 
                         hover:shadow-lg transition-all duration-300 disabled:opacity-50 
                         disabled:cursor-not-allowed hover:scale-105"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
