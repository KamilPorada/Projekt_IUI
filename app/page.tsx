import Header from '@/components/HomePage/Header'
import AboutUs from '@/components/HomePage/AboutUs'
import KeyFeatures from '@/components/HomePage/KeyFeatures'
import JoinToUs from '@/components/HomePage/JointToUs'
import HeroSection from '@/components/HomePage/HeroSection'

const Home = () => {
	return (
		<div>
			<Header />
			<AboutUs />
			<KeyFeatures/>
			<HeroSection/>
			<JoinToUs/>
		</div>
	)
}

export default Home
