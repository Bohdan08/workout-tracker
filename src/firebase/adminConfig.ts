import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  const { privateKey } = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY || ""
  );

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    }),
  });
}

export { firebaseAdmin };
