import { BaseModal } from "../BaseModal";
import { Photographer } from "@/generated/prisma/client";
import styles from "./ContactModal.module.css";
import { BaseButton } from "@/components/Buttons/BaseButton";
import { ModalProps } from "@/types/definitions";
import { FormEvent } from "react";

/**
 * Props for the ContactModal component.
 */
interface ContactModalProps extends ModalProps {
  /** The photographer object containing details (like name) to display in the modal. */
  photographer: Photographer;
}

/**
 * A modal component that displays a contact form for a specific photographer.
 *
 * @param props - The component props.
 * @param props.isOpen - Whether the modal is currently open.
 * @param props.onClose - Function to call when the modal should close.
 * @param props.photographer - The photographer to contact.
 * @returns The rendered contact modal.
 */
export function ContactModal({
  isOpen,
  onClose,
  photographer,
}: ContactModalProps) {
  const { name } = photographer;

  /**
   * Handles the form submission.
   * Prevents the default browser behavior and logs the form data to the console.
   *
   * @param event - The form event.
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = document.querySelector("form");
    if (!form) return;
    const formData = new FormData(form);
    console.log(
      `${formData.get("name")} ${formData.get("family-name")} ${formData.get(
        "email"
      )} ${formData.get("message")}`
    );
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.contactModal}
      aria-labelledby="photographer-name"
    >
      <h1 id="photographer-name">
        Contactez-moi <br />
        {name}
      </h1>

      <form
        action="#"
        className={styles.contactForm}
        onSubmit={handleSubmit}
        name="contactForm"
        id="contactForm"
      >
        <label htmlFor="name" id="name-label">
          Prénom
        </label>
        <input type="text" name="name" id="name" aria-labelledby="name-label" />

        <label htmlFor="family-name" id="family-name-label">
          Nom
        </label>
        <input
          type="text"
          name="family-name"
          id="family-name"
          aria-labelledby="family-name-label"
        />

        <label htmlFor="email" id="email-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          aria-labelledby="email-label"
        />

        <label htmlFor="message" id="message-label">Votre message</label>
        <textarea name="message" id="message" aria-labelledby="message-label"></textarea>

        <BaseButton buttonText="Envoyer" className={styles.sendButton} aria-label="Send" />
      </form>
    </BaseModal>
  );
}
