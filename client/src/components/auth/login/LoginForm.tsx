import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../app/hook'
import { User } from '../../../interfaces'
import { loginUser } from '../../../pages/auth/authAction'
import InputField from '../../common/InputField'
import './LoginForm.scss'

const LoginForm = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const initialValues: User = {
		username: '',
		password: '',
	}

	const LoginSchema = Yup.object().shape({
		username: Yup.string()
			.min(5, 'Tài khoản phải có ít nhất 5 ký tự!')
			.max(50, 'Tài khoản chỉ có thể dài 50 ký tự!')
			.required('Tài khoản không thể để trống!'),
		password: Yup.string()
			.min(5, 'Mật khẩu phải có ít nhất 5 ký tự!')
			.max(50, 'Mật khẩu chỉ có thể dài 50 ký tự!')
			.required('Mật khẩu không thể để trống!'),
	})

	const onLoginSubmit = async (values: User) => {
		loginUser(values, dispatch, navigate)
	}

	return (
		<Box className='loginForm'>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<i className='bx bx-lock-alt'></i>
			</Avatar>
			<Typography component='h1' variant='h5'>
				Đăng nhập
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={LoginSchema}
				onSubmit={onLoginSubmit}>
				{({ isSubmitting }: { isSubmitting: boolean }) => (
					<Form className='loginForm__form'>
						<InputField
							required
							fullWidth
							label='Tài khoản'
							name='username'
							type='text'
							autoFocus
						/>

						<InputField
							required
							fullWidth
							label='Mật khẩu'
							name='password'
							type='password'
						/>

						<Link to='/forgot-password' className='loginForm__form__link'>
							Quên mật khẩu ?
						</Link>

						<LoadingButton
							loading={isSubmitting}
							type='submit'
							fullWidth
							variant='contained'
							className='loginForm__form__btn'>
							Đăng nhập
						</LoadingButton>
					</Form>
				)}
			</Formik>

			<Box className='loginForm__register'>
				<span>Bạn chưa có tài khoản ?</span>
				<Link to='/register' className='loginForm__register__link'>
					Đăng ký tại đây.
				</Link>
			</Box>
		</Box>
	)
}

export default LoginForm
