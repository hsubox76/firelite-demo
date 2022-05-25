/**
 * This is the code for the first page in a multi-page site.
 * See split-1.js for the second page.
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore as getFirestoreFull,
  doc as docFull,
  onSnapshot,
} from "firebase/firestore";
import {renderDataOnPage} from './render';

// Create this file and export your own project config from it.
import { firebaseConfig } from "./firebase-config";

async function main() {
  const app = initializeApp(firebaseConfig);
  const firestoreFull = getFirestoreFull(app);
  const docRefFull = docFull(firestoreFull, "items/item1");
  onSnapshot(docRefFull, (docSnap) => {
    renderDataOnPage(docSnap.data().field1);
  });
}

main();