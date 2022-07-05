import '../styles/globals.css'
import Auth from '../components/Auth'
import { AuthContextProvider } from '../context/AuthContext'
import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(auth)
	if (loading) return 'loading...'
	if (!user)
		return (
			<AuthContextProvider>
				<Auth />
			</AuthContextProvider>
		)

	return (
		<AuthContextProvider>
			<Component {...pageProps} />
		</AuthContextProvider>
	)
}

export default MyApp
