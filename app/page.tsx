import { getAllPhotographers } from "@/lib/prisma-db";

export default async function Home() {
  const photographers = await getAllPhotographers();
  console.log(JSON.stringify(photographers));

  return (
    <div>
      <h1>Photographes</h1>
      <pre>{JSON.stringify(photographers, null, 2)}</pre>
    </div>
  );
}
