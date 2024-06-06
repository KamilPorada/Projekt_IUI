'use client'

import { useState, useEffect, FormEvent } from 'react'
import EditPatientForm from '../../components/Forms/EditPatientForm'
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser'
import { msalConfig } from '../authConfig'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const msalInstance = new PublicClientApplication(msalConfig)

function EditPatientPage() {
	const [user, setUser] = useState<AccountInfo | null>(null)
	const [userId, setUserId] = useState<string | null>(null)
	const [patientData, setPatientData] = useState({
		firstName: '',
		lastName: '',
		pesel: '',
	})
	const [submitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()

	const editPatient = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		if (!patientData.firstName || !patientData.lastName || !patientData.pesel) {
			setError('Wypełnij wszystkie pola formularza!')
			setIsSubmitting(false)
			return
		}

		if (!/^\d{11}$/.test(patientData.pesel)) {
			setError('PESEL musi składać się dokładnie z 11 cyfr.')
			setIsSubmitting(false)
			return
		}

		const editedPatientUUID = localStorage.getItem('editedPatientUUID')
		try {
			const responseToken = await msalInstance.acquireTokenSilent({
				scopes: ['User.Read'],
				account: user as AccountInfo,
			})

			const token = responseToken.idToken

			const response = await fetch(`http://localhost:8080/patients/update/${editedPatientUUID}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify(patientData),
			})

			if (response.ok) {
				toast.success('Pomyślnie zaktualizowano dane pacjenta!', {
					position: 'top-center',
				})
				router.push('/list-of-patients')
			} else {
				throw new Error('Błąd podczas aktualizowania danych pacjenta')
			}
		} catch (error) {
			console.error('Błąd podczas aktualizowania danych pacjenta:', error)
			toast.error('Błąd podczas aktualizowania danych pacjenta', {
				position: 'top-center',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await editPatient(e)
		} catch (error) {
			console.error('Błąd podczas dodawania pacjenta:', error)
		}
	}

	useEffect(() => {
		const initializeMsal = async () => {
			try {
				await msalInstance.initialize()
				const accounts = msalInstance.getAllAccounts()
				if (accounts.length > 0) {
					setUser(accounts[0])
					setUserId(accounts[0].homeAccountId.split('.').pop() || null)
				}
			} catch (error) {
				console.error('Błąd podczas inicjalizacji MSAL:', error)
			}
		}

		initializeMsal()
	}, [])

	useEffect(() => {
		const fetchPatientData = async () => {
			const editedPatientUUID = localStorage.getItem('editedPatientUUID')
			try {
				const responseToken = await msalInstance.acquireTokenSilent({
					scopes: ['User.Read'],
					account: user as AccountInfo,
				})

				const token = responseToken.idToken

				const response = await fetch(`http://localhost:8080/patients/${editedPatientUUID}`, {
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				})
				if (!response.ok) {
					throw new Error('Failed to fetch patient data')
				}
				const data = await response.json()
				if (data.patientList && data.patientList.length > 0) {
					const patient = data.patientList[0]
					setPatientData({
						...patientData,
						firstName: patient.firstName,
						lastName: patient.lastName,
						pesel: patient.pesel,
					})
				} else {
					throw new Error('No patient data found')
				}
			} catch (error) {
				console.error('Error fetching patient data:', error)
				toast.error('Błąd podczas pobierania danych pacjenta', { position: 'top-center' })
			}
		}

		if (user) {
			fetchPatientData()
		}
	}, [user])

	return (
		<section className='container py-20'>
			<EditPatientForm
				patientData={patientData}
				setPatientData={setPatientData}
				submitting={submitting}
				handleSubmit={handleFormSubmit}
				error={error}
			/>
		</section>
	)
}

export default EditPatientPage
