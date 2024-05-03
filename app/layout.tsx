'use client'
import React from 'react'
import Navigation from '@/components/Navigation'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { ToastContainer, Zoom } from 'react-toastify'

import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from './authConfig'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const msalInstance = new PublicClientApplication(msalConfig)

	return (
		<html lang='en'>
			<head>
				<script src='https://kit.fontawesome.com/1c70c2797d.js'></script>
			</head>
			<body>
				<React.StrictMode>
					<MsalProvider instance={msalInstance}>
						<ToastContainer draggable={false} transition={Zoom} autoClose={4000} />
						<Navigation />
						<main className={inter.className}>{children}</main>
						<Footer />
					</MsalProvider>
				</React.StrictMode>
			</body>
		</html>
	)
}
