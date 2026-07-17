import React from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[20px] max-w-md w-full p-6 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-heading">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-heading text-2xl leading-none">
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
