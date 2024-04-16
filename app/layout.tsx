import Navigation from '@/components/Navigation'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Health Assistant',
	description: 'Zdrowie pod kontrolą, zawsze z Tobą',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<script src='https://kit.fontawesome.com/1c70c2797d.js'></script>
			</head>
			<body>
				<Navigation/>
				<main className={inter.className}>{children}</main>
				<Footer/>
			</body>
		</html>
	)
}
