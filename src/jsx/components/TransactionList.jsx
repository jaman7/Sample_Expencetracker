import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Transaction } from './Transaction';

export const TransactionList = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { transactions, isLoading, transactionsCount } = ExpenceStore;

		return (
			<>
				<div className="col-12 pt-3">
					<h3 className="transaction-desc">Count: {transactionsCount} </h3>
				</div>

				{isLoading ? (
					<div className="col-12 container-react-logo" role="presentation">
						<span className="react-logo" role="presentation">
							<span className="nucleo" role="presentation" />
						</span>
					</div>
				) : (
					<div className="col-12 py-3 px-0">
						<ul className="transaction-lists">
							<TransitionGroup component={null}>
								{transactions &&
									transactions.map((transaction, i) => (
										<CSSTransition
											in
											appear
											unmountOnExit
											timeout={500}
											classNames="fade"
											key={`fade-${transaction._id}`}
										>
											<Transaction
												key={transaction._id}
												transaction={transaction}
												index={i + 1}
											/>
										</CSSTransition>
									))}
							</TransitionGroup>
						</ul>
					</div>
				)}
			</>
		);
	})
);

TransactionList.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default TransactionList;
