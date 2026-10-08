import React, { useState } from 'react';
import { Save, Sliders, RefreshCw, Moon, Sun, Beaker, Wifi } from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings() {
  const [demoMode, setDemoMode] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(3000);
  const [criticalThreshold, setCriticalThreshold] = useState(80);
  const [highThreshold, setHighThreshold] = useState(60);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">System Settings</h1>
          <p className="text-slate-400">Configure monitoring parameters and node connections.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white transition-colors rounded-lg font-medium shadow-lg shadow-cyan-500/20">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Node Connectivity */}
        <section className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <Wifi className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-medium text-white">Node Connectivity</h2>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
            <div>
              <p className="font-medium text-slate-200">ESP32 Core Node</p>
              <p className="text-sm text-slate-400">Status: <span className="text-green-400">Connected</span> • IP: 192.168.1.45</p>
            </div>
            <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors">
              Reboot Node
            </button>
          </div>
        </section>

        {/* Global Settings */}
        <section className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <Sliders className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-medium text-white">Application Settings</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="mt-0.5 p-2 bg-purple-500/10 rounded-lg h-9 w-9 flex items-center justify-center">
                  <Beaker className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">Demo Mode</h3>
                  <p className="text-sm text-slate-400">Use simulated data for presentation purposes.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={demoMode} onChange={() => setDemoMode(!demoMode)} />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="mt-0.5 p-2 bg-slate-800 rounded-lg h-9 w-9 flex items-center justify-center">
                  <Moon className="h-5 w-5 text-slate-300" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">Theme Preference</h3>
                  <p className="text-sm text-slate-400">Toggle between light and dark modes.</p>
                </div>
              </div>
              <div className="flex bg-slate-900 rounded-lg border border-slate-800 p-1">
                <button className="px-3 py-1 text-sm bg-slate-800 text-white rounded shadow">Dark</button>
                <button className="px-3 py-1 text-sm text-slate-400 hover:text-white disabled:opacity-50" disabled>Light</button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="mt-0.5 p-2 bg-blue-500/10 rounded-lg h-9 w-9 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">Sensor Refresh Interval</h3>
                  <p className="text-sm text-slate-400">How often telemetry data is polled.</p>
                </div>
              </div>
              <select 
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
              >
                <option value={1000}>1 Second</option>
                <option value={3000}>3 Seconds</option>
                <option value={5000}>5 Seconds</option>
                <option value={10000}>10 Seconds</option>
              </select>
            </div>
          </div>
        </section>

        {/* Threshold Settings */}
        <section className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <Sliders className="h-5 w-5 text-orange-400" />
            <h2 className="text-lg font-medium text-white">Risk Thresholds</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-slate-200">Critical Risk Threshold (%)</label>
                <span className="text-sm text-red-400 font-bold">{criticalThreshold}%</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">Risk score required to trigger critical emergency alerts.</p>
              <input 
                type="range" min="0" max="100" 
                value={criticalThreshold} 
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-slate-200">High Risk Threshold (%)</label>
                <span className="text-sm text-orange-400 font-bold">{highThreshold}%</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">Risk score required to trigger early warning indicators.</p>
              <input 
                type="range" min="0" max="100" 
                value={highThreshold} 
                onChange={(e) => setHighThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
