/**
 * This is the code for the first page in a multi-page site.
 * See split-2.js for the second page.
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore as getFirestoreLite,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import {renderDataOnPage} from './render';

// Create this file and export your own project config from it.
import { firebaseConfig } from "./firebase-config";

async function main() {
  const app = initializeApp(firebaseConfig);
  const firestoreLite = getFirestoreLite(app);
  const docRef = doc(firestoreLite, "items/item1");

  const docSnapLite = await getDoc(docRef);
  renderDataOnPage(docSnapLite.data().field1);
  const linkEl = document
    .createElement("a");
  linkEl.innerHTML = 'go to a more detailed page';
  linkEl.href = '/split-2.html';
  document.body.appendChild(linkEl);
}

main();