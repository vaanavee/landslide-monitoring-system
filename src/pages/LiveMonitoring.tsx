import React, { useState, useEffect } from 'react';
import { Radio, CloudRain, Droplets, MapPin, Wifi, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export function LiveMonitoring() {
  const [data, setData] = useState({
    soilMoisture: 78,
    isRaining: true,
    riskScore: 75,
    lastUpdate: new Date().toLocaleTimeString(),
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const moistureChange = Math.floor(Math.random() * 5) - 2;
        const newMoisture = Math.max(0, Math.min(100, prev.soilMoisture + moistureChange));
        const newRisk = Math.min(100, Math.floor(newMoisture * 0.7 + (prev.isRaining ? 30 : 0)));
        
        return {
          ...prev,
          soilMoisture: newMoisture,
          riskScore: newRisk,
          lastUpdate: new Date().toLocaleTimeString(),
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'CRITICAL';
    if (score >= 60) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  };

  const riskLevel = getRiskLevel(data.riskScore);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Live Monitoring</h1>
          <p className="text-slate-400">Real-time telemetry from remote sensor nodes.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          <Wifi className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-medium">ESP32 Connected</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Telemetry Stream */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <Radio className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-medium text-white">Live Telemetry Stream</h2>
              <span className="ml-auto text-sm text-slate-400">Last reading: {data.lastUpdate}</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 flex flex-col items-center justify-center">
                <CloudRain className={cn("h-8 w-8 mb-3", data.isRaining ? "text-cyan-400" : "text-slate-500")} />
                <span className="text-sm text-slate-400">Rain Sensor</span>
                <span className="text-lg font-bold text-white mt-1">{data.isRaining ? 'DETECTED' : 'CLEAR'}</span>
              </div>
              
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 flex flex-col items-center justify-center">
                <Droplets className="h-8 w-8 mb-3 text-blue-400" />
                <span className="text-sm text-slate-400">Soil Moisture</span>
                <span className="text-lg font-bold text-white mt-1">{data.soilMoisture}%</span>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 flex flex-col items-center justify-center">
                <Zap className="h-8 w-8 mb-3 text-yellow-400" />
                <span className="text-sm text-slate-400">Risk Score</span>
                <span className="text-lg font-bold text-white mt-1">{data.riskScore}</span>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 flex flex-col items-center justify-center">
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold mb-3 border",
                  riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                  riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                  riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                  'bg-green-500/20 text-green-400 border-green-500/30'
                )}>
                  {riskLevel}
                </div>
                <span className="text-sm text-slate-400">Status</span>
                <span className="text-sm font-bold text-white mt-1 text-center">MONITORING</span>
              </div>
            </div>
          </div>
          
          {/* Action Panel */}
          {data.riskScore >= 60 && (
            <div className="glass-panel rounded-2xl p-6 border-orange-500/30">
              <h3 className="text-lg font-semibold text-orange-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Recommended Actions
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                  <div className="h-6 w-6 rounded bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <p>Avoid the monitored slope area immediately.</p>
                </li>
                <li className="flex items-start gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                  <div className="h-6 w-6 rounded bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <p>Move to a safer location if local authorities issue official warnings.</p>
                </li>
                <li className="flex items-start gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                  <div className="h-6 w-6 rounded bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <p>Inform responsible authorities about the localized sensor alert.</p>
                </li>
              </ul>
              <p className="text-xs text-slate-500 mt-4 italic">Note: This is an early-warning prototype. Follow official emergency broadcast systems for evacuation orders.</p>
            </div>
          )}
        </div>

        {/* Location Map Placeholder */}
        <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full min-h-[400px]">
          <div className="p-4 border-b border-slate-800 bg-slate-900/80">
            <h3 className="font-medium text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-400" /> Monitoring Zone
            </h3>
            <p className="text-xs text-slate-400 mt-1">Node Alpha • Western Ghats Region</p>
          </div>
          <div className="flex-1 bg-slate-800 relative w-full h-full">
            {/* Map styling background */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
            
            {/* Topography lines simulation */}
            <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
              <path d="M0,50 Q100,10 200,80 T400,30" stroke="white" fill="none" strokeWidth="2"/>
              <path d="M0,100 Q150,50 250,120 T400,80" stroke="white" fill="none" strokeWidth="2"/>
              <path d="M0,150 Q120,90 220,160 T400,130" stroke="white" fill="none" strokeWidth="2"/>
            </svg>
            
            {/* Sensor Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative h-4 w-4 bg-cyan-400 rounded-full border-2 border-white shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
              </div>
              <div className="mt-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 shadow-xl backdrop-blur-sm text-center">
                <p className="text-xs font-bold text-white">ESP32-NODE-1</p>
                <p className="text-[10px] text-cyan-400">{data.soilMoisture}% Moisture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { AlertTriangle } from 'lucide-react';
