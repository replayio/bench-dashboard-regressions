"use client";

import { IconButton } from "@/components/IconButton";
import useModalDismissSignal from "@/hooks/useModalDismissSignal";
import { MouseEvent, PropsWithChildren, ReactNode, useRef } from "react";

export function ModalDialog({
  children,
  onDismiss,
  title,
}: PropsWithChildren & {
  onDismiss: () => void;
  title: ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useModalDismissSignal(modalRef, onDismiss);

  return (
    <div className="backdrop-blur overflow-y-auto cursor-default fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50">
      <div
        className="w-96 max-h-full rounded-lg shadow bg-slate-800 text-white flex flex-col gap-4 p-4 pt-2 relative"
        onClick={stopPropagation}
        ref={modalRef}
      >
        <div className="text-xl font-bold">{title}</div>
        <IconButton
          className="absolute top-3 right-3"
          iconType="close"
          onClick={onDismiss}
        />
        {children}
      </div>
    </div>
  );
}

function stopPropagation(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}
