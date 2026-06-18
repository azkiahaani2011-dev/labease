import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Building2, TrendingUp, Plus, FileText, ArrowRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';
import Badge from '../components/Badge';
import { mockBookings, monthlyRevenue } from '../lib/mockData';
import type { Booking } from '../types';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const totalRevenue = mockBookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + b.amount, 0);
  const recentBookings = [...mockBookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <Link to="/bookings" className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" />
          New Booking
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Bookings" value={mockBookings.length} change="12% from last month" changeType="up" icon={Calendar} iconBg="bg-accent" loading={loading} />
        <StatsCard title="Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} change="8.5% from last month" changeType="up" icon={TrendingUp} iconBg="bg-green-500" loading={loading} />
        <StatsCard title="Active Labs" value={6} change="1 new this month" changeType="up" icon={Building2} iconBg="bg-purple-500" loading={loading} />
        <StatsCard title="Patients" value={30} change="15 new this month" changeType="up" icon={Users} iconBg="bg-orange-500" loading={loading} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Booking Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => [v, 'Bookings'] as [number, string]} />
              <Line type="monotone" dataKey="bookings" stroke="#1158A6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₹${(Number(v)/1000).toFixed(1)}k`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#1158A6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Bookings</h2>
          <Link to="/bookings" className="flex items-center gap-1 text-sm text-accent hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {['Booking ID', 'Patient', 'Lab', 'Test', 'Date', 'Status', 'Payment'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentBookings.map((b: Booking) => (
                <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-mono text-xs text-accent font-medium">{b.id}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{b.patientName}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{b.labName.split(' ')[0]}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-[140px] truncate">{b.testName}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{b.date}</td>
                  <td className="px-4 py-3"><Badge variant={b.status} /></td>
                  <td className="px-4 py-3"><Badge variant={b.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { to: '/bookings', icon: Calendar, label: 'Manage Bookings', color: 'bg-blue-50 dark:bg-blue-900/20 text-accent' },
          { to: '/patients', icon: Users, label: 'View Patients', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
          { to: '/labs', icon: Building2, label: 'Manage Labs', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
          { to: '/reports', icon: FileText, label: 'Reports', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
        ].map(a => (
          <Link key={a.to} to={a.to} className={`card p-4 flex flex-col items-center gap-3 hover:shadow-card-hover transition-all text-center ${a.color}`}>
            <a.icon className="h-6 w-6" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
