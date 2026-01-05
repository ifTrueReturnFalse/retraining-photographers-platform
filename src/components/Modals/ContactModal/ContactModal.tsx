import { BaseModal } from "../BaseModal";
import { Photographer } from "@/app/generated/prisma/client";
import styles from "./ContactModal.module.css";
import { BaseButton } from "@/components/Buttons/BaseButton";

export function ContactModal({
  isOpen,
  onClose,
  photographer,
}: {
  isOpen: boolean;
  onClose: () => void;
  photographer: Photographer;
}) {
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
