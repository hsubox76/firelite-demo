/**
 * This app starts a real-time listener to a Firestore document
 * using the full-featured Firestore SDK.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { renderDataOnPage } from "./render";

// Create this file and export your own project config from it.
import { firebaseConfig } from "./firebase-config";

async function main() {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const docRef = doc(firestore, "items/item1");

  onSnapshot(docRef, (docSnap) => {
    renderDataOnPage(docSnap.data().field1);
  });
}

main();
