const Button: React.FC<{
	className?: string
	onClick?: () => void
	disabled?: boolean
	children: React.ReactNode
}> = props => {
	const buttonClassName = `px-6 py-2 mx-3 text-xs sm:text-base rounded-md font-semibold ${
		props.disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-mainColor hover:scale-105 transition duration-300'
	} ${props.className}`

	return (
		<button className={buttonClassName} onClick={props.onClick} disabled={props.disabled}>
			{props.children}
		</button>
	)
}

export default Button
