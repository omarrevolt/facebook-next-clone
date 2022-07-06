import Image from 'next/image'
import { CgUser } from 'react-icons/cg'
const HeaderDropLink = ({ Icon = '', user = {} }) => {
	if (Icon) return <div className='p-2 cursor-pointer rounded-full bg-secondary text-2xl transition hover:text-mainColor'>{Icon && <Icon />}</div>

	const { gender, photoUrl } = user
	if (photoUrl) return <Image className='rounded-full' src={photoUrl} alt='profile' width={50} height={50} />

	return (
		<div className='p-2 cursor-pointer rounded-full bg-secondary text-2xl transition hover:text-mainColor'>
			<CgUser />
		</div>
	)
}

export default HeaderDropLink
