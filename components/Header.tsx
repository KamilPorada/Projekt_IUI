import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLong } from '@fortawesome/free-solid-svg-icons'
import heroBig from '../public/img/hero-big.png'
import heroSmall from '../public/img/hero-small.png'

const Header = () => {
	return (
		<>
			<img
				src={heroSmall.src}
				alt='Hero Image Small'
				className='block lg:hidden absolute top-0 left-0 w-full h-full object-cover object-center'
			/>
			<img
				src={heroBig.src}
				alt='Hero Image Big'
				className='hidden lg:block absolute top-0 left-0 w-full h-full object-cover object-center'
			/>
			<div className='w-[180px] lg:w-[350px] absolute top-1/3 left-4 sm:left-14 md:left-36 lg:left-1/4'>
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
			</div>
			<FontAwesomeIcon
				className='absolute bottom-4 left-1/2 p-2 text-secondaryColor text-4xl md:text-5xl lg:text-6xl cursor-pointer'
				icon={faDownLong}
				bounce
			/>
		</>
	)
}

export default Header
