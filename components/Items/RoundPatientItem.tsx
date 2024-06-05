const RoundPatientItem: React.FC<{
	index: number
	name: string
	surname: string
	pesel: string
	condition: string
}> = props => {
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

	const gender = getGenderFromPesel(props.pesel)
	const birthDate = getBirthDateFromPesel(props.pesel)

	return (
		<div className='flex w-[1137px] h-auto text-sm lg:text-base text-black text-center ring-1 ring-black overflow-x-auto font-thin'>
			<div className='flex flex-row justify-evenly items-center w-full h-full'>
				<div className='flex justify-center items-center w-16 h-16 ring-1 ring-black p-1'>
					<p>{props.index}</p>
				</div>
				<div className='flex justify-center items-center w-36 h-16 ring-1 ring-black p-1'>
					<p>{props.name}</p>
				</div>
				<div className='flex justify-center items-center w-36 h-16 ring-1 ring-black p-1'>
					<p>{props.surname}</p>
				</div>
				<div className='flex justify-center items-center w-36 h-16 ring-1 ring-black p-1'>
					<p>{props.pesel}</p>
				</div>
				<div className='flex justify-center items-center w-36 h-16 ring-1 ring-black p-1'>
					<p>{gender}</p>
				</div>
				<div className='flex justify-center items-center w-36 h-16 ring-1 ring-black p-1'>
					<p>{birthDate}</p>
				</div>
				<div className='flex justify-center items-center w-96 h-16 ring-1 ring-black text-xs p-1'>
					<p>{props.condition}</p>
				</div>
			</div>
		</div>
	)
}

export default RoundPatientItem
