import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const MarkdownViewer = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none text-[#374151] leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-[#F8F9FA] text-primary text-xs font-mono font-medium border border-border"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="relative group my-4 rounded-xl overflow-hidden border border-border">
                <div className="flex justify-between items-center px-4 py-2 bg-[#F8F9FA] border-b border-border text-xs text-muted">
                  <span className="font-mono uppercase">{match[1]}</span>
                </div>
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.85rem' }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4 border border-border rounded-xl">
                <table className="min-w-full divide-y divide-border text-sm">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-[#F8F9FA]">{children}</thead>;
          },
          th({ children }) {
            return <th className="px-4 py-2 text-left font-semibold text-heading border-b border-border">{children}</th>;
          },
          td({ children }) {
            return <td className="px-4 py-2 text-left text-body border-b border-border">{children}</td>;
          },
          p({ children }) {
            return <p className="mb-4 last:mb-0">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
