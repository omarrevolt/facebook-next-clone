import '../styles/globals.css'
import Auth from '../components/Auth/Auth'
import { AuthContextProvider } from '../context/AuthContext'
import { auth } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import Header from '../components/Header/Header'
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
			<Header />
			<main className='bg-secondary font-openSans'>
				<Component {...pageProps} />
			</main>
		</AuthContextProvider>
	)
}

export default MyApp
