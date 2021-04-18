/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

export const AddTransaction = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { addTransaction } = ExpenceStore;

		const [text, setText] = useState([]);
		const [amount, setAmount] = useState(0);

		const onSubmit = (e) => {
			e.preventDefault();

			const newTransaction = {
				text,
				amount: +amount
			};

			addTransaction(newTransaction, e);
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
								/>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="amount">
									Amount (negative - expense, positive - income)
								</label>
								<input
									id="amount"
									name="amount"
									className="form-control"
									type="number"
									placeholder="Enter amount..."
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
						</div>
						<div className="form-group d-flex justify-content-center">
							<button type="submit" className="btn btn-primary">
								Add transaction
							</button>
						</div>
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
