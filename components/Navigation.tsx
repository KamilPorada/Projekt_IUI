import TopNavigation from './TopNavigation'
import SideNavigation from './SideNavigation'
import { useIsAuthenticated } from '@azure/msal-react'

const Navigation = () => {
	const isAuthenticated = useIsAuthenticated()
	return (
		<>
			{isAuthenticated ? <SideNavigation /> : <TopNavigation />}
		</>
	)
}

export default Navigation
