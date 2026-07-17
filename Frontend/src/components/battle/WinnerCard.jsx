import React from 'react';

export const WinnerCard = ({ winnerModel, score1, score2, model1, model2 }) => {
  const isTie = winnerModel === 'Tie';
  const scoreDiff = Math.abs(score1 - score2).toFixed(1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-primary/[0.03] border border-primary/15 rounded-xl px-4 py-2.5 text-primary select-none text-xs md:text-sm gap-2">
      <div className="flex items-center gap-2">
        <span role="img" aria-label="trophy">🏆</span>
        <span className="font-bold">{isTie ? 'Tie Game:' : 'Winner:'}</span>
        <span className="font-extrabold text-heading">
          {isTie ? 'Both Models Tied' : winnerModel}
        </span>
      </div>

      <div className="flex items-center gap-4 text-muted font-medium">
        <span>
          {model1} <strong className="text-heading font-extrabold">{score1.toFixed(1)}</strong>
        </span>
        <span>vs</span>
        <span>
          {model2} <strong className="text-heading font-extrabold">{score2.toFixed(1)}</strong>
        </span>
        {!isTie && (
          <span className="bg-white border border-primary/10 px-2 py-0.5 rounded-lg text-primary text-xs font-extrabold shadow-2xs">
            +{scoreDiff} margin
          </span>
        )}
      </div>
    </div>
  );
};
