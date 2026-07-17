import React from 'react';
import { Swords } from 'lucide-react';
import { Button } from '../common/Button';
import { useAppSelector } from '../../app/hooks';
import { selectPrompt, selectLoading } from '../../features/battle/battleSelectors';

export const BattleButton = () => {
  const prompt = useAppSelector(selectPrompt);
  const loading = useAppSelector(selectLoading);

  return (
    <Button
      type="submit"
      disabled={loading || !prompt.trim()}
      variant="primary"
      size="sm"
      className="flex items-center gap-1.5 px-5 py-2 cursor-pointer h-10 select-none shadow-none"
    >
      <span className="font-semibold text-xs tracking-wider uppercase">Battle</span>
      <Swords size={13} />
    </Button>
  );
};
