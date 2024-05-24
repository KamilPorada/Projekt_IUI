'use client'

import { useState, useEffect, FormEvent } from 'react'
import NewPatientForm from '../../components/Forms/NewPatientForm'
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser'
import { msalConfig } from '../authConfig'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function NewPatientPage() {
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
	const msalInstance = new PublicClientApplication(msalConfig)

	const addPatient = async (e: FormEvent<HTMLFormElement>) => {
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

		try {
			const response = await fetch('http://localhost:8080/patients/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(patientData),
			})

			if (response.ok) {
				toast.success('Pomyślnie dodano nowego pacjenta!', {
					position: 'top-center',
				})
				router.push('/list-of-patients')
			} else {
				throw new Error('Błąd podczas dodawania pacjenta')
			}
		} catch (error) {
			console.error('Błąd podczas dodawania pacjenta:', error)
			toast.error('Błąd podczas dodawania pacjenta', {
				position: 'top-center',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await addPatient(e)
		} catch (error) {
			console.error('Błąd podczas dodawania pacjenta:', error)
		}
	}

	useEffect(() => {
		const checkUserLoggedIn = async () => {
			try {
				const accounts = msalInstance.getAllAccounts()
				if (accounts.length > 0) {
					setUser(accounts[0])
					setUserId(accounts[0].homeAccountId.split('.').pop() || null)
				}
			} catch (error) {
				console.error('Błąd podczas sprawdzania stanu zalogowania użytkownika:', error)
			}
		}

		checkUserLoggedIn()
	}, [])

	return (
		<section className='container py-20'>
			<NewPatientForm
				patientData={patientData}
				setPatientData={setPatientData}
				submitting={submitting}
				handleSubmit={handleFormSubmit}
				error={error}
			/>
		</section>
	)
}

export default NewPatientPage
