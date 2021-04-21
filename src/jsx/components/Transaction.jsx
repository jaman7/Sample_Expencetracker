import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { toJS } from 'mobx';

import Button from '../Layout/Button';
import Trashicon from '../Layout/Trashicon';
import PendingIcon from '../Layout/pendingicon';

export const Transaction = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore, transaction, index } = props;
		const {
			deleteTransaction,
			editTransaction,
			doneEditTransaction,
			cancelEditTransaction,
			isPending,
			currentTransaction
		} = ExpenceStore;

		const sign = transaction.amount < 0 ? '-' : '+';

		const liClass = transaction.amount < 0 ? 'minus' : 'plus';

		console.log(toJS(isPending));

		return (
			<li className={`col item ${liClass}`}>
				<div className="col-1 px-1 index">
					<span>{`${index}.`}</span>
				</div>
				<div className="col px-1 content">
					{!transaction.editing ? (
						<p
							onDoubleClick={(e) =>
								editTransaction(transaction, 'text', transaction._id, e)
							}
						>
							{transaction.text}
						</p>
					) : (
						<Form.Group controlId={`InputText${transaction._id}`}>
							<Form.Control
								type="text"
								autoComplete="off"
								maxLength={100}
								defaultValue={transaction.text}
								onBlur={(e) =>
									doneEditTransaction(transaction, 'text', transaction._id, e)
								}
								onKeyUp={(e) => {
									if (e.key === 'Enter') {
										doneEditTransaction(
											transaction,
											'text',
											transaction._id,
											e
										);
									} else if (e.key === 'Escape') {
										cancelEditTransaction(
											transaction,
											'text',
											transaction._id,
											e
										);
									}
								}}
							/>
						</Form.Group>
					)}

					{!transaction.editing2 ? (
						<span
							onDoubleClick={(e) =>
								editTransaction(transaction, 'amount', transaction._id, e)
							}
						>
							{sign}${Math.abs(transaction.amount)}
						</span>
					) : (
						<Form.Group controlId={`InputAmount${transaction.id}`}>
							<Form.Control
								type="number"
								autoComplete="off"
								defaultValue={transaction.amount}
								onBlur={(e) =>
									doneEditTransaction(transaction, 'amount', transaction._id, e)
								}
								onKeyUp={(e) => {
									if (e.key === 'Enter') {
										doneEditTransaction(
											transaction,
											'amount',
											transaction._id,
											e
										);
									} else if (e.key === 'Escape') {
										cancelEditTransaction(
											transaction,
											'amount',
											transaction._id,
											e
										);
									}
								}}
							/>
						</Form.Group>
					)}
				</div>

				<div className="col-1 px-1 action">
					{isPending && currentTransaction === transaction._id ? <PendingIcon /> : <></>}
					<Button
						type="button"
						className="btn btn-primary btn-remove"
						title={`Remove transaction ${transaction._id}`}
						aria-label={`Remove transaction ${transaction._id}`}
						onClick={(e) => deleteTransaction(transaction._id, e)}
					>
						<Trashicon />
					</Button>
				</div>
			</li>
		);
	})
);

Transaction.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Transaction;
