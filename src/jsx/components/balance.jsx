import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Loading from '../Layout/Loading';
import H3 from '../Layout/H3';

export const Balance = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { transactions } = ExpenceStore;

		const total = transactions.reduce((accu, item) => accu + item.amount, 0).toFixed(2);

		return (
			<div className="col-12 py-3 transaction-balance">
				<H3 className="transaction-desc">
					Your Balance: <span>${transactions.length > 0 ? total : <Loading />}</span>
				</H3>
			</div>
		);
	})
);

Balance.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Balance;
