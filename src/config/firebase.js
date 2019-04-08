import * as firebase from 'firebase';
import {FirebaseConfig} from './keys';  //'../config/Keys';

firebase.initializeApp(FirebaseConfig);
const databaseRef = firebase.database().ref();

export const todoRef = databaseRef.child("todos");
export const accountRef = databaseRef.child("account");

