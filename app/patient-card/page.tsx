'use client'

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import RoundItem from '@/components/Items/RoundItem'
import { useRouter } from 'next/navigation'
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser'
import { msalConfig } from '../authConfig'

interface RoundDataProps {
	date: string
	time: string
	condition: string
}

interface PatientData {
	uuid: string
	firstName: string
	surname: string
	pesel: string
	gender: string
	birthDate: string
	roundData: RoundDataProps[]
}

interface PatientRecord {
	uuid: string
	patient: {
		uuid: string
		firstName: string
		lastName: string
		pesel: string
	}
	patientStatus: string
	audioFile: string | null
	roundDate: string
	roundTime: string
}

const msalInstance = new PublicClientApplication(msalConfig)

const PatientCard: React.FC = () => {
	const [user, setUser] = useState<AccountInfo | null>(null)
	const [patientData, setPatientData] = useState<PatientData | null>(null)
	const [age, setAge] = useState<number | null>(null)
	const [records, setRecords] = useState<PatientRecord[]>()
	const router = useRouter()

	const handleComeBack = () => {
		router.push('/list-of-patients')
	}

	const fetchData = async (uuid: string) => {
		try {
			const responseToken = await msalInstance.acquireTokenSilent({
				scopes: ['User.Read'],
				account: user as AccountInfo,
			})

			const token = responseToken.idToken

			const response = await fetch(`http://localhost:8080/records/patient/${uuid}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			if (data.status === 'ok') {
				setRecords(data.RecordList)
			}
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error)
		}
	}

	useEffect(() => {
		const initializeMsal = async () => {
			try {
				await msalInstance.initialize()
				const accounts = msalInstance.getAllAccounts()
				if (accounts.length > 0) {
					setUser(accounts[0])
				}
			} catch (error) {
				console.error('Błąd podczas inicjalizacji MSAL:', error)
			}
		}

		initializeMsal()
	}, [])

	useEffect(() => {
		const storedPatientData = localStorage.getItem('patientData')
		if (storedPatientData) {
			const parsedPatientData = JSON.parse(storedPatientData) as PatientData
			setPatientData(parsedPatientData)

			const birthYear = parseInt(parsedPatientData.birthDate.slice(0, 4), 10)
			const currentYear = new Date().getFullYear()
			const calculatedAge = currentYear - birthYear
			setAge(calculatedAge)

			if (user) {
				fetchData(parsedPatientData.uuid)
			}
		}
	}, [user])

	return (
		<div className='container py-20 text-black flex justify-center items-center'>
			{patientData ? (
				<div className='bg-white p-8 md:p-12 rounded-lg shadow-md w-full lg:w-1/2 relative'>
					<FontAwesomeIcon
						icon={faRotateLeft}
						className='absolute top-3 left-3 cursor-pointer font-bold text-blue-600 text-xl transition-all hover:scale-110'
						onClick={handleComeBack}
					/>
					<div className='flex flex-col justify-between items-start mb-4'>
						<h2 className='text-2xl font-bold text-black'>
							{patientData.firstName} {patientData.surname}
						</h2>
						<p className='text-lg'>PESEL: {patientData.pesel}</p>
						<p className='text-lg'>Data urodzenia: {patientData.birthDate}</p>
						<p className='text-lg'>Wiek: {age}</p>
						<div className='text-lg'>
							{patientData.gender === 'Mężczyzna' ? (
								<FontAwesomeIcon icon={faMale} className='text-blue-500 mr-2' />
							) : (
								<FontAwesomeIcon icon={faFemale} className='text-pink-500 mr-2' />
							)}
							{patientData.gender}
						</div>
					</div>
					<div className='flex flex-col gap-3 justify-between mt-4'>
						<p className='font-bold'>Karta pacjenta</p>
						{records?.map((recordItem, index) => (
							<RoundItem key={index} date={recordItem.roundDate} time={recordItem.roundTime} condition={recordItem.patientStatus} />
						))}
					</div>
				</div>
			) : (
				<p>Ładowanie danych...</p>
			)}
		</div>
	)
}

export default PatientCard
