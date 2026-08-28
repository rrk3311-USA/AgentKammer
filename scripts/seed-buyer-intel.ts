import { seedRaphaelExample } from "../server/lib/buyer-intel/seed";

async function main() {
  const result = await seedRaphaelExample();
  console.log("Seeded Raphael Example", result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
