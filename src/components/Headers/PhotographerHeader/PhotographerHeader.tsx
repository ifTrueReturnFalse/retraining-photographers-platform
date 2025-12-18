import { Logo } from "@/components/Logo";
import styles from "./PhotographerHeader.module.css";
import Link from "next/link";

export function PhotographerHeader() {
  return (
    <header role="banner" className={styles.container}>
      <Link href="/" aria-label="Fisheye Home Page">
        <Logo />
      </Link>
    </header>
  );
}
