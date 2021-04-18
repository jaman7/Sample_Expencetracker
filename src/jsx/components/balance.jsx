import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

export const Balance = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { transactions } = ExpenceStore;

		const total = transactions.reduce((accu, item) => accu + item.amount, 0).toFixed(2);

		return (
			<div className="col-12 py-3 transaction-balance">
				<h3 className="transaction-desc">
					Your Balance: <span>${total}</span>
				</h3>
			</div>
		);
	})
);

Balance.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Balance;
