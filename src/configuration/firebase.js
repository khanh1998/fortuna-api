/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import firebase from 'firebase-admin';
import { configuration } from '../../firebase-config.js';

firebase.initializeApp({
  credential: firebase.credential.cert(configuration),
});

// eslint-disable-next-line import/prefer-default-export
export { firebase };
