import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, Building2, FileText,
  BarChart3, Settings, X, Activity
} from 'lucide-react';
import { useAuth } from '../lib/auth';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const allNavItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['super_admin', 'lab_admin'] },
  { to: '/bookings', icon: Calendar, label: 'Bookings', roles: ['super_admin', 'lab_admin'] },
  { to: '/patients', icon: Users, label: 'Patients', roles: ['super_admin', 'lab_admin'] },
  { to: '/labs', icon: Building2, label: 'Labs', roles: ['super_admin'] },
  { to: '/reports', icon: FileText, label: 'Reports', roles: ['super_admin', 'lab_admin'] },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', roles: ['super_admin'] },
  { to: '/settings', icon: Settings, label: 'Settings', roles: ['super_admin', 'lab_admin'] },
];

function NavItem({ item, collapsed }: { item: typeof allNavItems[0]; collapsed: boolean }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
        ${isActive
          ? 'bg-white/20 text-white font-medium'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
        }
        ${collapsed ? 'justify-center' : ''}`
      }
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span className="text-sm">{item.label}</span>}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const { user } = useAuth();
  const navItems = allNavItems.filter(item => user && item.roles.includes(user.role));

  const sidebarContent = (
    <div className="flex flex-col h-full bg-navy">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex-shrink-0 w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
          <Activity className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-bold text-lg leading-none">LabEase</h1>
            <p className="text-white/50 text-xs mt-0.5">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* User info */}
      <div className={`px-3 py-4 border-t border-white/10 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-white/50 text-xs truncate">{user?.role === 'super_admin' ? 'Super Admin' : 'Lab Admin'}</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={onCloseMobile} />
          <aside className="relative flex flex-col w-64 bg-navy">
            <button
              onClick={onCloseMobile}
              className="absolute top-4 right-4 p-1 text-white/70 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
