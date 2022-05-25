/**
 * This is identical to dynamic.js except for one additional
 * optimization: it dynamically imports from an intermediary
 * file (selected-firestore-exports.js) which statically imports
 * the 3 named exports we want from Firestore.
 * 
 * This is helpful because dynamic imports don't automatically
 * tree-shake named exports, so we "pre tree shake" them by
 * statically importing only the ones we want in a different
 * file, then dynamically importing that file.
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore as getFirestoreLite,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { renderDataOnPage } from "./render";

// Create this file and export your own project config from it.
import { firebaseConfig } from "./firebase-config";

async function main() {
  const app = initializeApp(firebaseConfig);
  const firestoreLite = getFirestoreLite(app);
  const docRef = doc(firestoreLite, "items/item1");

  const docSnapLite = await getDoc(docRef);
  renderDataOnPage(docSnapLite.data().field1);

  const {
    getFirestore: getFirestoreFull,
    onSnapshot,
    doc: docFull,
  } = await import(
    /* webpackChunkName: "firebase-firestore-dynamic" */
    "./selected-firestore-exports"
  );
  const firestoreFull = getFirestoreFull(app);
  const docRefFull = docFull(firestoreFull, "items/item1");
  onSnapshot(docRefFull, (docSnap) => {
    renderDataOnPage(docSnap.data().field1);
  });
}

main();
