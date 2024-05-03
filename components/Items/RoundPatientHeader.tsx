const RoundPatientHeader = () => {
	return (
		<div className='flex w-[1137px] text-sm lg:text-base h-auto  bg-mainColor text-white font-semibold text-center rounded-sm ring-1 ring-mainColor shadow z-10000'>
			<div className='flex flex-row justify-between items-center w-full h-full'>
				<div className='flex justify-center items-center w-16 h-10 ring-1 ring-black'>
					<p>L.P.</p>
				</div>
				<div className='flex justify-center items-center w-36 h-10 ring-1 ring-black'>
					<p>Imię</p>
				</div>
				<div className='flex justify-center items-center w-36 h-10 ring-1 ring-black'>
					<p>Nazwisko</p>
				</div>
				<div className='flex justify-center items-center w-36 h-10 ring-1 ring-black'>
					<p>PESEL</p>
				</div>
				<div className='flex justify-center items-center w-36 h-10 ring-1 ring-black'>
					<p>Płeć</p>
				</div>
				<div className='flex justify-center items-center w-36 h-10 ring-1 ring-black'>
					<p>Data urodzenia</p>
				</div>
				<div className='flex justify-center items-center w-96 h-10 ring-1 ring-black'>
					<p>Stan pacjenta</p>
				</div>
			</div>
		</div>
	)
}

export default RoundPatientHeader
