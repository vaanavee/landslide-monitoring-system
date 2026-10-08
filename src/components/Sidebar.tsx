import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, BarChart2, BrainCircuit, Bell, History, Settings, Mountain } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Activity, label: 'Live Monitoring', path: '/monitoring' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: BrainCircuit, label: 'AI Prediction', path: '/prediction' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: History, label: 'History', path: '/history' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <div className="w-64 h-screen border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400">
          <Mountain className="h-6 w-6" />
          <span className="font-bold text-lg tracking-wide text-white">Landslide<span className="text-cyan-400">Guard</span></span>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-cyan-500/10 text-cyan-400" 
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="glass-panel p-3 rounded-lg flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-200">ESP32 Connected</span>
            <span className="text-[10px] text-slate-500">Demo Mode Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
