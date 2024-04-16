'use client'
import { Link } from "react-router-dom";
import logo from '../public/img/logo-psk.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-dark-shade text-neutral-color">
      <div className="container py-6">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:mb-4">
          {/* <Link to={"https://uniwersytetradom.pl"} className="mb-2 md:mb-0">
            <div className="footer__top-img mr-4">
              <img
                src={logo.src}
                alt="Logo Uniwersytetu Radomskiego"
                className="w-24 h-24 rounded-full bg-white"
              />
            </div>
          </Link> */}
          <div className="footer__top-text text-center md:text-left">
            <p>
              Strona została wykonana przez absolwentów{" "}
              {/* <Link
                to={"https://uniwersytetradom.pl"}
                className="footer__top-text-link transition-colors duration-300 hover:text-accent-color-1"
              >
                Uniwersytetu Radomskiego
              </Link> */}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="footer__bottom-authors flex gap-4 mb-2 md:mb-0">
            <p>&copy; {currentYear}</p>
            {/* <Link to={"https://github.com/Mateusz-Michalec"} className="transition-colors duration-300 hover:text-accent-color-1">
              <p className="footer__bottom-authors-member">Mateusz Michalec</p>
            </Link> */}
            {/* <Link to={"https://github.com/KamilPorada"} className="transition-colors duration-300 hover:text-accent-color-1">
              <p className="footer__bottom-authors-member">Kamil Porada</p>
            </Link> */}
          </div>
          <p>Wszelkie prawa zastrzeżone</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
