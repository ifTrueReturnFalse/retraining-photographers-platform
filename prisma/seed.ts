import prisma from "@/lib/db";
import photographersData from "@/data/photographer.json";
import mediasData from "@/data/media.json";

async function main() {
  await prisma.photographer.createMany({
    data: photographersData,
  });

  await prisma.media.createMany({
    data: mediasData,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
