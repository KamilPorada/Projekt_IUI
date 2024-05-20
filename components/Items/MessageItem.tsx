import React from 'react'

interface MessageItemProps {
	user: string
	isBot: boolean
	time: string
	text: string
}

const MessageItem: React.FC<MessageItemProps> = ({ user, isBot, time, text }) => {
	return (
		<div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} mb-4`}>
			<div className={`flex items-center ${isBot ? 'justify-start' : 'justify-end'} w-full`}>
				<span className='text-xs font-bold mr-2'>{user}</span>
				<span className='text-xs text-gray-500'>{time}</span>
			</div>
			<div className={`p-3 rounded-lg ${isBot ? 'bg-gray-200' : 'bg-blue-500 text-white'} max-w-xs`}>
				<p className='text-sm lg:text-base'>{text}</p>
			</div>
		</div>
	)
}

export default MessageItem
