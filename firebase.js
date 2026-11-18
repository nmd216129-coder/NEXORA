import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

/* =====================================
   NEXORA FIREBASE CONFIGURATION
   Replace these values with your
   Firebase project's web configuration.
===================================== */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/* =====================================
   INITIALIZE FIREBASE
===================================== */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* =====================================
   AUTHENTICATION FUNCTIONS
===================================== */

export async function registerUser(name, email, password) {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(result.user, {
    displayName: name
  });

  await setDoc(doc(db, "users", result.user.uid), {
    uid: result.user.uid,
    name,
    email,
    role: "user",
    createdAt: serverTimestamp()
  });

  return result.user;
}

export async function loginUser(email, password) {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;
}

export async function logoutUser() {
  return await signOut(auth);
}

export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

/* =====================================
   USER PROFILE
===================================== */

export async function getUserProfile(uid) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  return snapshot.exists() ? snapshot.data() : null;
}

export async function updateUserProfile(uid, data) {
  return await updateDoc(doc(db, "users", uid), data);
}

/* =====================================
   EMPLOYEE MANAGEMENT
===================================== */

export async function addEmployee(data) {
  return await addDoc(collection(db, "employees"), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export async function getEmployees() {
  const snapshot = await getDocs(
    collection(db, "employees")
  );

  return snapshot.docs.map(item => ({
    id: item.id,
    ...item.data()
  }));
}

export async function deleteEmployee(id) {
  return await deleteDoc(doc(db, "employees", id));
}

/* =====================================
   CLIENT MANAGEMENT
===================================== */

export async function addClient(data) {
  return await addDoc(collection(db, "clients"), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export async function getClients() {
  const snapshot = await getDocs(
    collection(db, "clients")
  );

  return snapshot.docs.map(item => ({
    id: item.id,
    ...item.data()
  }));
}

export async function deleteClient(id) {
  return await deleteDoc(doc(db, "clients", id));
}

/* =====================================
   REAL-TIME TEAM MESSAGES
===================================== */

export async function sendTeamMessage(data) {
  return await addDoc(collection(db, "messages"), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export function listenToMessages(callback) {
  const messagesQuery = query(
    collection(db, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(messagesQuery, snapshot => {
    const messages = snapshot.docs.map(item => ({
      id: item.id,
      ...item.data()
    }));

    callback(messages);
  });
}

/* =====================================
   MEETING MANAGEMENT
===================================== */

export async function createMeeting(data) {
  return await addDoc(collection(db, "meetings"), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export async function getMeetings() {
  const snapshot = await getDocs(
    collection(db, "meetings")
  );

  return snapshot.docs.map(item => ({
    id: item.id,
    ...item.data()
  }));
}

/* =====================================
   FIREBASE EXPORTS
===================================== */

export {
  app,
  auth,
  db,
  collection,
  serverTimestamp
};
