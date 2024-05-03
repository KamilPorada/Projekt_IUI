import image from '../../public/img/doctors.svg'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../app/authConfig'

const JoinToUs = () => {
	const { instance } = useMsal()

	const handleLogIn = () => {
		instance.loginRedirect(loginRequest).catch(e => {
			console.log(e)
		})
	}

	return (
		<div className='relative bg-white w-full pb-16'>
			<div className='container flex flex-col justify-center items-center'>
				<h2 className='text-black mt-20 lg:mt-40 text-lg uppercase text-center font-bold sm:text-xl  md:text-2xl lg:text-3xl'>
					Dołącz do naszej społeczności!
				</h2>
				<p className='text-black my-7 font-thin text-xs text-center sm:text-sm lg:w-[700px]'>
					Dołącz do naszej dynamicznej społeczności użytkowników Health Assistant, gdzie troska o zdrowie staje się
					łatwiejsza niż kiedykolwiek wcześniej! Wystarczy, że zalogujesz się poprzez swoje konto Microsoft!
				</p>
				<Button className='my-6' onClick={handleLogIn}>
					Zaloguj się poprzez konto Microsoft <FontAwesomeIcon className='ml-2' icon={faMicrosoft} />
				</Button>
				<img src={image.src} alt='Hero Image Small' className='lg:w-2/3 h-full object-cover' />
			</div>
		</div>
	)
}

export default JoinToUs
