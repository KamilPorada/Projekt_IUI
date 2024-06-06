'use client'
import React, { useState, useEffect } from 'react'
import SectionTitle from '@/components/UI/SectionTitle'
import ListOfPatientsHeader from '@/components/Items/ListOfPatientsHeader'
import PatientItem from '@/components/Items/PatientItem'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { useMsal } from '@azure/msal-react'
import { AccountInfo } from '@azure/msal-browser'

interface Patient {
	uuid: string
	firstName: string
	lastName: string
	pesel: string
}

interface PatientListResponse {
	Status: string
	patientList: Patient[]
}

const ListOfPatients: React.FC = () => {
	const [userId, setUserId] = useState<string>('')
	const [patients, setPatients] = useState<Patient[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10
	const router = useRouter()
	const { instance, accounts } = useMsal()

	useEffect(() => {
		const fetchPatients = async () => {
			try {
				const response = await instance.acquireTokenSilent({
					scopes: ['User.Read'],
					account: accounts[0] as AccountInfo,
				})

				const idToken = response.idToken
				const token = idToken
				setUserId(token)
				console.log(token)

				const responsePatients = await fetch('http://localhost:8080/patients/all', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})

				if (!responsePatients.ok) {
					throw new Error('Network response was not ok')
				}

				const data = await responsePatients.json()
				setPatients(data.patientList)
			} catch (error) {
				console.error('Wystąpił błąd podczas pobierania danych pacjentów:', error)
			}
		}

		fetchPatients()
	}, [instance, accounts])

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentPatients = patients.slice(indexOfFirstItem, indexOfLastItem)

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

	const handleDelete = async (uuid: string) => {
		try {
			const responseToken = await instance.acquireTokenSilent({
				scopes: ['User.Read'],
				account: accounts[0] as AccountInfo,
			})

			const token = responseToken.idToken

			const response = await fetch(`http://localhost:8080/patients/del/${uuid}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			if (!response.ok) {
				throw new Error('Failed to delete patient')
			}
			const updatedPatients = patients.filter(patient => patient.uuid !== uuid)
			setPatients(updatedPatients)
			toast.success('Pomyślnie usunięto pacjenta!', { position: 'top-center' })
		} catch (error) {
			console.error('Error deleting patient:', error)
			toast.error('Błąd podczas usuwania pacjenta', { position: 'top-center' })
		}
	}

	const handleEdit = (uuid: string) => {
		localStorage.setItem('editedPatientUUID', uuid)
		router.push(`/edit-patient`)
	}

	return (
		<div className='container py-20 text-black'>
			<SectionTitle title='Lista pacjentów' />
			<>
				{patients.length > 0 ? (
					<div className='overflow-x-auto mt-5 ring-1 ring-black'>
						<ListOfPatientsHeader />
						{currentPatients.map((patient, index) => (
							<PatientItem
								key={index}
								index={indexOfFirstItem + index + 1}
								firstName={patient.firstName}
								surname={patient.lastName}
								pesel={patient.pesel}
								handleDelete={handleDelete}
								handleEdit={handleEdit}
								uuid={patient.uuid}
							/>
						))}
					</div>
				) : (
					<p className='text-center mt-5'>Brak pacjentów!</p>
				)}
			</>
			<div className='flex justify-center mt-4'>
				{Array.from({ length: Math.ceil(patients.length / itemsPerPage) }, (_, index) => (
					<button
						key={index}
						className={`mx-1 px-3 py-1 rounded transition-colors hover:bg-mainColor ${
							currentPage === index + 1 ? 'text-white bg-mainColor' : 'text-black bg-gray-300'
						}`}
						onClick={() => paginate(index + 1)}>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	)
}

export default ListOfPatients
