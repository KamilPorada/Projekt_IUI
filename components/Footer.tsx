'use client'

import logoPSK from '../public/img/logo-psk.png'
import footerBackground from '../public/img/footer-background.png'

import Link from 'next/link'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='flex flex-col justify-center items-center'>
			<div className='w-full h-[200px] sm:h-[300px] lg:h-[400px] relative'>
				<img src={footerBackground.src} className='absolute top-0 left-0 w-full h-full' />
				<div className='flex justify-center items-center w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-white p-5 sm:p-10 lg:p-16 ring-1 ring-gray-600 absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10'>
					<img src={logoPSK.src} alt='Logo Politechniki Świętokrzyskiej' />
				</div>
				<div className='absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 w-1/2'>
					<h3 className='text-black text-xs sm:text-sm lg:text-2xl text-center font-thin'>
						Platrofrma <span className='font-normal'>Health Assistant</span> została wykonana przez studentów
						<Link href='https://tu.kielce.pl/' className='hover:font-normal hover:text-mainColor transition font-normal'>
							{' '}
							Politechniki Świętokrzyskiej{' '}
						</Link>{' '}
						w ramach realizacji zajęć z przedmiotu Inteligentne Usługi Informatyczne
					</h3>
				</div>
			</div>
			<div className='flex flex-col justify-center items-center gap-2 w-full bg-secondaryColor border-t border-white py-2'>
				<div className='w-full px-1 flex flex-row justify-between sm:justify-around lg:justify-center lg:gap-16 items-center text-xs sm:text-sm lg:text-md gap-1 text-center'>
					<Link href='https://github.com/CezaryKretkowski'>
						<p className='hover:font-normal hover:text-mainColor transition'>Cezary Kretkowski</p>
					</Link>
					<Link href='https://github.com/LMarcinEl'>
						<p className='hover:text-mainColor transition'>Marcin Lach</p>
					</Link>
					<Link href='https://github.com/KamilPorada'>
						<p className='hover:font-normal hover:text-mainColor transition'>Kamil Porada</p>
					</Link>
					<Link href='https://github.com/KronosGP'>
						<p className='hover:font-normal hover:text-mainColor transition'>Adam Rychlik</p>
					</Link>
				</div>
				<div className='flex flex-row justify-center items-center gap-3 text-xs sm:text-sm lg:text-md'>
					<p>&copy; {currentYear}</p>
					<p>Wszelkie prawa zastrzeżone</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
