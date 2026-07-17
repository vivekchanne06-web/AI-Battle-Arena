import React, { useState } from 'react';
import { Card } from '../common/Card';
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const JudgeSummary = ({ recommendation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { explanation, strengths = [], weaknesses = [], reason } = recommendation;

  return (
    <Card variant="white" className="border border-border p-3.5 space-y-0.5 shadow-none transition-all duration-200">
      {/* Clickable Header for Expand/Collapse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-sans select-none cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="text-primary" size={16} />
          <h3 className="text-xs font-bold text-heading">Judge Recommendation</h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-muted">
          <span>{isOpen ? 'Hide Details' : 'Show Details'}</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {/* Expandable Body */}
      {isOpen && (
        <div className="pt-3.5 border-t border-border mt-3 space-y-3.5">
          {/* Explanation */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1 select-none">
              Evaluation Overview
            </h4>
            <p className="text-body text-xs font-normal leading-relaxed">{explanation}</p>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1 select-none">
                <CheckCircle2 size={12} /> Key Strengths
              </h4>
              {strengths.length > 0 ? (
                <ul className="list-none space-y-1">
                  {strengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-body flex items-start gap-1.5">
                      <span className="text-[#10B981] font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted">No notable strengths identified.</p>
              )}
            </div>

            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1 select-none">
                <XCircle size={12} /> Areas for Improvement
              </h4>
              {weaknesses.length > 0 ? (
                <ul className="list-none space-y-1">
                  {weaknesses.map((weak, idx) => (
                    <li key={idx} className="text-xs text-body flex items-start gap-1.5">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted">No major weaknesses identified.</p>
              )}
            </div>
          </div>

          {/* Win Reason */}
          {reason && (
            <div className="bg-surface p-3 rounded-xl border border-border">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-heading mb-1 select-none">
                Decision Rationale
              </h4>
              <p className="text-xs text-body leading-relaxed">{reason}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
