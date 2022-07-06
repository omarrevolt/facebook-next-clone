import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { db, auth } from '../firebaseConfig'
import { validate } from 'email-validator'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({ username: '', email: '', password: '', firstName: '', lastName: '' })
	const [error, setError] = useState('')
	async function createUser(username, email, password, confirmPassword, firstName, lastName, gender) {
		// CHECK FOR INPUTS
		if (!username || !password || !confirmPassword || !firstName || !lastName || !email || !gender) return setError('Please fill all inputs')

		// VALIDATE THE EMAIL
		if (!validate(email)) return setError('Invalid Email')

		// CHECK FOR PASSWORD LENGTH
		if (password.length < 8) setError('Password cannot be less then 8 characters')

		// CHECK FOR PASSWORDS MATCH
		if (password !== confirmPassword) return setError("Passwords don't match")

		// CHECK FOR EMAIL EXISTENCE
		const emailValidation = await getDocs(query(collection(db, 'users'), where('email', '==', email)))
		if (emailValidation.docs.length !== 0) return setError('This email is used already')

		// CHECK FOR USERNAME EXISTENCE
		const usernameValidation = await getDocs(query(collection(db, 'users'), where('username', '==', username)))
		if (usernameValidation.docs.length !== 0) return setError('This username is used already')

		const user = await createUserWithEmailAndPassword(auth, email, password)
		await setDoc(doc(db, 'users', user.user.uid), { username, email, firstName, lastName, gender, photoUrl: null }, { merge: true })
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

	useEffect(() => {
		setTimeout(() => {
			setError('')
		}, 5000)
	}, [error])
	async function logout() {
		try {
			await signOut(auth)
			console.log('done')
		} catch (error) {
			console.log(error)
		}
	}

	async function logUser(email, password) {
		// CHECK FOR INPUTS
		if (!password || !email) return setError('Please fill all inputs')

		// VALIDATE THE EMAIL
		if (!validate(email)) return setError('Invalid Email')

		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			setError('Invalid Password')
		}
	}

	return <AuthContext.Provider value={{ user, error, createUser, logUser, logout }}>{children}</AuthContext.Provider>
}
export const Auth = () => useContext(AuthContext)
