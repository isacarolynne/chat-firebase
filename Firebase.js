import firebase from "firebase"
import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from "react-native-dotenv"

class Firebase {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: apiKey,
        authDomain: authDomain,
        databaseURL: databaseURL,
        projectId: projectId,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId,
        appId: appId,
        measurementId: measurementId,
      })
    }
  }

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      };

      firebase
        .database()
        .ref("messages")
        .push(message);
    });
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  transformCallback = message => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return { _id, createdAt, text, user };
  };

  get = callback => {
    firebase
      .database()
      .ref("messages")
      .on("child_added", snapshot =>
        callback(this.transformCallback(snapshot))
      );
  };

  off() {
    firebase
      .database()
      .ref("messages")
      .off();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  add = contact => {
    firebase.database().ref("contacts").push(contact);
  }
  transformCallbackContacts = contact => {
    return contact;
  }

  getContacts = callback => {
    firebase.database().ref("contacts").on("value", (snapshot) => {
      callback(this.transformCallbackContacts(snapshot.val()))
    })
  }
}

export default new Firebase();
