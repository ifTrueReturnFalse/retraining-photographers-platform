import { Logo } from "@/components/Logo";
import styles from './IndexHeader.module.css'

export function IndexHeader() {
  return <header className={styles.container}>
    <Logo />
    <h1 className={styles.title}>Nos photographes</h1>
  </header>;
}
