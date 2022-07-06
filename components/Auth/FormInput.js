const FormInput = ({ type, name, value, onChange, placeholder, className }) => {
	return <input type={type || 'text'} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`border outline-mainColor text-lg p-2 rounded w-full ${className}`} />
}

export default FormInput
