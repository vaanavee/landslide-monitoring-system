import React, { useState } from 'react';
import { BrainCircuit, SlidersHorizontal, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

export function AIPrediction() {
  const [simSoil, setSimSoil] = useState(85);
  const [simRain, setSimRain] = useState(true);

  // Simulate Random Forest Prediction Output
  const predictionScore = Math.floor(simSoil * 0.75 + (simRain ? 25 : 0));
  const confidence = simSoil > 90 && simRain ? 94 : simSoil < 30 && !simRain ? 98 : 87;

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: 'HIGH RISK', color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500/50' };
    if (score >= 60) return { label: 'ELEVATED RISK', color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/50' };
    if (score >= 40) return { label: 'MODERATE RISK', color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/50' };
    return { label: 'LOW RISK', color: 'text-green-500', bg: 'bg-green-500/20', border: 'border-green-500/50' };
  };

  const risk = getRiskLevel(predictionScore);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">AI Prediction Engine</h1>
          <p className="text-slate-400">Random Forest Inference Model for landslide forecasting.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400">
          <Cpu className="h-4 w-4" />
          <span className="text-sm font-medium">Demo Mode Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simulation Controls */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <SlidersHorizontal className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-medium text-white">Simulation Inputs</h2>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-slate-300">Soil Moisture Level</label>
                <span className="text-lg font-bold text-blue-400">{simSoil}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={simSoil}
                onChange={(e) => setSimSoil(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>0% (Dry)</span>
                <span>100% (Saturated)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-slate-300">Rainfall Condition</label>
                <span className={cn("text-sm font-bold", simRain ? "text-cyan-400" : "text-slate-400")}>
                  {simRain ? 'Active Rain' : 'No Rain'}
                </span>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSimRain(false)}
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-medium transition-all border",
                    !simRain ? "bg-slate-800 border-slate-600 text-white" : "bg-slate-950 border-slate-800 text-slate-400"
                  )}
                >
                  Clear / Dry
                </button>
                <button 
                  onClick={() => setSimRain(true)}
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-medium transition-all border",
                    simRain ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-slate-950 border-slate-800 text-slate-400"
                  )}
                >
                  Raining
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Output */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <BrainCircuit className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-medium text-white">Model Output</h2>
          </div>

          <div className="flex flex-col items-center justify-center py-8">
            <div className={cn("px-6 py-2 rounded-full border mb-6", risk.bg, risk.border)}>
              <span className={cn("text-lg font-bold tracking-widest", risk.color)}>{risk.label}</span>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-sm mb-8">
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-1">Calculated Score</p>
                <p className="text-4xl font-bold text-white">{predictionScore}<span className="text-xl text-slate-500">/100</span></p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-1">Model Confidence</p>
                <p className="text-4xl font-bold text-purple-400">{confidence}%</p>
              </div>
            </div>

            <div className="w-full bg-slate-950/80 rounded-xl p-5 border border-slate-800">
              <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" /> Inference Explanation
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {predictionScore >= 80 
                  ? "The model detected a critical combination of active rainfall and severely saturated soil conditions. The probability of slope failure is exceptionally high based on historical training data." 
                  : predictionScore >= 60
                  ? "The model detected elevated soil moisture coupled with environmental factors that increase landslide risk. Continuous monitoring is recommended."
                  : "Current environmental inputs do not strongly correlate with typical landslide precursor conditions in the training set."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
