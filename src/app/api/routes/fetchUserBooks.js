"use client";

import { useAuth } from "@clerk/nextjs";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";

export const FetchUserBooks = async () => {
  const { user } = useAuth();

  if (!user) return [];

  const db = getFirestore();
  const q = query(collection(db, "users", user, id, "books"));
  const querySnapshot = await getDocs(q);

  const books = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return books;
};
