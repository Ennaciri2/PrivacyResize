import { seoPresets } from "../data/seo-presets";
import { getFirebaseAdminDb } from "../lib/firebase/admin";

async function main() {
  const db = getFirebaseAdminDb();

  if (!db) {
    throw new Error("Firebase Admin credentials are missing. Populate FIREBASE_ADMIN_* vars first.");
  }

  const batch = db.batch();

  seoPresets.forEach((preset) => {
    batch.set(db.collection("seoPresets").doc(preset.slug), {
      ...preset,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  await batch.commit();
  console.log(`Seeded ${seoPresets.length} SEO presets into Firestore.`);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
