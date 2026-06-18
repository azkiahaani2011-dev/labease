import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Sun, Moon, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { mockNotifications } from '../lib/mockData';

interface TopbarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onMobileMenu: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Topbar({ collapsed, onToggleCollapse, onMobileMenu, darkMode, onToggleDark }: TopbarProps) {
  const { user, logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const typeColors: Record<string, string> = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  function timeAgo(dateStr: string) {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button onClick={onMobileMenu} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Menu className="h-5 w-5" />
        </button>
        {/* Desktop collapse toggle */}
        <button onClick={onToggleCollapse} className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button onClick={onToggleDark} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Notifications</h3>
                <button onClick={markAllRead} className="text-xs text-accent hover:underline">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${!n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${typeColors[n.type]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{n.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{timeAgo(n.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center ml-1">
          <span className="text-white text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span>
        </div>
      </div>
    </header>
  );
}
