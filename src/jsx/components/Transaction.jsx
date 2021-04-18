import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

export const Transaction = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore, transaction, index } = props;
		const {
			deleteTransaction,
			editTransaction,
			doneEditTransaction,
			cancelEditTransaction
		} = ExpenceStore;

		const sign = transaction.amount < 0 ? '-' : '+';

		const liClass = transaction.amount < 0 ? 'minus' : 'plus';

		return (
			<li className={`col item ${liClass}`}>
				<div className="col-1 px-1 index">
					<span>{`${index}.`}</span>
				</div>
				<div className="col-10 px-1 content">
					{!transaction.editing ? (
						<p
							onDoubleClick={(e) =>
								editTransaction(transaction, 'text', transaction._id, e)
							}
						>
							{transaction.text}
						</p>
					) : (
						<div className="form-group" role="presentation">
							<input
								id={`InputText${transaction._id}`}
								className="form-control"
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
						</div>
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
						<div className="form-group" role="presentation">
							<input
								id={`InputAmount${transaction.id}`}
								className="form-control"
								type="number"
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
						</div>
					)}
				</div>
				<div className="col-1 px-1 action">
					<button
						type="button"
						variant="primary"
						className="btn btn-primary btn-remove"
						onClick={(e) => deleteTransaction(transaction._id, e)}
					>
						<i className="fas fa-trash-alt" title="Remove" />
					</button>
				</div>
			</li>
		);
	})
);

Transaction.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Transaction;
