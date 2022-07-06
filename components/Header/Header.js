import Image from 'next/image'
import { useEffect, useState } from 'react'
import Logo from '../../assets/f-logo.png'
import { CgScreen, CgHomeAlt, CgUserAdd, CgSearch, CgUserList, CgGames, CgNotifications, CgList } from 'react-icons/cg'
import useWindowSize from '../../hooks/useWindowSize'
import HeaderLink from './HeaderLink'
import HeaderDropLink from './HeaderDropLink'
import { Auth } from '../../context/AuthContext'

const Header = () => {
	const { user } = Auth()
	const [search, setSearch] = useState('')
	const [inputShow, setInputShow] = useState(false)
	const { width } = useWindowSize()
	useEffect(() => {
		setInputShow(width > 900)
	}, [width])

	return (
		<header className='shadow-lg bg-white'>
			<div className='container mx-auto grid grid-cols-3 items-center justify-between'>
				<div className='flex mx-auto py-2'>
					<Image src={Logo} alt='Facebook Logo' width={40} height={40} />
					<form className='bg-secondary mx-3 flex items-center rounded-full overflow-hidden'>
						<div className='p-3 cursor-pointer' onClick={() => setInputShow((prev) => (width < 900 ? !prev : true))}>
							<CgSearch className='text-secondaryIcon' />
						</div>
						<input type='text' value={search} placeholder='Search' onChange={(e) => setSearch(e.target.value)} className={` text-sm bg-transparent font-openSans py-2 min-w-[250px] outline-none ${inputShow ? 'block' : 'hidden'}`} />
					</form>
				</div>
				<div className='flex mx-auto gap-x-6'>
					<HeaderLink href='/' Icon={CgHomeAlt} />
					<HeaderLink href='/friends/add' Icon={CgUserAdd} />
					<HeaderLink href='/videos' Icon={CgScreen} />
					<HeaderLink href='/groups' Icon={CgUserList} />
					<HeaderLink href='/gaming' Icon={CgGames} />
				</div>
				<div className='flex mx-auto gap-x-4'>
					<HeaderDropLink Icon={CgNotifications} />
					<HeaderDropLink Icon={CgList} />
					<HeaderDropLink user={user} />
				</div>
			</div>
		</header>
	)
}
export default Header
