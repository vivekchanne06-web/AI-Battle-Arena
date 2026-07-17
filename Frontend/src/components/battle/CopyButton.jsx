import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-full border border-border bg-white text-muted hover:text-heading hover:bg-surface hover:border-gray-300 transition-all duration-200 flex items-center justify-center cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? <Check size={16} className="text-[#10B981]" /> : <Copy size={16} />}
    </button>
  );
};
