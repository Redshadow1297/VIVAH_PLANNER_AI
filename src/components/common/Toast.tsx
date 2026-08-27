import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useWedding();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#FCF9F2] text-[#2C1810] border-[#D4AF37]/50 shadow-[#D4AF37]/10'
              : toast.type === 'error'
              ? 'bg-rose-50 text-rose-900 border-rose-200 shadow-rose-900/10'
              : 'bg-stone-900 text-stone-100 border-stone-700 shadow-black/20'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}

          <p className="text-sm font-medium flex-1">{toast.message}</p>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-stone-700 transition-colors p-0.5 rounded"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const ConfirmModal: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#D4AF37]/30 text-stone-900">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDestructive ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
            }`}
          >
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#2C1810]">{title}</h3>
        </div>

        <p className="text-sm text-stone-600 mb-6 leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200/60 rounded-xl transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 text-sm font-semibold rounded-xl text-white shadow-md transition-all ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                : 'bg-[#7A1C2E] hover:bg-[#621423] shadow-[#7A1C2E]/20'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export const EmptyState: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ icon, title, description, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-white/70 border border-[#EBE3D5] rounded-2xl shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-[#F4EDE2] text-[#7A1C2E] flex items-center justify-center mb-4 shadow-inner">
        {icon}
      </div>
      <h4 className="font-heading text-base font-bold text-[#2C1810] mb-1">{title}</h4>
      <p className="text-sm text-stone-500 max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#7A1C2E] hover:bg-[#641424] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
