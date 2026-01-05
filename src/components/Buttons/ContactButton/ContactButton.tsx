"use client";

import { Photographer } from "@/app/generated/prisma/client";
import { ContactModal } from "@/components/Modals/ContactModal";
import { useState } from "react";
import { BaseButton } from "../BaseButton";

interface ContactButtonProps {
  photographer: Photographer;
}

export function ContactButton({ photographer }: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButton buttonText="Contactez-moi" onClick={() => setIsOpen(true)} />

      {isOpen && (
        <ContactModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          photographer={photographer}
        />
      )}
    </>
  );
}
