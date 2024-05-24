import { useState } from 'react'
import Button from '../UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

const PatientItem: React.FC<{
	index: number
	firstName: string
	surname: string
	pesel: string
	uuid: string
	handleDelete: (uuid: string) => void
	handleEdit: (uuid: string) => void
}> = ({ index, firstName, surname, pesel, uuid, handleDelete, handleEdit }) => {
	const [showModal, setShowModal] = useState(false)

	const getGenderFromPesel = (pesel: string): string => {
		const genderDigit = parseInt(pesel.charAt(7))
		return genderDigit % 2 === 0 ? 'Kobieta' : 'Mężczyzna'
	}

	const getBirthDateFromPesel = (pesel: string): string => {
		const year = parseInt(pesel.substring(0, 2))
		const month = parseInt(pesel.substring(2, 4))
		const day = parseInt(pesel.substring(4, 6))

		let fullYear
		if (year >= 0 && year <= 19) {
			fullYear = 1900 + year
		} else if (year >= 20 && year <= 99) {
			fullYear = 2000 + year
		} else if (year >= 1800 && year <= 1899) {
			fullYear = 1800 + year
		} else {
			throw new Error('Nieprawidłowy numer PESEL')
		}

		const centuryOffset = Math.floor(month / 20) * 100
		const formattedMonth = (month % 20).toString().padStart(2, '0')
		const formattedDay = day.toString().padStart(2, '0')

		return `${formattedDay}.${formattedMonth}.${fullYear + centuryOffset}`
	}

	const gender = getGenderFromPesel(pesel)
	const birthDate = getBirthDateFromPesel(pesel)

	const handleDeleteClick = () => {
		setShowModal(true)
	}

	const handleConfirmDelete = () => {
		handleDelete(uuid)
		setShowModal(false)
	}

	const handleCancelDelete = () => {
		setShowModal(false)
	}

	const handleEditClick = () => {
		handleEdit(uuid)
	}

	return (
		<div className='flex w-[1137px] h-auto text-sm lg:text-base text-black text-center ring-1 ring-black overflow-x-auto font-thin'>
			<div className='flex flex-row justify-evenly items-center w-full h-full'>
				<div className='flex justify-center items-center w-16 h-10 ring-1 ring-black'>
					<p>{index}</p>
				</div>
				<div className='flex justify-center items-center w-44 h-10 ring-1 ring-black '>
					<p>{firstName}</p>
				</div>
				<div className='flex justify-center items-center w-44 h-10 ring-1 ring-black '>
					<p>{surname}</p>
				</div>
				<div className='flex justify-center items-center w-44 h-10 ring-1 ring-black'>
					<p>{pesel}</p>
				</div>
				<div className='flex justify-center items-center w-44 h-10 ring-1 ring-black'>
					<p>{gender}</p>
				</div>
				<div className='flex justify-center items-center w-44 h-10 ring-1 ring-black'>
					<p>{birthDate}</p>
				</div>
				<div className='flex justify-evenly items-center w-72 h-10 ring-1 ring-black text-xl p-1'>
					<FontAwesomeIcon
						icon={faAddressCard}
						className='text-secondaryColor cursor-pointer hover:scale-110 transition-all'
					/>
					<FontAwesomeIcon
						icon={faPencil}
						className='text-yellow-500 cursor-pointer hover:scale-110 transition-all'
						onClick={handleEditClick}
					/>
					<FontAwesomeIcon
						icon={faTrash}
						className='text-red-500 cursor-pointer hover:scale-110 transition-all'
						onClick={handleDeleteClick}
					/>
				</div>
			</div>
			{showModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white p-8 rounded-lg'>
						<p>{`Czy na pewno chcesz usunąć pacjenta ${firstName} ${surname}?`}</p>
						<div className='flex justify-center gap-2 mt-4  text-white'>
							<Button onClick={handleConfirmDelete} className='sm:text-sm'>
								Usuń
							</Button>
							<Button onClick={handleCancelDelete} className='sm:text-sm'>
								Anuluj
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default PatientItem
