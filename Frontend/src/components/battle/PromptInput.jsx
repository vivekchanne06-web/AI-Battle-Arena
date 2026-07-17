import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPrompt } from '../../features/battle/battleSlice';
import { selectPrompt, selectLoading } from '../../features/battle/battleSelectors';

export const PromptInput = () => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector(selectPrompt);
  const loading = useAppSelector(selectLoading);
  const limit = 2000;

  const handleChange = (e) => {
    if (e.target.value.length <= limit) {
      dispatch(setPrompt(e.target.value));
    }
  };

  return (
    <input
      type="text"
      value={prompt}
      onChange={handleChange}
      disabled={loading}
      placeholder="Ask anything..."
      maxLength={limit}
      className="flex-1 bg-transparent border-none outline-none px-4 font-sans text-sm md:text-base text-heading placeholder:text-muted disabled:opacity-60 h-full w-full focus:ring-0"
    />
  );
};
