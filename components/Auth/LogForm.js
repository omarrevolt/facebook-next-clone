import { useState } from 'react'
import { Auth } from '../../context/AuthContext'
import FormInput from './FormInput'

const LogForm = () => {
	const { createUser, logUser, error } = Auth()
	const [isSignup, setIsSignup] = useState(false)

	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		confirmPassword: '',
		gender: '',
	})
	function handleChange(e) {
		const { name, value } = e.target
		setForm((prev) => ({ ...prev, [name]: value }))
	}
	async function handleSubmit(e) {
		e.preventDefault()
		const { username, email, password, firstName, lastName, confirmPassword, gender } = form

		if (isSignup) {
			// CREATE THE USER
			await createUser(username, email, password, confirmPassword, firstName, lastName, gender)
		} else {
			// LOGIN THE USER
			await logUser(email, password)
		}
	}
	function handleForm(e) {
		setIsSignup((prev) => !prev)
		setForm({
			username: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			gender: '',
			confirmPassword: '',
		})
	}

	return (
		<form className='bg-white rounded flex flex-col items-center w-[500px] mx-auto p-6 gap-y-4 shadow-lg'>
			{error && <div className='text-md text-white p-2 rounded w-full text-center bg-red-500'>{error}</div>}
			{isSignup && (
				<>
					<div className='flex gap-x-2'>
						<FormInput name='firstName' value={form.firstName} onChange={handleChange} placeholder='First Name' />
						<FormInput name='lastName' value={form.lastName} onChange={handleChange} placeholder='Last Name' />
					</div>
					<FormInput name='username' value={form.username} onChange={handleChange} placeholder='Username' />
				</>
			)}
			<FormInput type='email' name='email' value={form.email} onChange={handleChange} placeholder='Email Address' />
			{isSignup && (
				<select className='border outline-mainColor text-lg p-2 rounded w-full font-openSans' value={form.gender} name='gender' onChange={handleChange}>
					{!form.gender && <option value=''>Choose your gender</option>}
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</select>
			)}
			<FormInput type='password' name='password' value={form.password} onChange={handleChange} placeholder='Password' />
			{isSignup && <FormInput type='password' name='confirmPassword' value={form.confirmPassword} onChange={handleChange} placeholder='Confirm Password' />}
			<button className='bg-mainColor rounded w-full text-white p-2 text-xl' type='submit' onClick={handleSubmit}>
				{isSignup ? 'Sign up' : 'Log in'}
			</button>
			<hr className='my-2 w-[50%]' />
			<button type='button' className='bg-green-500 rounded w-fit mx-auto text-white p-2 text-xl' onClick={handleForm}>
				{isSignup ? 'Already have an account' : 'Create a new account'}
			</button>
		</form>
	)
}

export default LogForm
