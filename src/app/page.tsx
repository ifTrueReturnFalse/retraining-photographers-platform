import { getAllPhotographers } from "@/lib/prisma-db";
import { IndexHeader } from "@/components/Headers/IndexHeader";
import { IndexProfileCard } from "@/components/Profiles/IndexProfile";
import styles from "./Home.module.css";

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <>
      <IndexHeader />
      <main>
        <ul className={styles.container} aria-label="Photographes disponibles">
          {photographers.map((photographer) => (
            <li key={photographer.id}>
              <IndexProfileCard photographer={photographer} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
