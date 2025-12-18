import { getAllPhotographers } from "@/lib/prisma-db";
import { IndexHeader } from "@/components/Headers/IndexHeader";
import { IndexProfileCard } from "@/components/Profiles/IndexProfile";
import styles from "./Home.module.css";

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <>
      <IndexHeader />
      <main className={styles.container}>
        {photographers.map((photographer) => (
          <IndexProfileCard key={photographer.id} photographer={photographer} />
        ))}
      </main>
    </>
  );
}
