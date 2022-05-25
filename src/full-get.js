/**
 * This app performs a one time `get()` operation using the
 * full-featured Firestore SDK.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { renderDataOnPage } from "./render";

// Create this file and export your own project config from it.
import { firebaseConfig } from "./firebase-config";

async function main() {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const docRef = doc(firestore, "items/item1");

  const docSnap = await getDoc(docRef);

  renderDataOnPage(docSnap.data().field1);
}

main();
