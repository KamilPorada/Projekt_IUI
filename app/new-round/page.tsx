'use client'
import { useState, useEffect, FormEvent } from 'react'
import NewRoundForm from '../../components/Forms/NewRoundForm'
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser'
import { msalConfig } from '../authConfig'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function NewRoundPage() {
	const [user, setUser] = useState<AccountInfo | null>(null)
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

	const addRound = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		if (!round.date || !round.time || !round.audioFile) {
			setError('Wypełnij wszystkie pola formularza!')
			setIsSubmitting(false)
			return
		}

		try {
			const formData = new FormData()
			if (userId) {
				formData.append('userId', userId)
			}
			formData.append('date', round.date)
			formData.append('time', round.time)
			formData.append('audioFile', round.audioFile)

			// formData.forEach((value, key) => {
			//     console.log(key + ': ' + value)
			//   })

			const response = await fetch('URL', {
				method: 'POST',
				body: formData,
			})
			setError('')

            toast.info('Pomyślnie przeanalizowano plik audio z obchodu!', {
                position: 'top-center',
            });
            router.push('/round-summary')

			if (response.ok) {
				toast.success('Pomyślnie przeanalizowano plik audio z obchodu!', {
                    position: 'top-center',
                });
				router.push('/')
			} else {
				throw new Error('Błąd podczas analizy pliku audio z obchodu')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsSubmitting(false)
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
			<NewRoundForm round={round} setRound={setRound} submitting={submitting} handleSubmit={addRound} error={error} />
		</section>
	)
}

export default NewRoundPage
