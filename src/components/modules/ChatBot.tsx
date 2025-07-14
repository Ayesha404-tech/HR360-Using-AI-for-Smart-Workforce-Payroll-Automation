import React, { useState } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const mockResponses = [
  "I can help you with HR-related questions. What would you like to know?",
  "For leave requests, please go to the Leave Management section and submit your request.",
  "Your attendance records show you've been punctual this month. Great work!",
  "To check your payroll information, visit the Payroll section in your dashboard.",
  "For performance reviews, please contact your manager or HR department.",
  "I can help you with policy questions, attendance tracking, and general HR inquiries.",
];

export const ChatBot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hello ${user?.firstName}! I'm your HR360 AI assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>

      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot size={24} className="text-blue-600" />
            <span>HR360 AI Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === 'user' ? (
                      <User size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader size={16} className="animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
              <Send size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => setInputMessage('How do I apply for leave?')}
              className="text-left justify-start"
            >
              How do I apply for leave?
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputMessage('Check my attendance')}
              className="text-left justify-start"
            >
              Check my attendance
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputMessage('When is my next performance review?')}
              className="text-left justify-start"
            >
              Performance review info
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputMessage('Show me company policies')}
              className="text-left justify-start"
            >
              Company policies
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputMessage('How do I update my profile?')}
              className="text-left justify-start"
            >
              Update profile
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputMessage('Contact HR department')}
              className="text-left justify-start"
            >
              Contact HR
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};