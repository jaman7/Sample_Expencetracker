/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { SubmitBtn } from '../Layout/SubmitBtn';

export const AddTransaction = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { addTransaction } = ExpenceStore;

		const [text, setText] = useState([]);
		const [amount, setAmount] = useState(0);

		const textInput = createRef();
		const numberInput = createRef();

		const onSubmit = (e) => {
			e.preventDefault();

			const newTransaction = {
				text,
				amount: +amount
			};

			addTransaction(newTransaction, e);
			numberInput.current.value = 0;
			textInput.current.value = '';
		};

		const handleValueChanged = (val, e) => {
			e.preventDefault();
			setAmount(val);
			numberInput.current.value = val;
		};

		const handleStepUp = (e) => {
			e.preventDefault();
			handleValueChanged(amount + 1, e);
		};

		const handleStepDown = (e) => {
			e.preventDefault();
			handleValueChanged(amount - 1, e);
		};

		return (
			<>
				<div className="col-12 py-3 bg-form">
					<h3 className="transaction-desc">Add new transaction</h3>
					<form className="transaction-form py-4" onSubmit={onSubmit}>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="text">Text</label>
								<input
									id="text"
									name="text"
									className="form-control"
									type="text"
									placeholder="Enter text..."
									value={text}
									onChange={(e) => setText(e.target.value)}
									ref={textInput}
								/>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="amount">
									Amount (negative - expense, positive - income)
								</label>
								<div className="number-input">
									<button
										type="button"
										className="minus"
										onClick={(e) => handleStepDown(e)}
									/>
									<input
										id="amount"
										name="amount"
										className="form-control"
										type="number"
										placeholder="Enter amount..."
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										ref={numberInput}
									/>
									<button
										type="button"
										onClick={(e) => handleStepUp(e)}
										className="plus"
									/>
								</div>
							</div>
						</div>
						<SubmitBtn />
					</form>
				</div>
			</>
		);
	})
);

AddTransaction.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default AddTransaction;
