import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { JudgeScore } from './JudgeScore';
import { MarkdownViewer } from './MarkdownViewer';
import { CopyButton } from './CopyButton';

export const ResponseCard = ({ modelName, score, content, isWinner }) => {
  const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;

  return (
    <Card
      variant="white"
      className={`flex flex-col h-full overflow-hidden p-4 md:p-5 ${
        isWinner ? 'border-2 border-primary/40 shadow-sm' : 'border border-border'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex justify-between items-center pb-3 border-b border-border mb-3 select-none">
        <div className="flex items-center gap-2">
          <Badge variant={isWinner ? 'orange' : 'neutral'}>{modelName}</Badge>
          {isWinner && (
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              🏆 Winner
            </span>
          )}
        </div>
        <JudgeScore score={score} />
      </div>

      {/* Markdown Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-3">
        <MarkdownViewer content={content} />
      </div>

      {/* Bottom Footer Row */}
      <div className="flex justify-between items-center pt-3 border-t border-border mt-auto text-xs text-muted select-none">
        <span>{wordCount} words</span>
        <CopyButton text={content} />
      </div>
    </Card>
  );
};
