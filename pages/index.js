import Head from 'next/head'
import { Auth } from '../context/AuthContext'

export default function Home() {
	const { logout, user } = Auth()
	return (
		<>
			<Head>
				<title>Facebook</title>
				<meta name='description' content='This facebook will replace yours soon' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				<button onClick={logout}>logout</button>
			</div>
		</>
	)
}
