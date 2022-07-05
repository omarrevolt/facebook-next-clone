import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
	apiKey: 'AIzaSyC2yDVTray0GIyYsR3q11M-8P6ou9QASZ4',
	authDomain: 'facebook-next-clone-74b96.firebaseapp.com',
	projectId: 'facebook-next-clone-74b96',
	storageBucket: 'facebook-next-clone-74b96.appspot.com',
	messagingSenderId: '43022805568',
	appId: '1:43022805568:web:a4b855445d04287f24cda5',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
