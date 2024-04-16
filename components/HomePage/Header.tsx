import heroBig from '../../public/img/hero-big.jpg'
import heroSmall from '../../public/img/hero-small.jpg'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLong } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
	return (
		<header className='w-screen h-screen p-4'>
			<img
				src={heroSmall.src}
				alt='Hero Image Small'
				className='block lg:hidden absolute top-0 left-0 w-full h-full object-cover object-center'
			/>
			<img
				src={heroBig.src}
				alt='Hero Image Big'
				className='hidden lg:block absolute top-0 left-0 w-full h-full object-cover object-top'
			/>
			<div className='w-[250px] lg:w-[350px] absolute top-1/3 left-4 sm:left-14 md:left-36 lg:left-1/5'>
				<h2 className='text-black uppercase font-bold md:text-lg lg:text-3xl xl:text-4xl mb-5 relative'>
					<span className='absolute h-full w-1 bg-mainColor left-0 top-0 -ml-2'></span>
					Health Assistant
				</h2>

				<p className='text-gray-800 text-sm md:text-md lg:text-lg'>
					Zdrowie w zasięgu kliknięcia!
					<br />
					To narzędzie oparte na sztucznej inteligencji, które zostało zaprojektowane w celu udzielania wsparcia
					zdrowotnego i medycznego użytkownikom!
				</p>
				<a href='#aboutus'>
					<Button className='mx-auto mt-7 bg-mainColor'>
						Dowiedz się więcej
						<FontAwesomeIcon icon={faDownLong} className='ml-4' />
					</Button>
				</a>
			</div>
		</header>
	)
}

export default Header
