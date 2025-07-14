import React, { useState } from 'react';
import { Bell, X, Check, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Leave Request Approved',
    message: 'Your vacation leave request for Feb 15-20 has been approved.',
    type: 'success',
    isRead: false,
    createdAt: '2024-01-20T10:30:00',
  },
  {
    id: '2',
    title: 'Performance Review Due',
    message: 'Your quarterly performance review is due next week.',
    type: 'warning',
    isRead: false,
    createdAt: '2024-01-19T14:15:00',
  },
  {
    id: '3',
    title: 'Payroll Processed',
    message: 'Your January salary has been processed and will be credited soon.',
    type: 'info',
    isRead: true,
    createdAt: '2024-01-18T09:00:00',
  },
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-green-600" />;
      case 'warning': return <AlertTriangle size={20} className="text-yellow-600" />;
      case 'error': return <XCircle size={20} className="text-red-600" />;
      default: return <Info size={20} className="text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-96 z-50">
      <Card className="max-h-96 overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell size={20} />
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                <Check size={16} className="mr-1" />
                Mark All Read
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getTypeColor(notification.type)} ${
                    !notification.isRead ? 'bg-opacity-100' : 'bg-opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getIcon(notification.type)}
                      <div className="flex-1">
                        <h4 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h4>
                        <p className={`text-sm mt-1 ${!notification.isRead ? 'text-gray-700' : 'text-gray-500'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};