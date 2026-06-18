import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconBg: string;
  loading?: boolean;
}

export default function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon, iconBg, loading = false }: StatsCardProps) {
  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
    );
  }

  return (
    <div className="card p-6 hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        <div className={`p-2 rounded-lg ${iconBg}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      {change && (
        <p className={`text-xs font-medium ${
          changeType === 'up' ? 'text-green-600 dark:text-green-400' :
          changeType === 'down' ? 'text-red-600 dark:text-red-400' :
          'text-gray-500 dark:text-gray-400'
        }`}>
          {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
        </p>
      )}
    </div>
  );
}
