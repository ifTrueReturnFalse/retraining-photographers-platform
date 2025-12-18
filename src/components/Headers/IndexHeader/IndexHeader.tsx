import { Logo } from "@/components/Logo";
import styles from "./IndexHeader.module.css";
import Link from "next/link";

export function IndexHeader() {
  return (
    <header className={styles.container} role="banner">
      <Link href="/" aria-label="Retour à l'accueil">
        <Logo />
      </Link>
      <h1 className={styles.title}>Nos photographes</h1>
    </header>
  );
}
