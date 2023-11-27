"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import { getNewParam } from "../ListingImageGallery";
import type { ListingGalleryImage } from "../utils/types";
import SharedModal from "./SharedModal";
import { Route } from "next";
import ReviewStep from "@/app/(mypage)/review/reg/reviewStep";

export default function ModalReview({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let overlayRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const thisPathname = usePathname();
  const photoId = searchParams?.get("photoId");
  let index = Number(photoId);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);


  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
    {
      isOpen && 
      <Dialog
        static
        open={isOpen}
        onClose={handleClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-filter backdrop-blur-md backdrop-brightness-75"
      >
        <Dialog.Overlay
          ref={overlayRef}
          as={motion.div}
          key="backdrop"
          className="fixed inset-0 z-30 backdrop:blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <div className="w-max-[800px] w-min-[90%] h-auto bg-white py-10 px-20 rounded-lg">
          <ReviewStep />
        </div>
      </Dialog>
    }
      
    </>
  );
}
