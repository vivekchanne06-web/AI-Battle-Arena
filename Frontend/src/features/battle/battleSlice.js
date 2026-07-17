import { createSlice } from '@reduxjs/toolkit';
import { runBattle } from './battleThunk';

const initialState = {
  prompt: '',
  solution1: null,
  solution2: null,
  judgeRecommendation: null,
  winner: null,
  loading: false,
  error: null,
};

// Heuristic Judge Details Generator
const generateJudgeDetails = (solution1, solution2, score1, score2) => {
  const winner = score1 > score2 ? 'Mistral' : score2 > score1 ? 'Cohere' : 'Tie';

  const analyze = (text, otherText) => {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const hasCode = text.includes('```') || text.includes('`');
    const hasLists = text.includes('- ') || text.includes('* ') || /\d+\./.test(text);
    const hasHeadings = text.includes('#');

    const strengths = [];
    const weaknesses = [];

    if (wordCount > 120) {
      strengths.push('Provides a highly detailed and comprehensive explanation.');
    } else {
      strengths.push('Delivers a concise, direct, and focused answer.');
    }

    if (hasCode) strengths.push('Includes structured, easy-to-read code snippets.');
    if (hasLists) strengths.push('Organized with clear bullet points/numbered lists.');
    if (hasHeadings) strengths.push('Good readability using a logical heading structure.');

    if (!hasCode && (otherText.includes('```') || otherText.includes('`'))) {
      weaknesses.push('Lacks illustrative code examples compared to the competitor.');
    }
    if (wordCount < 50) weaknesses.push('Slightly too brief; could elaborate more on core details.');
    if (wordCount > 350) weaknesses.push('Somewhat verbose; contains extra sentences that reduce scannability.');
    if (!hasLists && otherText.includes('- ')) {
      weaknesses.push('Uses solid paragraphs, which make it denser to scan than a bulleted response.');
    }

    if (strengths.length === 0) strengths.push('Factual and relevant information.');
    if (weaknesses.length === 0) weaknesses.push('Minor stylistic layout enhancements could be made.');

    return { strengths, weaknesses };
  };

  const m1Analysis = analyze(solution1, solution2);
  const m2Analysis = analyze(solution2, solution1);

  let explanation = '';
  let reason = '';

  if (winner === 'Mistral') {
    explanation = `The AI Judge evaluated both responses. Mistral scored a ${score1.toFixed(1)} out of 10.0, while Cohere scored ${score2.toFixed(1)}.`;
    reason = `Mistral delivered a more structured and helpful response. ${m1Analysis.strengths[0] || 'It offered a comprehensive explanation.'} On the other hand, Cohere fell behind because ${m2Analysis.weaknesses[0] || 'it was slightly less structured.'}`;
  } else if (winner === 'Cohere') {
    explanation = `The AI Judge evaluated both responses. Cohere scored a ${score2.toFixed(1)} out of 10.0, while Mistral scored ${score1.toFixed(1)}.`;
    reason = `Cohere outperformed Mistral in technical clarity. ${m2Analysis.strengths[0] || 'It provided a cleaner output.'} Mistral was less optimal because ${m1Analysis.weaknesses[0] || 'it lacked proper detailing.'}`;
  } else {
    explanation = `The AI Judge evaluated both responses and declared a Tie with equal scores of ${score1.toFixed(1)} out of 10.0.`;
    reason = `Both Mistral and Cohere delivered responses of equivalent depth, accuracy, and formatting, with no significant differences in quality.`;
  }

  return {
    winner,
    explanation,
    reason,
    strengths: winner === 'Mistral' ? m1Analysis.strengths : winner === 'Cohere' ? m2Analysis.strengths : [...new Set([...m1Analysis.strengths, ...m2Analysis.strengths])].slice(0, 3),
    weaknesses: winner === 'Mistral' ? m2Analysis.weaknesses : winner === 'Cohere' ? m1Analysis.weaknesses : [...new Set([...m1Analysis.weaknesses, ...m2Analysis.weaknesses])].slice(0, 2),
  };
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setPrompt(state, action) {
      state.prompt = action.payload;
    },
    resetBattle(state) {
      state.solution1 = null;
      state.solution2 = null;
      state.judgeRecommendation = null;
      state.winner = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runBattle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.solution1 = null;
        state.solution2 = null;
        state.judgeRecommendation = null;
        state.winner = null;
      })
      .addCase(runBattle.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload;
        const messagesData = payload?.messages;

        const solution_1 = messagesData?.solution_1 || '';
        const solution_2 = messagesData?.solution_2 || '';
        const judgeData = messagesData?.judge;

        const score_1 = judgeData?.solution_1_score ?? 0;
        const score_2 = judgeData?.solution_2_score ?? 0;

        state.solution1 = solution_1;
        state.solution2 = solution_2;

        const details = generateJudgeDetails(solution_1, solution_2, score_1, score_2);

        state.winner = details.winner;
        state.judgeRecommendation = {
          solution_1_score: score_1,
          solution_2_score: score_2,
          winner: details.winner,
          explanation: details.explanation,
          reason: details.reason,
          strengths: details.strengths,
          weaknesses: details.weaknesses,
        };
      })
      .addCase(runBattle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred during the battle.';
      });
  },
});

export const { setPrompt, resetBattle } = battleSlice.actions;
export default battleSlice.reducer;
