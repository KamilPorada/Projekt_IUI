'use client'
import { useState, useEffect } from 'react'
import Brand from './UI/Brand'
import Button from './UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../app/authConfig'

const TopNavigation = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const { instance } = useMsal()

	const handleLogIn = () => {
		instance.loginRedirect(loginRequest).catch(e => {
			console.log(e)
		})
	}

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY
			const headerHeight = document.getElementById('header')?.offsetHeight || 0

			setIsScrolled(scrollPosition > headerHeight)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<nav
			className={`flex flex-row justify-between md:justify-around items-center fixed top-0 left-0 w-screen h-20 px-2 transition-colors duration-300 z-10 bg-white ${
				isScrolled ? 'bg-white bg-opacity-60' : ''
			}`}>
			<Brand />
			<Button onClick={handleLogIn}>
				Zaloguj się <FontAwesomeIcon icon={faMicrosoft} className='ml-1' />
			</Button>
		</nav>
	)
}

export default TopNavigation
