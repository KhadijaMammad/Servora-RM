import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BG */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal box */}
      <div className="relative bg-white rounded-[10px] w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-slate-100 rounded-full transition"
          >
            ✕
          </button>
        </div>
        
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};