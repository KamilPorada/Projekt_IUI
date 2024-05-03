'use client'
import Header from '@/components/HomePage/Header'
import AboutUs from '@/components/HomePage/AboutUs'
import KeyFeatures from '@/components/HomePage/KeyFeatures'
import JoinToUs from '@/components/HomePage/JointToUs'
import HeroSection from '@/components/HomePage/HeroSection'
import { useIsAuthenticated } from '@azure/msal-react'

const Home = () => {
	const isAuthenticated = useIsAuthenticated()

	return (
		<div>
			{!isAuthenticated && (
				<div>
					<Header />
					<AboutUs />
					<KeyFeatures />
					<HeroSection />
					<JoinToUs />
				</div>
			)}
		</div>
	)
}

export default Home
