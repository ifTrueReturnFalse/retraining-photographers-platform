import { BaseModal } from "../BaseModal";
import { Photographer } from "@/app/generated/prisma/client";
import styles from "./ContactModal.module.css";
import { BaseButton } from "@/components/Buttons/BaseButton";
import { ModalProps } from "@/types/definitions";

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

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.contactModal}
    >
      <h1>Contactez-moi {name}</h1>

      <form action="#" className={styles.contactForm}>
        <label htmlFor="name">Prénom</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="familyName">Nom</label>
        <input type="text" name="familyName" id="familyName" />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="message">Votre message</label>
        <textarea name="message" id="message"></textarea>

        <BaseButton buttonText="Envoyer" className={styles.sendButton} />
      </form>
    </BaseModal>
  );
}
