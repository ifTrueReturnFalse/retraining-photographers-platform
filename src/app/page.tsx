import { getAllPhotographers } from "@/lib/prisma-db";
import { IndexHeader } from "@/components/Headers/IndexHeader";

export default async function Home() {
  const photographers = await getAllPhotographers();
  console.log(JSON.stringify(photographers));

  return (
    <div>
      <IndexHeader />
      <pre>{JSON.stringify(photographers, null, 2)}</pre>
    </div>
  );
}
