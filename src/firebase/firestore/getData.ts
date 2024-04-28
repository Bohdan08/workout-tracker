import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";
import { database, usersCollection } from "../config";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getAllCollections } from "@/src/app/lib/actions/getAllWorkouts/getAllWorkouts";

export default async function getData(id: string) {
  let result = null;
  let error = null;
  let errorMessage = "";
  console.log(id, "GET_DATA");
  try {
    // const querySnapshot = await getDocs(collection(database, "users"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    let data = await getAllCollections();
    console.log(data, "datadata");
    // let parsedData = JSON.parse(JSON.stringify(data));

    // console.log(parsedData[0], "PARSEDPARSED");
    // parsedData[0].then((res: any) => {
    //   console.log(res, "REES");
    // });

    // console.log(data, "datadata");
    // console.log(JSON.parse(JSON.stringify(data)));
    // // console.log(data[0], "datadatadata");
    // console.log(JSON.stringify(data), "datadatadatadata");

    // console.log(JSON.parse(collections), "collections");

    // JSON.parse(collections).map(async (c: any) => {
    //   await c.get();
    // });

    // result.then((parsedResult) =>
    //   console.log(parsedResult, "PAARSED")
    // );
    // console.log(await getAllCollections(), "getAllCollectionsgetAllCollections");
    // const docRef = doc(
    //   database,
    //   "users",
    //   id,
    //   "workouts",
    //   "pY8FgcjJrMXKeIO1mSB1ysTLoRl1/workouts/e8959f27-1284-4b80-a508-7d7a109c8ec4"
    // );

    // await getDoc(docRef).then(async (document) => {
    //   // console.log(document.data(), "DATA");
    // });
    // const docRef = doc(database, usersCollection, id);
    // console.log(docRef, "docRef");
    // const customCollectionGroup = collectionGroup;
    // const subColRef = collectionGroup(database, "users", id, "workouts");
    // console.log(subColRef, "subColRef");

    // const qSnap = getDocs(subColRef) as any;
    // console.log(qSnap.docs, "qSnapdocsqSnapdocs");
    // console.log(qSnap.docs.map((d: any) => ({ id: d.id, ...d.data() })));

    // const sfRef = database.collection("cities").doc("SF");

    // const collections = await docRef.listCollections();
    // console.log(collections, "collections");
    // docRef.listCollections()
    // firestore()
    //   .collection("reservations")
    //   .doc(tripUid)
    //   .listCollections()
    //   .then((subCollections) => {
    //     subCollections.forEach((subCollection) => {
    //       subCollection.get().then((array) => {
    //         array.docs.forEach((doc) => {
    //           console.log(doc.data());
    //         });
    //       });
    //     });
    //   });

    // console.log(docRef, "docRef");
    // await getDoc(docRef).then(async (document) => {
    //   console.log("Parent Document ID: ", document.id);

    //   // console.log(docRef.firestore, "FIRESTORE");
    //   // let subCollectionDocs = docRef.firestore;
    //   // .doc(doc.id)
    //   // .collection("subCollection")
    //   // .get();

    //   // let subCollectionDocs = await docRef.doc(doc.id).collection("subCollection").get()
    //   // const subCollectionRef = doc(database, "workouts", document.id);
    //   // getDoc(subCollectionRef).then((subDoc) => {
    //   //   console.log(subDoc, "subDoc");
    //   // });
    // });

    // let subCollectionDocs = await docRef.doc(doc.id).collection("subCollection").get()
  } catch (apiError) {
    console.log(apiError, "API_ERROR");
    error = true;
    errorMessage = parseFirebaseErorrMessage((apiError as Error).message);
  }

  return { result, error, errorMessage };
}
