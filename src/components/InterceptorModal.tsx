'use client';

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';
import { motion } from "framer-motion";
import { Dialog } from '@headlessui/react';

// TODO: Card -> Modal 로 수정. event 관리
const InterceptingModal = ({ children }: { children: React.ReactNode }) => {
    let overlayRef = useRef<HTMLDivElement>(null);
    function handleClose() {
        // onClose && onClose();
    }
    

  return (
    <>
      <Dialog
        static
        open={true}
        onClose={handleClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center "
      >
        <Dialog.Overlay
          ref={overlayRef}
          as={motion.div}
          key="backdrop"
          className="fixed inset-0 z-30 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        {children}
      </Dialog>
    </>
  );
};

export default InterceptingModal;
