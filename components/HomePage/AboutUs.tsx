import SectionTitle from '../UI/SectionTitle'
import doctorWithLaptop from '../../public/img/doctor-and-laptop.jpg'

const AboutUs = () => {
	return (
		<div className='container my-20 lg:my-36' id='aboutus'>
			<SectionTitle title='O nas' />
			<div className='flex flex-col md:flex-row justify-center items-center mt-8 lg:mt-16 font-thin text-sm text-black'>
                <div>
				<p className='mb-2'>
					Zanurz się w erze innowacji w opiece zdrowotnej dzięki <span className='font-normal'>Health Assistant</span> -
					aplikacji, która rewolucjonizuje sposób, w jaki lekarze i pacjenci komunikują się i zarządzają opieką
					zdrowotną.
				</p>
				<p className='mb-2'>
					Dzięki wykorzystaniu najnowocześniejszych usług informatycznych, takich jak Health Bot i Speech-to-Text w
					chmurze Microsoft Azure, <span className='font-normal'>Health Assistant</span> umożliwia lekarzom nagrywanie
					e-rozmów z pacjentami w sposób prosty i efektywny.
				</p>
				<p className='mb-2'>
					Ale to nie wszystko! Nasza aplikacja nie tylko pomaga w dokumentowaniu wizyt, ale także zapewnia dostęp do
					porad medycznych w oparciu o zgromadzone dane. Dzięki integracji z Health Bot,{' '}
					<span className='font-normal'>Health Assistant</span> dostarcza lekarzom wskazówki i sugestie dotyczące stanu
					zdrowia pacjenta.
				</p>
				<p>
					<span className='font-normal'>Health Assistant</span> to nie tylko narzędzie, to rewolucja w opiece
					zdrowotnej, która łączy potencjał technologii z empatią i profesjonalizmem lekarzy.
				</p>
                </div>
                <img src={doctorWithLaptop.src} alt="Lekarz korzystający z laptopa" className='shadow-xl rounded-md mt-5 md:w-2/5 md:ml-5'/>
			</div>
		</div>
	)
}

export default AboutUs
