import React from 'react';
import { Bell, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { cn } from '../lib/utils';

const mockAlerts = [
  {
    id: 1,
    time: 'Today, 14:32',
    type: 'HIGH RISK',
    severity: 'critical',
    sensorValues: 'Rain: YES | Moisture: 85%',
    message: 'Heavy rainfall detected with soil moisture above 80% threshold.',
  },
  {
    id: 2,
    time: 'Today, 12:15',
    type: 'MEDIUM RISK',
    severity: 'warning',
    sensorValues: 'Rain: YES | Moisture: 65%',
    message: 'Soil moisture increasing rapidly due to sustained rainfall.',
  },
  {
    id: 3,
    time: 'Yesterday, 09:00',
    type: 'SYSTEM NORMAL',
    severity: 'info',
    sensorValues: 'Rain: NO | Moisture: 42%',
    message: 'Environmental conditions are currently stable. Risk levels returning to baseline.',
  },
  {
    id: 4,
    time: 'Yesterday, 06:30',
    type: 'SENSOR CALIBRATION',
    severity: 'info',
    sensorValues: 'System Node: ESP32-ALPHA',
    message: 'Routine automatic calibration completed successfully.',
  },
];

export function Alerts() {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical': return { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      case 'warning': return { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      default: return { icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Alert Center</h1>
          <p className="text-slate-400">System notifications, warnings, and automated advisories.</p>
        </div>
      </header>

      <div className="space-y-4">
        {mockAlerts.map((alert) => {
          const styles = getSeverityStyles(alert.severity);
          const Icon = styles.icon;

          return (
            <div key={alert.id} className={cn("glass-panel rounded-xl p-5 border transition-all hover:bg-slate-900/80", styles.border)}>
              <div className="flex gap-4">
                <div className={cn("p-3 rounded-full flex-shrink-0 h-12 w-12 flex items-center justify-center", styles.bg)}>
                  <Icon className={cn("h-6 w-6", styles.color)} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={cn("font-bold text-sm tracking-wide", styles.color)}>
                      {alert.type}
                    </h3>
                    <span className="text-xs font-medium text-slate-500 bg-slate-950 px-2 py-1 rounded-md">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">
                    {alert.message}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs font-mono text-slate-400">
                      {alert.sensorValues}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
