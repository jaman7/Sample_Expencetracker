import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

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
					<h4 className="text-center transaction-desc">Income</h4>
					<p className="text-center">{income}</p>
				</div>
				<div className="col-12 col-md-6 transaction-bilance_item">
					<h4 className="text-center transaction-desc">Expense</h4>
					<p className="text-center">{expense}</p>
				</div>
			</div>
		);
	})
);

IncomeExpenses.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default IncomeExpenses;
