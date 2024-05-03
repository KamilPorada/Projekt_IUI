'use client'

import { useState } from 'react'
import Link from 'next/link'

import SectionTitle from '@/components/UI/SectionTitle'
import RoundPatientHeader from '@/components/Items/RoundPatientHeader'
import RoundPatientItem from '@/components/Items/RoundPatientItem'
import Button from '@/components/UI/Button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RoundSummary = () => {
	const generateDummyPatients = () => {
		const patients = []
		const names = ['Anna', 'Jan', 'Maria', 'Piotr', 'Magdalena', 'Krzysztof', 'Alicja', 'Tomasz', 'Karolina', 'Artur']
		const surnames = [
			'Kowalska',
			'Nowak',
			'Wiśniewska',
			'Dąbrowski',
			'Lis',
			'Zieliński',
			'Szymańska',
			'Wójcik',
			'Kaczmarek',
			'Piotrowski',
		]

		const generatePesel = () => {
			const randomDigits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
			return '9' + randomDigits // PESEL zaczynający się od 9 oznacza, że osoba jest urodzona po 2000 roku
		}

		const conditions = [
			'Pacjentka skarży się na przeziębienie. Objawy obejmują katar, kaszel oraz ból gardła. Poleca się podawanie leków przeciwbólowych oraz spokój w domu.',
			'Pacjent cierpi na silny ból gardła, który utrudnia mu jedzenie i picie. Objawy to również wysoka gorączka oraz ogólne osłabienie organizmu.',
			'Gorączka u pacjentki utrzymuje się od dwóch dni. Towarzyszą jej objawy takie jak dreszcze, bóle mięśni oraz osłabienie.',
			'Kaszel u pacjenta utrzymuje się już od kilku tygodni. Cierpi również na duszności oraz uczucie zmęczenia. Zaleca się konsultację z lekarzem.',
			'Pacjentka skarży się na bóle głowy, które występują okresowo. Bóle są nasilone, ale nie towarzyszą im inne objawy.',
			'Katar u pacjenta utrzymuje się od kilku dni. Towarzyszy mu kichanie, ból gardła oraz ogólne uczucie rozbicia.',
			'Wysypka u pacjentki pojawia się na skórze od kilku dni. Objawy towarzyszące to świąd oraz zaczerwienienie skóry.',
			'Ból brzucha u pacjenta występuje od dwóch dni. Jest to ból o charakterze kolkowym, który pojawia się po posiłkach.',
			'Ból pleców u pacjentki trwa już od tygodnia. Jest to ból o charakterze ciągnącym, który nasila się przy ruchach.',
			'Pacjent cierpi na zapalenie zatok, które objawia się silnym bólem głowy oraz zatkanym nosem. Towarzyszy mu również uczucie ciężkości w głowie.',
		]

		for (let i = 0; i < 50; i++) {
			const name = names[Math.floor(Math.random() * names.length)]
			const surname = surnames[Math.floor(Math.random() * surnames.length)]
			const pesel = generatePesel()
			const condition = conditions[Math.floor(Math.random() * conditions.length)]

			patients.push({ name, surname, pesel, condition })
		}

		return patients
	}

	const dummyPatients = generateDummyPatients()
	const itemsPerPage = 10
	const [currentPage, setCurrentPage] = useState(1)

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = dummyPatients.slice(indexOfFirstItem, indexOfLastItem)

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const handleSaveData = () =>{
        toast.info('Pomyślnie zapisano dane z obchodu do kart pacjentów!', {
            position: 'top-center',
        });
    }

	return (
		<section className='container py-20'>
			<SectionTitle title='Wyniki analizy pliku audio z obchodu' />
			<p className='text-black text-center mt-6 uppercase font-thin text-sm md:text-base'>
				Obchód lekarski z dnia 03.05.2024, godzina 12:00
			</p>
			<div className='overflow-x-auto ring-1 ring-black mt-5'>
				<RoundPatientHeader />
				{currentItems.map((patient, index) => (
					<RoundPatientItem
						key={index}
						index={indexOfFirstItem + index + 1}
						name={patient.name}
						surname={patient.surname}
						pesel={patient.pesel}
						condition={patient.condition}
					/>
				))}
			</div>
			<div className='flex justify-center mt-4'>
				{Array.from({ length: Math.ceil(dummyPatients.length / itemsPerPage) }, (_, index) => (
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
