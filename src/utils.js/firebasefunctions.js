import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../Firebase.config";

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

export const saveUser = async (data) => {
  await setDoc(doc(firestore, "userData", `${Date.now()}`), data, {
    merge: true,
  });
};

export const getAllUser = async () => {
  const items = await getDocs(
    query(collection(firestore, "userData"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const getAllItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const savePayment = async (data) => {
  await setDoc(doc(firestore, "paymentDetails", `${Date.now()}`), data, {
    merge: true,
  });
};

export const getAllPayments = async () => {
  const items = await getDocs(
    query(collection(firestore, "paymentDetails"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const saveBike = async (data) => {
  await setDoc(doc(firestore, "bikeDetails", `${Date.now()}`), data, {
    merge: true,
  });
};

export const getAllBike = async () => {
  const items = await getDocs(
    query(collection(firestore, "bikeDetails"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};
