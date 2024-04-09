import SectionTitle from '../UI/SectionTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faHospitalUser,
	faHeartPulse,
	faComments,
	faRobot,
	faMobileScreen,
	faShieldHalved,
} from '@fortawesome/free-solid-svg-icons'

const KeyFeatures = () => {
	return (
		<div className='container my-28'>
			<SectionTitle title='Kluczowe cechy platformy' />
			<div className='flex flex-row flex-wrap justify-center items-center mt-10 gap-5 md:gap-10'>
				<div className='flex flex-col justify-evenly items-center w-72 h-72 p-5 bg-white shadow-lg border-gray-300 border-[1px] text-black text-center transition hover:scale-105'>
					<div className='flex justify-center items-center w-14 h-14 rounded-full bg-secondaryColor'>
						<FontAwesomeIcon icon={faHospitalUser} className='text-3xl text-white' />
					</div>
					<h3>Gromadzenie bazy pacjentów</h3>
					<p className='text-sm font-thin'>
						System skrupulatnie gromadzi informacje na temat pacjentów w jednym miejscu.
					</p>
				</div>
				<div className='flex flex-col justify-evenly items-center w-72 h-72 p-5 bg-white shadow-lg border-gray-300 border-[1px] text-black text-center transition hover:scale-105'>
					<div className='flex justify-center items-center w-14 h-14 rounded-full bg-mainColor'>
						<FontAwesomeIcon icon={faHeartPulse} className='text-3xl text-white' />
					</div>
					<h3>Zapisywanie parametrów zdrowotnych</h3>
					<p className='text-sm font-thin'>
						Rejestrowanie i monitorowanie kluczowych parametrów zdrowotnych pacjentów w czasie rzeczywistym.
					</p>
				</div>
				<div className='flex flex-col justify-evenly items-center w-72 h-72 p-5 bg-white shadow-lg border-gray-300 border-[1px] text-black text-center transition hover:scale-105'>
					<div className='flex justify-center items-center w-14 h-14 rounded-full bg-secondaryColor'>
						<FontAwesomeIcon icon={faComments} className='text-3xl text-white' />
					</div>
					<h3>Przetwarzanie mowy na tekst</h3>
					<p className='text-sm font-thin'>
						Automatyczna konwersja diagnoz oraz opisów stanów chorobowych nagrywanych przez lekarzy na tekst.
					</p>
				</div>
				<div className='flex flex-col justify-evenly items-center w-72 h-72 p-5 bg-white shadow-lg border-gray-300 border-[1px] text-black text-center transition hover:scale-105'>
					<div className='flex justify-center items-center w-14 h-14 rounded-full bg-mainColor'>
						<FontAwesomeIcon icon={faRobot} className='text-3xl text-white' />
					</div>
					<h3>Porady HealthBota</h3>
					<p className='text-sm font-thin'>
						Indywidualne porady zdrowotne oparte na danych medycznych i wskazówkach bota.
					</p>
				</div>
				<div className='flex flex-col justify-evenly items-center w-72 h-72 p-5 bg-white shadow-lg border-gray-300 border-[1px] text-black text-center transition hover:scale-105'>
					<div className='flex justify-center items-center w-14 h-14 rounded-full bg-secondaryColor'>
						<FontAwesomeIcon icon={faMobileScreen} className='text-3xl text-white' />
					</div>
					<h3>Dostępność na każdym urządzeniu</h3>
					<p className='text-sm font-thin'>
						Możliwość korzystania z aplikacji na różnych urządzeniach, zapewniająca elastyczność użytkowania.
					</p>
				</div>
				<div className='flex flex-col justify-evenly items-center w-72 h-72 p-5 bg-white shadow-lg border-gray-300 border-[1px] text-black text-center transition hover:scale-105'>
					<div className='flex justify-center items-center w-14 h-14 rounded-full bg-mainColor'>
						<FontAwesomeIcon icon={faShieldHalved} className='text-3xl text-white' />
					</div>
					<h3>Bezpieczeńwo danych</h3>
					<p className='text-sm font-thin'>
						Zapewnienie ochrony danych medycznych przed nieautoryzowanym dostępem i utratą.
					</p>
				</div>
			</div>
		</div>
	)
}

export default KeyFeatures
