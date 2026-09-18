import { seedCurationSample } from "../server/lib/curation/seed";

async function main() {
  const result = await seedCurationSample(true);
  console.log("Seeded Curation IQ sample batch", result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
