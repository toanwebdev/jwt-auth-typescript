import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../app/hook'
import { User } from '../../../interfaces'
import { registerUser } from '../../../pages/auth/authAction'
import InputField from '../../common/InputField'
import './RegisterForm.scss'

const RegisterForm = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const initialValues: User = {
		firstName: '',
		lastName: '',
		username: '',
		password: '',
	}

	const RegisterSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'Họ phải có ít nhất 2 ký tự!')
			.max(100, 'Họ chỉ có thể dài 100 ký tự!')
			.required('Họ không thể để trống!'),
		lastName: Yup.string()
			.min(2, 'Tên phải có ít nhất 2 ký tự!')
			.max(100, 'Tên chỉ có thể dài 100 ký tự!')
			.required('Tên không thể để trống!'),
		username: Yup.string()
			.min(5, 'Tài khoản phải có ít nhất 5 ký tự!')
			.max(50, 'Tài khoản chỉ có thể dài 50 ký tự!')
			.required('Tài khoản không thể để trống!'),
		password: Yup.string()
			.min(5, 'Mật khẩu phải có ít nhất 5 ký tự!')
			.max(50, 'Mật khẩu chỉ có thể dài 50 ký tự!')
			.required('Mật khẩu không thể để trống!'),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref('password'), null],
			'Mật khẩu không trùng khớp',
		),
	})

	const onRegisterSubmit = (values: User) => {
		registerUser(values, dispatch, navigate)
	}

	return (
		<Box className='registerForm'>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<i className='bx bx-lock-alt'></i>
			</Avatar>
			<Typography component='h1' variant='h5'>
				Đăng ký
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={RegisterSchema}
				onSubmit={onRegisterSubmit}>
				{({ isSubmitting }: { isSubmitting: boolean }) => (
					<Form className='registerForm__form'>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<InputField
									name='firstName'
									required
									fullWidth
									label='Họ'
									type='text'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<InputField
									required
									fullWidth
									label='Tên'
									name='lastName'
									type='text'
								/>
							</Grid>
							<Grid item xs={12}>
								<InputField
									required
									fullWidth
									label='Tài khoản'
									name='username'
									type='text'
								/>
							</Grid>
							<Grid item xs={12}>
								<InputField
									required
									fullWidth
									name='password'
									label='Mật khẩu'
									type='password'
								/>
							</Grid>
							<Grid item xs={12}>
								<InputField
									required
									fullWidth
									name='confirmPassword'
									label='Xác nhận mật khẩu'
									type='password'
								/>
							</Grid>
						</Grid>
						<LoadingButton
							loading={isSubmitting}
							type='submit'
							fullWidth
							variant='contained'
							className='registerForm__form__btn'>
							Đăng ký
						</LoadingButton>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

export default RegisterForm
