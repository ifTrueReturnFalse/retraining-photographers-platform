"use client";

import { ReactNode, useRef, useEffect } from "react";
import styles from "./BaseModal.module.css";

/**
 * Props for the BaseModal component.
 */
interface BaseModalProps {
  /** The content to be displayed inside the modal. */
  children: ReactNode;
  /** Controls whether the modal is currently open or closed. */
  isOpen: boolean;
  /** Callback function triggered when the close button is clicked. */
  onClose: () => void;
  /** Optional color for the close icon (SVG fill). Defaults to "#000000". */
  closeColor?: string;
  /** Optional additional CSS classes for the dialog element. */
  className?: string;
}

/**
 * BaseModal is a reusable modal component built on top of the native HTML <dialog> element.
 *
 * It handles the opening and closing of the dialog based on the `isOpen` prop
 * and provides a standard close button.
 *
 * @param props - The properties for the modal.
 * @returns A dialog element containing the children and a close button.
 */
export function BaseModal({
  children,
  isOpen,
  onClose,
  closeColor = "#000000",
  className,
}: BaseModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Synchronize the `isOpen` prop with the native <dialog> API.
    if (isOpen) {
      // showModal() opens the dialog as a modal (on the top layer with a backdrop), preventing interaction with the rest of the page.
      dialogRef.current?.showModal();
    } else {
      // close() hides the dialog.
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog className={`${styles.modal} ${className}`} ref={dialogRef}>
      {/* Close button positioned inside the dialog */}
      <button className={styles.closeButton} onClick={() => onClose()}>
        <svg
          viewBox="0 -0.5 21 21"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill={closeColor}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <title>close</title>
            <defs> </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-419.000000, -240.000000)"
                fill={closeColor}
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <polygon
                    id="close-[#1511]"
                    points="375.0183 90 384 98.554 382.48065 100 373.5 91.446 364.5183 100 363 98.554 371.98065 90 363 81.446 364.5183 80 373.5 88.554 382.48065 80 384 81.446"
                  ></polygon>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>

      {children}
    </dialog>
  );
}
