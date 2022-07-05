import { validate } from 'email-validator'
import { collection, getDocs, Query, query, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { Auth, AuthContext } from '../context/AuthContext'
import { db } from '../firebaseConfig'
import FormInput from './FormInput'

const LogForm = () => {
	const { createUser, logUser } = Auth()
	const [isSignup, setIsSignup] = useState(false)
	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		confirmPassword: '',
	})
	const [error, setError] = useState('')
	function handleChange(e) {
		const { name, value } = e.target
		setForm((prev) => ({ ...prev, [name]: value }))
	}
	async function handleSubmit(e) {
		e.preventDefault()
		const { username, email, password, firstName, lastName, confirmPassword } = form
		// VALIDATE THE EMAIL
		if (!validate(email)) return setError('Invalid Email')

		if (isSignup) {
			// CHECK FOR INPUTS
			if (!username || !password || !confirmPassword || !firstName || !lastName || !email) return setError('Please fill all inputs')

			// CHECK FOR PASSWORDS MATCH
			if (password !== confirmPassword) return setError("Passwords don't match")

			// CHECK FOR EMAIL EXISTENCE
			const emailValidation = await getDocs(query(collection(db, 'users'), where('email', '==', email)))
			if (emailValidation.docs.length !== 0) return setError('This email is used already')

			// CHECK FOR USERNAME EXISTENCE
			const usernameValidation = await getDocs(query(collection(db, 'users'), where('username', '==', username)))
			if (usernameValidation.docs.length !== 0) return setError('This username is used already')

			// CREATE THE USER
			await createUser(username, email, password, firstName, lastName)
		} else {
			// CHECK FOR INPUTS
			if (!password || !email) return setError('Please fill all inputs')

			// LOGIN THE USER
			await logUser(email, password)
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setError('')
		}, 5000)
	}, [error])

	return (
		<form className='bg-white rounded flex flex-col items-center w-[400px] mx-auto p-6 gap-y-4 shadow-lg'>
			{error && <div className='text-md text-white p-2 rounded w-full text-center bg-red-500'>{error}</div>}
			{isSignup && (
				<>
					<FormInput name='firstName' value={form.firstName} onChange={handleChange} placeholder='First Name' />
					<FormInput name='lastName' value={form.lastName} onChange={handleChange} placeholder='Last Name' />
					<FormInput name='username' value={form.username} onChange={handleChange} placeholder='Username' />
				</>
			)}
			<FormInput type='email' name='email' value={form.email} onChange={handleChange} placeholder='Email Address' />
			<FormInput type='password' name='password' value={form.password} onChange={handleChange} placeholder='Password' />
			{isSignup && <FormInput type='password' name='confirmPassword' value={form.confirmPassword} onChange={handleChange} placeholder='Confirm Password' />}
			<button className='bg-mainColor rounded w-full text-white p-2 text-xl' type='submit' onClick={handleSubmit}>
				{isSignup ? 'Sign up' : 'Log in'}
			</button>
			<hr className='my-2 w-[50%]' />
			<button type='button' className='bg-green-500 rounded w-fit mx-auto text-white p-2 text-xl' onClick={() => setIsSignup((prev) => !prev)}>
				{isSignup ? 'Already have an account' : 'Create a new account'}
			</button>
		</form>
	)
}

export default LogForm
