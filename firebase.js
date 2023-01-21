// Import the functions you need from the SDKs you need
// const {initializeApp} = require("firebase/app");
// const {getStorage} = require("firebase/storage");
const admin = require("firebase-admin");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const serviceAccount = {
  "type": process.env.FIREBASE_ADMIN_TYPE,
  "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_ADMIN_AUTH_URI,
  "token_uri": process.env.FIREBASE_ADMIN_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_PROVIDER,
  "client_x509_cert_url": process.env.FIREBASE_ADMIN_CLIENT_CERT
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_URL,
})

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECTID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app, process.env.FIREBASE_STORAGE_URL);

const bucket = admin.storage().bucket();

module.exports = {
    // storage,
    bucket,
}