import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { useAppDispatch } from './app/hook'
import { authenticate } from './pages/auth/authAction'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Layout from './pages/web/Layout'

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		authenticate(dispatch)
	}, [dispatch])

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/register' element={<Register />}></Route>
					<Route path='/' element={<Layout />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
