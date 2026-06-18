import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, Calendar, IndianRupee } from 'lucide-react';
import { monthlyRevenue, testTypeBookings, patientGrowth, topLabsData } from '../lib/mockData';

export default function Analytics() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalBookings = monthlyRevenue.reduce((s, m) => s + m.bookings, 0);
  const avgRevenue = Math.round(totalRevenue / monthlyRevenue.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Business insights and performance metrics</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: IndianRupee, color: 'bg-accent' },
          { label: 'Total Bookings', value: totalBookings.toLocaleString(), icon: Calendar, color: 'bg-green-500' },
          { label: 'Avg Monthly Revenue', value: `₹${(avgRevenue / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'bg-purple-500' },
          { label: 'Patient Growth', value: '+188%', icon: Users, color: 'bg-orange-500' },
        ].map(k => (
          <div key={k.label} className="card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${k.color} flex items-center justify-center flex-shrink-0`}>
              <k.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{k.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & Bookings charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue (₹)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [typeof v === 'number' ? `₹${(v/1000).toFixed(1)}k` : v, 'Revenue']} />
              <Bar dataKey="revenue" fill="#1158A6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Patient Growth</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={patientGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie + Top Labs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Bookings by Test Type</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={testTypeBookings} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {testTypeBookings.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, name) => [v, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 min-w-[140px]">
              {testTypeBookings.map(t => (
                <div key={t.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{t.name}</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white ml-auto">{t.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Top Labs by Bookings</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topLabsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={65} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#0F2D6B" radius={[0,4,4,0]} name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
