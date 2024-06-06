'use client'

import { useState, useEffect, FormEvent } from 'react'
import NewPatientForm from '../../components/Forms/NewPatientForm'
import { AccountInfo } from '@azure/msal-browser'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMsal } from '@azure/msal-react'

function NewPatientPage() {
	const [userId, setUserId] = useState<string>('')
	const [patientData, setPatientData] = useState({
		firstName: '',
		lastName: '',
		pesel: '',
	})
	const [submitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()
	const { instance, accounts } = useMsal()

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
					Authorization: `Bearer ${userId}`,
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
		instance
			.acquireTokenSilent({
				scopes: ['User.Read'],
				account: accounts[0] as AccountInfo,
			})
			.then(response => {
				const idToken = response.idToken

				sessionStorage.setItem('idToken', idToken)
				setUserId(idToken)
			})
			.catch(error => {
				console.error(error)
			})
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
