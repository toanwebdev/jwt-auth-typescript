import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface AuthState {
	isLoading: boolean
	isAuthenticated: boolean
	isError: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
	isLoading: false,
	isAuthenticated: false,
	isError: false,
}

export const authSlice = createSlice({
	name: 'auth',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		registerStart: (state) => {
			state.isLoading = true
		},
		registerSuccess: (state) => {
			state.isLoading = false
			state.isAuthenticated = true
			state.isError = false
		},
		registerFailed: (state) => {
			state.isLoading = false
			state.isAuthenticated = false
			state.isError = true
		},

		loginStart: (state) => {
			state.isLoading = true
		},
		loginSuccess: (state) => {
			state.isLoading = false
			state.isAuthenticated = true
			state.isError = false
		},
		loginFailed: (state) => {
			state.isLoading = false
			state.isAuthenticated = false
			state.isError = true
		},

		logoutStart: (state) => {
			state.isLoading = true
		},
		logoutSuccess: (state) => {
			state.isLoading = false
			state.isAuthenticated = false
			state.isError = false
		},
		logoutFailed: (state) => {
			state.isLoading = false
			state.isError = true
		},
	},
})

export const {
	registerStart,
	registerSuccess,
	registerFailed,
	loginStart,
	loginSuccess,
	loginFailed,
	logoutStart,
	logoutSuccess,
	logoutFailed,
} = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated

export default authSlice.reducer
