/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import hash from 'hash-it';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { setUserSession } from '../Utils/Common';
import restdbInstance from '../resetdbAPI';

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
												<div className="form-group">
													<label htmlFor="email">Email</label>
													<Field
														type="email"
														name="email"
														id="email"
														className={`form-control ${
															errors.email && touched.email
																? ' input-error'
																: null
														}`}
													/>
													<ErrorMessage
														name="email"
														component="span"
														className="error"
													/>
												</div>

												<div className="form-group">
													<label htmlFor="name">Name</label>
													<Field
														type="text"
														name="name"
														id="name"
														className={`form-control ${
															errors.name && touched.name
																? ' input-error'
																: null
														}`}
													/>
													<ErrorMessage
														name="name"
														component="span"
														className="error"
													/>
												</div>

												<div className="form-group">
													<label htmlFor="password">Password</label>
													<Field
														type="password"
														name="password"
														id="password"
														className={`form-control ${
															errors.email && touched.email
																? ' input-error'
																: null
														}`}
													/>
													<ErrorMessage
														name="password"
														component="span"
														className="error"
													/>
												</div>

												{error && (
													<>
														<small style={{ color: 'red' }}>
															{error}
														</small>
														<br />
													</>
												)}

												<button
													type="submit"
													className="btn btn-primary"
													value={loading ? 'Loading...' : 'Sign In'}
													disabled={!(dirty && isValid)}
												>
													Sign In
												</button>
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
