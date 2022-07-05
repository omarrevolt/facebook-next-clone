import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { serverTimestamp, setDoc, doc, getDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { db, auth } from '../firebaseConfig'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({ username: '', email: '', password: '', firstName: '', lastName: '' })
	async function createUser(username, email, password, firstName, lastName) {
		const user = await createUserWithEmailAndPassword(auth, email, password)
		await setDoc(doc(db, 'users', user.user.uid), { username, email, firstName, lastName }, { merge: true })
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				async function init() {
					const data = await getDoc(doc(db, 'users', currentUser.uid))
					setUser(data.data())
				}
				init()
			}
		})
		return () => unsubscribe()
	}, [])
	async function logout() {
		try {
			await signOut(auth)
			console.log('done')
		} catch (error) {
			console.log(error)
		}
	}

	async function logUser(email, password) {
		const user = await signInWithEmailAndPassword(auth, email, password)
	}

	return <AuthContext.Provider value={{ user, createUser, logUser, logout }}>{children}</AuthContext.Provider>
}
export const Auth = () => useContext(AuthContext)
