import Head from 'next/head'
import LogForm from './LogForm'

const login = () => {
	return (
		<div className='bg-[#F0F2F5] h-screen font-openSans flex justify-center items-center'>
			<Head>
				<title>Login Into Facebook</title>
			</Head>
			<div className='container mx-auto grid lg:grid-cols-2'>
				<div className='flex flex-col justify-center text-center md:text-left my-4'>
					<h1 className='text-7xl mb-4 font-bold text-mainColor'>facebook</h1>
					<p className='text-xl md:text-3xl'>Facebook helps you connect and share with the people in your life.</p>
				</div>
				<div>
					<LogForm />
				</div>
			</div>
		</div>
	)
}

export default login
