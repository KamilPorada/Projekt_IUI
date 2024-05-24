import { FormEvent, Dispatch, SetStateAction, useState } from 'react'
import Link from 'next/link'
import Button from '../UI/Button'
import SectionTitle from '../UI/SectionTitle'
import React from 'react'

interface NewPatientFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>, patientData: PatientData) => Promise<void>
	submitting: boolean
	patientData: PatientData 
	setPatientData: Dispatch<SetStateAction<PatientData>>
	error: string
}

interface PatientData {
	firstName: string
	lastName: string
	pesel: string
}

const NewPatientForm: React.FC<NewPatientFormProps> = ({ handleSubmit, submitting, patientData, setPatientData }) => {
	const [error, setError] = useState<string>('')

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!patientData.firstName.trim() || !patientData.lastName.trim()) {
			setError('Proszę podać zarówno imię, jak i nazwisko.')
			return
		}

		if (!/^\d{11}$/.test(patientData.pesel)) {
			setError('PESEL musi składać się z 11 cyfr.')
			return
		}

		setError('')

		await handleSubmit(e, patientData)
	}

	return (
		<section className='w-full mt-3 flex flex-col items-center text-black'>
			<SectionTitle title='Nowy pacjent' />
			<p className='mt-3 lg:text-lg text-center'>Dodaj nowego pacjenta i podaj niezbędne informacje.</p>
			<form onSubmit={handleFormSubmit} className='mt-3 w-full max-w-2xl flex flex-col gap-4'>
				<label className='flex flex-col'>
					<span className='font-semibold text-base lg:text-lg text-secondaryColor'>Imię</span>
					<input
						type='text'
						name='firstName'
						className='px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor'
						value={patientData.firstName}
						onChange={e => setPatientData({ ...patientData, firstName: e.target.value })}
					/>
				</label>
				<label className='flex flex-col'>
					<span className='font-semibold text-base lg:text-lg text-secondaryColor'>Nazwisko</span>
					<input
						type='text'
						name='lastName'
						className='px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor'
						value={patientData.lastName}
						onChange={e => setPatientData({ ...patientData, lastName: e.target.value })}
					/>
				</label>
				<label className='flex flex-col'>
					<span className='font-semibold text-base lg:text-lg text-secondaryColor'>PESEL</span>
					<input
						type='text'
						name='pesel'
						className='px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor'
						value={patientData.pesel}
						onChange={e => setPatientData({ ...patientData, pesel: e.target.value })}
					/>
				</label>
				<p className='mt-1 text-center font-semibold text-red-500'>{error}</p>
				<div className='flex flex-row justify-center text-white'>
					<Link href='/'>
						<Button>Anuluj</Button>
					</Link>
					<Button disabled={submitting}>{submitting ? 'Dodawanie pacjenta...' : 'Dodaj pacjenta'}</Button>
				</div>
			</form>
		</section>
	)
}

export default NewPatientForm
