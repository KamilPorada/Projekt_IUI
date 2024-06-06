'use client'

import logoPSK from '../../public/img/logo-psk.png'
import footerBackground from '../../public/img/footer-background.png'
import Link from 'next/link'

const LogInHomeComponent = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center'>
			<div className='w-full h-[200px] sm:h-[300px] lg:h-[400px] relative'>
				<div className='flex justify-center items-center w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-white p-5 sm:p-10 lg:p-16 ring-1 ring-gray-600 absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10'>
					<img src={logoPSK.src} alt='Logo Politechniki Świętokrzyskiej' />
				</div>
				<div className='absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 w-1/2'>
					<h3 className='text-black text-xs sm:text-sm lg:text-2xl text-center font-thin'>
						Platrofrma <span className='font-normal'>Health Assistant</span> została wykonana przez studentów
						<Link
							href='https://tu.kielce.pl/'
							className='hover:font-normal hover:text-mainColor transition font-normal'>
							{' '}
							Politechniki Świętokrzyskiej{' '}
						</Link>{' '}
						w ramach realizacji zajęć z przedmiotu Inteligentne Usługi Informatyczne
					</h3>
				</div>
			</div>
		</div>
	)
}

export default LogInHomeComponent
