export const selectBattleState = (state) => state.battle;

export const selectPrompt = (state) => state.battle.prompt;
export const selectSolution1 = (state) => state.battle.solution1;
export const selectSolution2 = (state) => state.battle.solution2;
export const selectJudgeRecommendation = (state) => state.battle.judgeRecommendation;
export const selectWinner = (state) => state.battle.winner;
export const selectLoading = (state) => state.battle.loading;
export const selectError = (state) => state.battle.error;
