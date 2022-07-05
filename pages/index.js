import Head from 'next/head'
import { Auth } from '../context/AuthContext'

export default function Home() {
	const { logout, user } = Auth()
	console.log(user)
	return (
		<>
			<Head>
				<title>Facebook</title>
				<meta name='description' content='This facebook will replace yours soon' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='font-openSans'>
				<button onClick={logout}>out!</button>
			</div>
		</>
	)
}
