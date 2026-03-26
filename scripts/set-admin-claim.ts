import { getFirebaseAdminAuth } from "../lib/firebase/admin";

async function main() {
  const identifier = process.argv[2];

  if (!identifier) {
    throw new Error("Usage: pnpm admin:set-claim <uid-or-email>");
  }

  const adminAuth = getFirebaseAdminAuth();

  if (!adminAuth) {
    throw new Error("Firebase Admin credentials are missing. Populate FIREBASE_ADMIN_* vars first.");
  }

  const userRecord = identifier.includes("@")
    ? await adminAuth.getUserByEmail(identifier)
    : await adminAuth.getUser(identifier);

  await adminAuth.setCustomUserClaims(userRecord.uid, {
    ...userRecord.customClaims,
    admin: true,
  });

  console.log(`Applied admin claim to ${userRecord.uid}.`);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
