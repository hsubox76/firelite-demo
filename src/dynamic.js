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

  const {
    getFirestore: getFirestoreFull,
    onSnapshot,
    doc: docFull,
  } = await import(
    /* webpackChunkName: "firebase-firestore-dynamic" */
    "firebase/firestore"
  );
  const firestoreFull = getFirestoreFull(app);
  const docRefFull = docFull(firestoreFull, "items/item1");
  onSnapshot(docRefFull, (docSnap) => {
    renderDataOnPage(docSnap.data().field1);
  });
}

main();