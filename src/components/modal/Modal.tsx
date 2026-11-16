'use client';
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import { Icon } from '@iconify/react';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  callback: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal: FC<ModalProps> = ({ children, callback }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md"
      onClick={callback}
    >
      <div className="relative size-full flex items-center justify-center">
        <div
          className="relative h-full max-h-[90vh] flex flex-col justify-center h-min"
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
      <button
        className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-gray-400 cursor-pointer"
        onClick={callback}
      >
        <Icon icon="jam:close" />
      </button>
    </div>,
    document.body,
  );
};

export default Modal;
