import './globals.css'
import { Inter } from 'next/font/google'

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
			<body className={inter.className}>{children}</body>
		</html>
	)
}
