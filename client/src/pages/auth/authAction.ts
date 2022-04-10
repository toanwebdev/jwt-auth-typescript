import authApi from '../../api/authApi'
import { User } from '../../interfaces'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from './authSlice'
import JWTManager from '../../utils/jwt'

export const authenticate = async (dispatch: any) => {
	dispatch(loginStart())

	const token = JWTManager.getToken()
	if (token) {
		dispatch(loginSuccess())
	} else {
		const success = await JWTManager.getRefreshToken()
		if (success) {
			dispatch(loginSuccess())
		} else {
			dispatch(loginFailed())
		}
	}
}

export const registerUser = async (user: User, dispatch: any, navigate: any) => {
	dispatch(registerStart())
	try {
		const data = await authApi.registerUser(user)
		dispatch(registerSuccess())
		JWTManager.setToken(data.accessToken)
		navigate('/')
	} catch (error) {
		dispatch(registerFailed())
	}
}

export const loginUser = async (user: User, dispatch: any, navigate: any) => {
	dispatch(loginStart())
	try {
		const data = await authApi.loginUser(user)
		dispatch(loginSuccess())
		JWTManager.setToken(data.accessToken)
		navigate('/')
	} catch (error) {
		dispatch(loginFailed())
	}
}

export const logoutUser = async (dispatch: any, navigate: any) => {
	dispatch(logoutStart())
	try {
		await authApi.logoutUser(JWTManager.getUserId() as number)
		dispatch(logoutSuccess())
		JWTManager.deleteToken()
		navigate('/')
	} catch (error) {
		dispatch(logoutFailed())
	}
}
