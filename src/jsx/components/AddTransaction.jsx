import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';

import Button from '../Layout/Button';
import PendingIcon from '../Layout/pendingicon';

export const AddTransaction = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { addTransaction, addCurrTransaction, userId } = ExpenceStore;

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

			addTransaction(newTransaction, userId, e);
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
							<Form.Group controlId="text" className="col-md-6">
								<Form.Label>Text</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter text..."
									value={text}
									onChange={(e) => setText(e.target.value)}
									ref={textInput}
									autoComplete="off"
								/>
							</Form.Group>

							<Form.Group controlId="amount" className="col-md-6">
								<Form.Label>
									Amount (negative - expense, positive - income)
								</Form.Label>
								<div className="number-input">
									<Button
										type="button"
										className="minus"
										title="minus"
										aria-label="minus"
										onClick={(e) => handleStepDown(e)}
									/>
									<Form.Control
										id="amount"
										name="amount"
										type="number"
										placeholder="Enter amount..."
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										ref={numberInput}
									/>
									<Button
										type="button"
										className="plus"
										title="plus"
										aria-label="plus"
										onClick={(e) => handleStepUp(e)}
									/>
								</div>
							</Form.Group>
						</div>
						<div className="form-group d-flex justify-content-center align-items-center flex-column">
							<Button
								type="submit"
								className="btn btn-primary"
								title="Add transaction"
								aria-label="Add transaction"
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
