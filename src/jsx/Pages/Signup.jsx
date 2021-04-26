import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import hash from 'hash-it';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { setUserSession } from '../Utils/Common';
import restdbInstance from '../resetdbAPI';
import MyInput from '../Layout/MyInput';
import Button from '../Layout/Button';

const signInSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required'),
	name: Yup.string()
		.required('Name is required')
		.min(4, 'Name is too short - should be 4 chars min'),
	password: Yup.string()
		.required('Password is required')
		.min(4, 'Password is too short - should be 4 chars min')
});

const initialValues = {
	email: '',
	name: '',
	password: ''
};

const Signup = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { baseURL } = ExpenceStore;

		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(null);

		const handleRegister = async (values) => {
			setError(null);
			setLoading(true);
			await restdbInstance
				.post('usersdb', {
					email: values.email,
					pass: values.password,
					name: values.name,
					idToken: hash(values.email + values.password)
				})
				.then((response) => {
					setLoading(false);
					setUserSession(response.data.idToken, response.data.name, response.data._id);
					props.history.push(`/${baseURL}dashboard`);
					ExpenceStore.Retrieve(response.data._id);
				})
				.catch((err) => {
					setLoading(false);
					if (err.response.status === 401) setError(err.response.data.message);
					else setError('Something went wrong. Please try again later.');
				});
		};

		const dataInput = [
			{
				label: 'Email',
				idName: 'email'
			},
			{
				label: 'Name',
				idName: 'name'
			},
			{
				label: 'Password',
				idName: 'password'
			}
		];

		return (
			<>
				<div className="container-fluid auth">
					<div className="row">
						<div className="col-12">
							<div className="d-flex justify-content-center vh-100 align-items-center flex-column">
								<h4>Register new account in to the Expence tracker</h4>
								<Formik
									initialValues={initialValues}
									validationSchema={signInSchema}
									onSubmit={(values) => {
										handleRegister(values);
									}}
								>
									{(formik) => {
										const { errors, touched, isValid, dirty } = formik;
										return (
											<Form className="signin-form">
												{dataInput &&
													dataInput.map((item) => (
														<MyInput
															key={`input-${item.idName}`}
															label={item.label}
															id={item.idName}
															name={item.idName}
															className={`form-control${
																errors.email && touched.email
																	? ' input-error'
																	: ''
															}`}
															type="text"
															autoComplete="off"
														/>
													))}

												{error && (
													<>
														<small style={{ color: 'red' }}>
															{error}
														</small>
														<br />
													</>
												)}

												<Button
													type="submit"
													className="btn btn-primary"
													value={loading ? 'Loading...' : 'Sign up'}
													disabled={!(dirty && isValid)}
												>
													Sign up
												</Button>
											</Form>
										);
									}}
								</Formik>

								<Link to={`/${baseURL}login`} className="link mt-3">
									Already have an account?
								</Link>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	})
);

Signup.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Signup;
