import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons'
const Brand = () => {
	return (
		<div className='flex flex-row justify-center items-center'>
			<div className='w-14 h-14  p-2 flex justify-center items-center blue-gradient rounded-md'>
				<FontAwesomeIcon icon={faHandHoldingMedical} className='text-white text-3xl' />
			</div>
            <h1 className='text-black ml-3 uppercase font-semibold lg:text-xl'>Health Assistant</h1>
		</div>
	)
}

export default Brand
