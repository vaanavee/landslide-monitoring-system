import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const mockHistory = [
  { id: 1, time: '2023-10-24 14:30', rain: 'Yes', moisture: 85, score: 88, prediction: 'CRITICAL' },
  { id: 2, time: '2023-10-24 13:30', rain: 'Yes', moisture: 82, score: 85, prediction: 'HIGH' },
  { id: 3, time: '2023-10-24 12:30', rain: 'Yes', moisture: 78, score: 79, prediction: 'HIGH' },
  { id: 4, time: '2023-10-24 11:30', rain: 'Yes', moisture: 65, score: 65, prediction: 'MEDIUM' },
  { id: 5, time: '2023-10-24 10:30', rain: 'No', moisture: 45, score: 30, prediction: 'LOW' },
  { id: 6, time: '2023-10-24 09:30', rain: 'No', moisture: 42, score: 28, prediction: 'LOW' },
  { id: 7, time: '2023-10-24 08:30', rain: 'No', moisture: 40, score: 25, prediction: 'LOW' },
];

export function History() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const getPredictionColor = (prediction: string) => {
    switch(prediction) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const filteredHistory = mockHistory.filter(row => 
    row.prediction.toLowerCase().includes(searchTerm.toLowerCase()) || 
    row.time.includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Prediction History</h1>
          <p className="text-slate-400">Historical logs of sensor readings and model predictions.</p>
        </div>
      </header>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search history..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg text-sm font-medium text-slate-300">
            <Filter className="h-4 w-4" />
            Filter Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase font-semibold text-slate-400">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Rain Detected</th>
                <th className="px-6 py-4">Soil Moisture</th>
                <th className="px-6 py-4">Risk Score</th>
                <th className="px-6 py-4">AI Prediction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredHistory.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{row.time}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      row.rain === 'Yes' ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : "bg-slate-800 text-slate-400 border-slate-700"
                    )}>
                      {row.rain}
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.moisture}%</td>
                  <td className="px-6 py-4 font-mono">{row.score}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", getPredictionColor(row.prediction))}>
                      {row.prediction}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No history records found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center text-xs text-slate-400">
          <span>Showing {filteredHistory.length} of {mockHistory.length} records</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-800 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-800 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
