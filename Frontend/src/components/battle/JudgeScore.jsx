import React from 'react';

export const JudgeScore = ({ score }) => {
  return (
    <div className="flex items-center gap-1.5 select-none">
      <span className="text-xs font-semibold text-muted uppercase tracking-wider">Judge Score</span>
      <span className="text-sm font-bold text-primary px-2.5 py-0.5 bg-primary/10 rounded-lg border border-primary/10">
        {score.toFixed(1)}
      </span>
    </div>
  );
};
