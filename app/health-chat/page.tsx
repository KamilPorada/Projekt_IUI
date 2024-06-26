'use client'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HealthBotLogo from '../../public/img/health-bot-logo.svg'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import MessageItem from '@/components/Items/MessageItem'
import { AccountInfo } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'

interface Message {
	user: string
	isBot: boolean
	time: string
	text: string
}

const HealthChat: React.FC = () => {
	const [userId, setUserId] = useState<string>('')
	const [messages, setMessages] = useState<Message[]>([])
	const [messageText, setMessageText] = useState<string>('')
	const { instance, accounts } = useMsal()

	const getCurrentTime = (): string => {
		const date = new Date()
		return date.toLocaleTimeString('pl-PL', {
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const getCurrentDate = (): string => {
		const date = new Date()
		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	const handleSendMessage = async (): Promise<void> => {
		if (messageText.trim() !== '') {
			const newMessage: Message = {
				user: `dr ${accounts[0]?.name}`,
				isBot: false,
				time: getCurrentTime(),
				text: messageText,
			}
			setMessages(messages.concat(newMessage))
			setMessageText('')

			try {
				const response = await fetch('http://localhost:8080/askQuestion', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userId}`,
					},
					body: JSON.stringify({ question: messageText }),
				})
				const data = await response.json()
				const botMessage: Message = {
					user: 'Health Bot',
					isBot: true,
					time: getCurrentTime(),
					text: data.answer,
				}
				console.log(data)
				setMessages(messages.concat(newMessage, botMessage))
			} catch (error) {
				console.error('Error sending message to HealthBot:', error)
			}
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			handleSendMessage()
		}
	}

	useEffect(() => {
		instance
			.acquireTokenSilent({
				scopes: ['User.Read'],
				account: accounts[0] as AccountInfo,
			})
			.then(response => {
				const idToken = response.idToken

				sessionStorage.setItem('idToken', idToken)
				setUserId(idToken)
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	return (
		<div className='flex justify-center items-center w-screen h-screen'>
			<div className='flex flex-col justify-start items-center w-4/5 sm:w-3/5 md:w-2/5 h-3/4 bg-white rounded-md ring-1 ring-gray-300 shadow-lg overflow-hidden'>
				<div className='flex flex-row justify-start items-center gap-4 md:pl-8 w-full h-1/5 bg-secondaryColor'>
					<img src={HealthBotLogo.src} alt='Logo Health Bota Microsoft Azure' className='h-3/4' />
					<p className='font-thin text-sm sm:text-base lg:text-lg'>
						Czat online z <br />
						<span className='font-normal'>Health Botem firmy Microsoft Azure</span>
					</p>
				</div>
				<div className='flex flex-col justify-start gap-4 w-full h-4/5 overflow-y-scroll text-black p-5'>
					<p className='self-center text-xs font-thin'>{getCurrentDate()}</p>
					<MessageItem
						user='Health Bot'
						isBot={true}
						time={getCurrentTime()}
						text='Good morning! How can I help you?'
					/>
					{messages.map((message, index) => (
						<MessageItem
							key={index}
							user={message.user}
							isBot={message.isBot}
							time={message.time}
							text={message.text}
						/>
					))}
				</div>
				<div className='flex flex-row justify-start items-center w-full h-1/5 ring-1 px-2 ring-gray-200'>
					<textarea
						className='flex-grow h-4/5 p-2 border border-gray-300 rounded-md text-black text-sm md:text-base resize-none focus:outline-none focus:ring-2 focus:ring-mainColor'
						placeholder='Wpisz swoją wiadomość...'
						value={messageText}
						onChange={e => setMessageText(e.target.value)}
						onKeyDown={handleKeyDown}></textarea>
					<button
						className='flex items-center justify-center w-12 h-12 ml-2 bg-mainColor text-white rounded-full transition-all hover:scale-110'
						onClick={handleSendMessage}>
						<FontAwesomeIcon icon={faPaperPlane} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default HealthChat
