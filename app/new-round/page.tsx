'use client'

import { useState, useEffect, FormEvent } from 'react'
import NewRoundForm from '../../components/Forms/NewRoundForm'
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser'
import { msalConfig } from '../authConfig'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMsal } from '@azure/msal-react'


function NewRoundPage() {
	const [userId, setUserId] = useState<string | null>(null)
	const [round, setRound] = useState({
		date: new Date().toISOString().slice(0, 10),
		time: '',
		audioFile: null,
	})
	const [submitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()
	const msalInstance = new PublicClientApplication(msalConfig)
	const { instance, accounts } = useMsal()

	const addRound = async (e: FormEvent<HTMLFormElement>, fileContent: File) => {
		e.preventDefault()
		setIsSubmitting(true)

		if (!round.date || !round.time || !round.audioFile) {
			setError('Wypełnij wszystkie pola formularza!')
			setIsSubmitting(false)
			return
		}

		try {
			const formData = new FormData()

			formData.append('file', fileContent)

			const response = await fetch('http://localhost:8080/upload/audio', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userId}`,
				},
				body: formData,
			})

			const responseData = await response.json()
			const roundData = {
				responseData,
				date: round.date,
				time: round.time,
			}
			console.log(responseData)
			localStorage.setItem('roundData', JSON.stringify(roundData))

			setError('')

			if (response.ok) {
				toast.success('Pomyślnie przeanalizowano plik audio z obchodu!', {
					position: 'top-center',
				})
				router.push('/round-summary')
			} else {
				throw new Error('Błąd podczas analizy pliku audio z obchodu')
			}
		} catch (error) {
			console.log(error)
			toast.error('Błąd podczas analizy pliku audio z obchodu', {
				position: 'top-center',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!round.audioFile) {
			setError('Wybierz plik audio.')
			return
		}

		try {
			await addRound(e, round.audioFile)
		} catch (error) {
			console.error('Błąd podczas odczytu pliku:', error)
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
			<NewRoundForm
				round={round}
				setRound={setRound}
				submitting={submitting}
				handleSubmit={handleFormSubmit}
				error={error}
			/>
		</section>
	)
}

export default NewRoundPage