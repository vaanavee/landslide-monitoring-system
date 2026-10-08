import React, { useState, useEffect } from 'react';
import { CloudRain, Droplets, Activity, MapPin, AlertTriangle, Wifi, Volume2, ShieldCheck, Thermometer } from 'lucide-react';
import { cn } from '../lib/utils';

export function Dashboard() {
  const [soilMoisture, setSoilMoisture] = useState(82);
  const [isRaining, setIsRaining] = useState(true);
  const [riskScore, setRiskScore] = useState(85);
  
  // Calculate risk level
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'CRITICAL', color: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500/50' };
    if (score >= 60) return { level: 'HIGH', color: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-500/50' };
    if (score >= 40) return { level: 'MEDIUM', color: 'text-yellow-400', bg: 'bg-yellow-400', border: 'border-yellow-400/50' };
    return { level: 'LOW', color: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500/50' };
  };

  const getMoistureStatus = (val: number) => {
    if (val >= 80) return 'Saturated';
    if (val >= 60) return 'Wet';
    if (val >= 30) return 'Normal';
    return 'Dry';
  };

  const risk = getRiskLevel(riskScore);
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Overview Dashboard</h1>
          <p className="text-slate-400">Real-time landslide prediction and monitoring system.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
          <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span className="text-sm font-medium text-slate-300">Live Updates Active</span>
        </div>
      </header>

      {/* Warning Banner */}
      {riskScore >= 60 && (
        <div className={cn(
          "flex items-start gap-4 p-4 rounded-xl border bg-opacity-10 mb-6",
          riskScore >= 80 ? "bg-red-500 border-red-500/50 text-red-100" : "bg-orange-500 border-orange-500/50 text-orange-100"
        )}>
          <AlertTriangle className={cn("h-6 w-6 mt-0.5", riskScore >= 80 ? "text-red-400" : "text-orange-400")} />
          <div>
            <h3 className="font-semibold text-lg">⚠️ {risk.level} LANDSLIDE RISK</h3>
            <p className="text-sm opacity-90 mt-1">Heavy rainfall and high soil moisture detected. Monitoring zone requires immediate attention.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Gauge Card */}
        <div className="glass-panel rounded-2xl p-6 col-span-1 md:col-span-1 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <ShieldCheck className={cn("h-6 w-6", risk.color)} />
          </div>
          <h2 className="text-lg font-medium text-slate-300 mb-6 w-full text-center">Current Risk Level</h2>
          
          <div className="relative flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96" cy="96" r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-800"
              />
              {/* Progress Circle */}
              <circle
                cx="96" cy="96" r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={cn("transition-all duration-1000 ease-out", risk.color)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{riskScore}%</span>
              <span className={cn("text-sm font-semibold tracking-wider mt-1", risk.color)}>
                {risk.level}
              </span>
            </div>
          </div>

          <div className="mt-6 w-full bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
            <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Risk Factors</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {isRaining ? 'Active rainfall detected' : 'No recent rainfall'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Soil moisture above threshold ({soilMoisture}%)
              </li>
            </ul>
          </div>
        </div>

        {/* Sensor Data */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Rain Sensor */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <CloudRain className="h-6 w-6 text-cyan-400" />
              </div>
              <span className="text-xs font-medium px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full">
                Just now
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Rain Sensor</p>
              <h3 className="text-2xl font-bold text-white mb-2">
                {isRaining ? 'Rain Detected' : 'No Rain'}
              </h3>
              <div className="flex items-center gap-2 mt-4">
                <div className={cn("w-2 h-2 rounded-full animate-pulse", isRaining ? "bg-cyan-400" : "bg-slate-500")} />
                <span className="text-sm text-slate-300">
                  {isRaining ? 'Precipitation active in zone' : 'Clear skies'}
                </span>
              </div>
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Droplets className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xs font-medium px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full">
                Just now
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Soil Moisture</p>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-3xl font-bold text-white">{soilMoisture}%</h3>
                <span className="text-sm font-medium text-blue-400">{getMoistureStatus(soilMoisture)}</span>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${soilMoisture}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="glass-panel rounded-2xl p-6 sm:col-span-2">
            <h3 className="text-sm font-medium text-slate-400 mb-4">System Node Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-300 mb-1">
                  <Wifi className="h-4 w-4 text-green-400" />
                  <span className="text-xs font-medium">ESP32 Core</span>
                </div>
                <span className="text-sm font-semibold text-white">Online</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-300 mb-1">
                  <Volume2 className="h-4 w-4 text-slate-400" />
                  <span className="text-xs font-medium">Buzzer Alert</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {riskScore >= 80 ? 'Active' : 'Standby'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-300 mb-1">
                  <Thermometer className="h-4 w-4 text-orange-400" />
                  <span className="text-xs font-medium">Node Temp</span>
                </div>
                <span className="text-sm font-semibold text-white">32°C</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-300 mb-1">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-medium">Location</span>
                </div>
                <span className="text-sm font-semibold text-white">Zone Alpha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
