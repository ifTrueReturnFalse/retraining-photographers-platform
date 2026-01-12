"use client";

import { Photographer } from "@/generated/prisma/client";
import { ContactModal } from "@/components/Modals/ContactModal";
import { useState } from "react";
import { BaseButton } from "../BaseButton";

/**
 * Props for the ContactButton component.
 */
interface ContactButtonProps {
  /** The photographer data required for the contact form context. */
  photographer: Photographer;
}

/**
 * ContactButton component.
 *
 * Renders a button that triggers the display of a contact modal.
 * It manages the open/close state of the modal internally.
 *
 * @param {ContactButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered button and the conditional modal.
 */
export function ContactButton({ photographer }: ContactButtonProps) {
  // State to manage the visibility of the contact modal
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButton
        buttonText="Contactez-moi"
        // Event handler to open the modal
        onClick={() => setIsOpen(true)}
      />

      {/* Conditionally render the ContactModal only when isOpen is true */}
      {isOpen && (
        <ContactModal
          isOpen={isOpen}
          // Callback to close the modal, resetting the state
          onClose={() => setIsOpen(false)}
          photographer={photographer}
        />
      )}
    </>
  );
}
