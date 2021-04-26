import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Loading from '../Layout/Loading';
import P from '../Layout/P';
import H4 from '../Layout/H4';

export const IncomeExpenses = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { transactions } = ExpenceStore;

		const amounts = transactions.map((transaction) => transaction.amount);

		const income = amounts
			.filter((item) => item > 0)
			.reduce((accu, item) => accu + item, 0)
			.toFixed(2);

		const expense = (
			amounts.filter((item) => item < 0).reduce((accu, item) => accu + item, 0) * -1
		).toFixed(2);

		return (
			<div className="row mx-0 p-2 w-100 transaction-bilance">
				<div className="col-12 col-md-6 transaction-bilance_item">
					<H4 className="text-center transaction-desc">Income</H4>
					<P className="text-center">{transactions.length > 0 ? income : <Loading />}</P>
				</div>
				<div className="col-12 col-md-6 transaction-bilance_item">
					<H4 className="text-center transaction-desc">Expense</H4>
					<P className="text-center">{transactions.length > 0 ? expense : <Loading />}</P>
				</div>
			</div>
		);
	})
);

IncomeExpenses.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default IncomeExpenses;
