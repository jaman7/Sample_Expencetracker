/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button from '../Layout/Button';
import PendingIcon from '../Layout/pendingicon';

const signInSchema = Yup.object().shape({
	text: Yup.string()
		.required('Text is required')
		.min(3, 'Text is too short - should be 3 chars min'),
	amount: Yup.number().integer().default(0)
});

const initialValues = {
	text: '',
	amount: 0
};

export const AddTransaction = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { addTransaction, addCurrTransaction, userId } = ExpenceStore;

		const [amount, setAmount] = useState(0);

		const onSubmit = (values) => {
			const newTransaction = {
				text: values.text,
				amount: +amount
			};
			setAmount(0);
			addTransaction(newTransaction, userId);
		};

		const handleValueChanged = (val) => {
			console.log(val);
			setAmount(val);
		};

		const handleStepUp = () => {
			handleValueChanged(amount + 1);
		};

		const handleStepDown = () => {
			handleValueChanged(amount - 1);
		};

		return (
			<>
				<div className="col-12 py-3 bg-form">
					<h3 className="transaction-desc">Add new transaction</h3>
					<Formik
						initialValues={initialValues}
						validationSchema={signInSchema}
						onSubmit={(values, { resetForm }) => {
							onSubmit(values);
							resetForm();
						}}
					>
						{(formik) => {
							const { errors, touched, isValid, dirty } = formik;
							return (
								<Form className="transaction-form py-4">
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="text">Text</label>
											<Field
												type="text"
												name="text"
												id="text"
												className={`form-control ${
													errors.text && touched.text
														? ' input-error'
														: null
												}`}
											/>
											<ErrorMessage
												name="text"
												component="span"
												className="error"
											/>
										</div>

										<div className="form-group col-md-6">
											<label htmlFor="amount">
												Amount (negative - expense, positive - income)
											</label>
											<div className="number-input">
												<Button
													type="button"
													className="minus"
													title="minus"
													aria-label="minus"
													onClick={() => handleStepDown()}
												/>
												<Field
													type="number"
													name="amount"
													id="amount"
													value={amount}
													onChange={() => setAmount()}
													className={`form-control ${
														errors.amount && touched.amount
															? ' input-error'
															: null
													}`}
												/>
												<Button
													type="button"
													className="plus"
													title="plus"
													aria-label="plus"
													onClick={() => handleStepUp()}
												/>
												<ErrorMessage
													name="amount"
													component="span"
													className="error"
												/>
											</div>
										</div>
									</div>
									<div className="form-group d-flex justify-content-center align-items-center flex-column">
										<Button
											type="submit"
											className="btn btn-primary"
											title="Add transaction"
											aria-label="Add transaction"
											disabled={!(dirty && isValid)}
										>
											Add transaction
										</Button>
										{addCurrTransaction ? (
											<div className="pending-icon">
												<PendingIcon />
											</div>
										) : (
											<></>
										)}
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</>
		);
	})
);

AddTransaction.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default AddTransaction;
