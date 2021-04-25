import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Menu from './components/Menu';
import { Header } from './components/header';
import { Balance } from './components/balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

const Dashboard = inject('ExpenceStore')(
	observer((props) => (
		<>
			<Menu history={props.history} />

			<div className="container">
				<div className="row">
					<Header />
					<Balance />
					<IncomeExpenses />
					<TransactionList />
					<AddTransaction />
				</div>
			</div>
		</>
	))
);

Dashboard.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Dashboard;
