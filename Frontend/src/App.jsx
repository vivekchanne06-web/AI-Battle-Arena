import React from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { PromptInput } from './components/battle/PromptInput';
import { BattleButton } from './components/battle/BattleButton';
import { ResponseCard } from './components/battle/ResponseCard';
import { WinnerCard } from './components/battle/WinnerCard';
import { JudgeSummary } from './components/battle/JudgeSummary';
import { Skeleton } from './components/common/Skeleton';
import { Card } from './components/common/Card';
import { Button } from './components/common/Button';
import { EmptyState } from './components/common/EmptyState';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  selectPrompt,
  selectSolution1,
  selectSolution2,
  selectJudgeRecommendation,
  selectWinner,
  selectLoading,
  selectError,
} from './features/battle/battleSelectors';
import { runBattle } from './features/battle/battleThunk';
import { setPrompt } from './features/battle/battleSlice';

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-auto md:h-[52vh] lg:h-[60vh]">
      {/* Left Card Skeleton */}
      <Card variant="white" className="flex flex-col h-full overflow-hidden border border-border p-4 md:p-5">
        <div className="flex justify-between items-center pb-3 border-b border-border mb-3">
          <Skeleton variant="text" className="w-20 h-4" />
          <Skeleton variant="text" className="w-24 h-6" />
        </div>
        <div className="flex-1 space-y-3 pr-2 overflow-hidden">
          <Skeleton variant="text" className="w-3/4 h-4" />
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="text" className="w-5/6 h-4" />
          <Skeleton variant="rect" className="h-28" />
          <Skeleton variant="text" className="w-2/3 h-4" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-border mt-auto">
          <Skeleton variant="text" className="w-16 h-3" />
          <Skeleton variant="circle" className="w-6 h-6" />
        </div>
      </Card>

      {/* Right Card Skeleton */}
      <Card variant="white" className="flex flex-col h-full overflow-hidden border border-border p-4 md:p-5">
        <div className="flex justify-between items-center pb-3 border-b border-border mb-3">
          <Skeleton variant="text" className="w-24 h-4" />
          <Skeleton variant="text" className="w-20 h-6" />
        </div>
        <div className="flex-1 space-y-3 pr-2 overflow-hidden">
          <Skeleton variant="text" className="w-5/6 h-4" />
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="rect" className="h-28" />
          <Skeleton variant="text" className="w-1/2 h-4" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-border mt-auto">
          <Skeleton variant="text" className="w-16 h-3" />
          <Skeleton variant="circle" className="w-6 h-6" />
        </div>
      </Card>
    </div>

    {/* Winner Banner Skeleton */}
    <div className="flex justify-between items-center bg-[#F8F9FA] border border-border rounded-xl px-4 py-2.5">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="w-5 h-5" />
        <Skeleton variant="text" className="w-32 h-4" />
      </div>
      <Skeleton variant="text" className="w-48 h-4" />
    </div>
  </div>
);

const App = () => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector(selectPrompt);
  const solution1 = useAppSelector(selectSolution1);
  const solution2 = useAppSelector(selectSolution2);
  const judgeRecommendation = useAppSelector(selectJudgeRecommendation);
  const winner = useAppSelector(selectWinner);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const handleRetry = () => {
    if (prompt.trim()) {
      dispatch(runBattle(prompt.trim()));
    }
  };

  const handleBattleSubmit = (event) => {
    event.preventDefault();

    if (prompt.trim() && !loading) {
      dispatch(runBattle(prompt.trim()));
    }
  };

  const handleSelectPrompt = (promptText) => {
    dispatch(setPrompt(promptText));
  };

  const hasResults = solution1 !== null && solution2 !== null && judgeRecommendation !== null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-4 md:py-6 space-y-4 md:space-y-5">
        {/* Header Section */}
        <header className="text-center space-y-0.5 select-none">
          <h1 className="text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
            AI Battle Arena
          </h1>
          <p className="text-xs text-muted max-w-xl mx-auto">
            Compare responses from multiple AI models using an AI Judge.
          </p>
        </header>

        {/* Prompt Input Section (Compact 56px height) */}
        <section className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleBattleSubmit} className="flex items-center gap-3 bg-surface border border-border rounded-full p-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 shadow-2xs h-14">
            <PromptInput />
            <span className="text-xs font-semibold text-muted select-none whitespace-nowrap pr-1">
              {prompt.length} / 2000
            </span>
            <BattleButton />
          </form>
        </section>

        {/* Main Content Stage */}
        <section className="space-y-4">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <LoadingSkeleton />
              </motion.div>
            )}

            {error && !loading && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="max-w-xl mx-auto"
              >
                <Card variant="white" className="border-red-200 border bg-red-50/10 p-6 text-center space-y-3">
                  <div className="flex justify-center text-red-500">
                    <AlertCircle size={36} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-heading">Battle Evaluation Failed</h3>
                    <p className="text-xs text-body max-w-md mx-auto leading-relaxed">{error}</p>
                  </div>
                  <div className="pt-1">
                    <Button
                      onClick={handleRetry}
                      variant="primary"
                      size="sm"
                      className="flex items-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>Retry Battle</span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {hasResults && !loading && !error && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* 2-Column Battle Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-auto md:h-[50vh] lg:h-[60vh]">
                  <ResponseCard
                    modelName="Mistral"
                    score={judgeRecommendation.solution_1_score}
                    content={solution1}
                    isWinner={winner === 'Mistral'}
                  />
                  <ResponseCard
                    modelName="Cohere"
                    score={judgeRecommendation.solution_2_score}
                    content={solution2}
                    isWinner={winner === 'Cohere'}
                  />
                </div>

                {/* Winner compact banner */}
                <WinnerCard
                  winnerModel={winner}
                  score1={judgeRecommendation.solution_1_score}
                  score2={judgeRecommendation.solution_2_score}
                  model1="Mistral"
                  model2="Cohere"
                />

                {/* Detailed Judge Recommendation Summary (expandable) */}
                <JudgeSummary recommendation={judgeRecommendation} />
              </motion.div>
            )}

            {!hasResults && !loading && !error && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <EmptyState onSelectPrompt={handleSelectPrompt} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default App;
