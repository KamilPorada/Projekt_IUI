import heroImage from '../../public/img/health-params.jpg'

const HeroSection = () => {
	return <div className="relative w-screen h-[300px] md:h-[400px] lg:h-[500px] -z-10">
    <img
      src={heroImage.src}
      alt="Hero Seedling Image Big"
      className="absolute top-0 left-0 w-full h-full object-cover object-bottom"
    />
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
    <div className="flex justify-center items-center absolute top-1/4 left-1/4 w-1/2 h-1/2 p-5 text-center sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ring-2 ring-white rounded">
      <p className='font-thin lg:leading-10'>Kontrola twojego zdrowia pod najwyższą kontrolą platformy<br/><span className='font-semibold'>Health Assistant</span></p>
    </div>
  </div>
}

export default HeroSection
