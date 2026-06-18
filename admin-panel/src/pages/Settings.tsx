import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Moon, Sun, Bell, Lock, User } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ bookings: true, payments: true, reports: false, system: true });

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('labease-theme', next ? 'dark' : 'light');
  };

  useEffect(() => {
    const theme = localStorage.getItem('labease-theme');
    if (theme === 'dark') { setDark(true); document.documentElement.classList.add('dark'); }
  }, []);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your preferences</p>
      </div>

      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <User size={16} className="text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Profile</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Name</label>
            <input defaultValue={user?.name} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Email</label>
            <input defaultValue={user?.email} readOnly className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Role</label>
            <input value={user?.role === 'super_admin' ? 'Super Admin' : 'Lab Admin'} readOnly className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed" />
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <Sun size={16} className="text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Switch between light and dark theme</p>
          </div>
          <button onClick={toggleDark}
            className={`relative w-12 h-6 rounded-full transition-colors ${dark ? 'bg-blue-600' : 'bg-gray-200'}`}>
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${dark ? 'translate-x-6' : ''}`} />
            {dark ? <Moon size={12} className="absolute right-1.5 top-1.5 text-white" /> : <Sun size={12} className="absolute left-1.5 top-1.5 text-gray-400" />}
          </button>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <Bell size={16} className="text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Notifications</h2>
        </div>
        {Object.entries(notifs).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{key} alerts</p>
            <button onClick={() => setNotifs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${val ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${val ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <Lock size={16} className="text-blue-600" />
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Change Password</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <button onClick={handleSave}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors">
        {saved ? '✓ Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
