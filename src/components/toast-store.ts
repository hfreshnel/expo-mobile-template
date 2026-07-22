import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'info';

const DEFAULT_DURATION = 3000;

type ToastStore = {
  message: string;
  variant: ToastVariant;
  visible: boolean;
  show: (message: string, variant?: ToastVariant, duration?: number) => void;
  hide: () => void;
};

let hideTimeout: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastStore>((set) => ({
  message: '',
  variant: 'info',
  visible: false,
  show: (message, variant = 'info', duration = DEFAULT_DURATION) => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    set({ message, variant, visible: true });
    hideTimeout = setTimeout(() => {
      set({ visible: false });
    }, duration);
  },
  hide: () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    set({ visible: false });
  },
}));
