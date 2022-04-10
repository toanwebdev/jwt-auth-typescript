import JWTManager from '../../utils/jwt'

const Layout = () => {
	return (
		<div>
			<h1>JWT AUTHENTICATION</h1>
			<h3>{JWTManager.getToken()}</h3>
		</div>
	)
}

export default Layout
