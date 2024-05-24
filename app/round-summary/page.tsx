'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SectionTitle from '@/components/UI/SectionTitle'
import RoundPatientHeader from '@/components/Items/RoundPatientHeader'
import RoundPatientItem from '@/components/Items/RoundPatientItem'
import Button from '@/components/UI/Button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RoundSummary = () => {
	const [patients, setPatients] = useState<any[]>([])
	const [roundDate, setRoundDate] = useState<string>()
	const [roundTime, setroundTime] = useState<string>()
	const itemsPerPage = 10
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const data = localStorage.getItem('roundData')
		if (data) {
			const parsedData = JSON.parse(data)
			setRoundDate(parsedData.date)
			setroundTime(parsedData.time)
			setPatients(parsedData.responseData)
		}
	}, [])

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem)

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

	const handleSaveData = () => {
		toast.info('Pomyślnie zapisano dane z obchodu do kart pacjentów!', {
			position: 'top-center',
		})
	}

	return (
		<section className='container py-20'>
			<SectionTitle title='Wyniki analizy pliku audio z obchodu' />
			<p className='text-black text-center mt-6 uppercase font-thin text-sm md:text-base'>
				{`Obchód lekarski z dnia ${roundDate}, godzina ${roundTime}`}
			</p>

			<div className='overflow-x-auto ring-1 ring-black mt-5'>
				<RoundPatientHeader />
				{currentItems.map((patient, index) => (
					<RoundPatientItem
						key={index}
						index={indexOfFirstItem + index + 1}
						name={patient.name}
						surname={patient.lastName}
						pesel={patient.pesel}
						condition={patient.text}
					/>
				))}
			</div>
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
			<div className='mt-10 flex flex-row justify-center items-center gap-5'>
				<Link href={'/'}>
					<Button>Anuluj</Button>
				</Link>
				<Link href={'/'}>
					<Button onClick={handleSaveData}>Zapisz dane do kart pacjentów</Button>
				</Link>
			</div>
		</section>
	)
}

export default RoundSummary
