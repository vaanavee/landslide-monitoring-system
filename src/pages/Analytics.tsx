import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Legend
} from 'recharts';

const mockData = [
  { time: '00:00', moisture: 45, rain: 0, risk: 20 },
  { time: '04:00', moisture: 42, rain: 0, risk: 18 },
  { time: '08:00', moisture: 40, rain: 0, risk: 15 },
  { time: '12:00', moisture: 55, rain: 1, risk: 35 },
  { time: '16:00', moisture: 75, rain: 1, risk: 65 },
  { time: '20:00', moisture: 82, rain: 1, risk: 85 },
  { time: '24:00', moisture: 85, rain: 1, risk: 88 },
];

export function Analytics() {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Data Analytics</h1>
          <p className="text-slate-400">Historical trends and multi-sensor correlation.</p>
        </div>
        <div className="flex gap-2">
          {['1h', '6h', '24h', '7d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range 
                  ? 'bg-cyan-500 text-slate-950' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {range === '1h' ? 'Last Hour' : 
               range === '6h' ? 'Last 6 Hours' : 
               range === '24h' ? 'Last 24 Hours' : 'Last 7 Days'}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Risk Score Chart */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Risk Score Trend</h2>
            <p className="text-sm text-slate-400">Combined risk calculation over time</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#ef4444' }}
                />
                <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Soil Moisture Chart */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Soil Moisture</h2>
              <p className="text-sm text-slate-400">Volumetric water content (%)</p>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  />
                  <Line type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rainfall Detection Chart */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Rainfall Activity</h2>
              <p className="text-sm text-slate-400">Rain sensor triggers</p>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} ticks={[0, 1]} tickFormatter={(val) => val === 1 ? 'Yes' : 'No'} />
                  <Tooltip 
                    cursor={{fill: '#1e293b'}}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    formatter={(value) => [value === 1 ? 'Detected' : 'Clear', 'Rain']}
                  />
                  <Bar dataKey="rain" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
