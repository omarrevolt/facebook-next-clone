import Link from 'next/link'
import { useRouter } from 'next/router'
const HeaderLink = ({ href, Icon }) => {
	const router = useRouter()
	return (
		<Link href={href}>
			<a className={`h-[1fr] block text-4xl ${router.pathname === href ? 'text-mainColor' : 'text-secondaryIcon'} transition hover:text-mainColor`}>
				<Icon />
			</a>
		</Link>
	)
}

export default HeaderLink
