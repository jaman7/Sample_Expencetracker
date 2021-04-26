/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Menu from '../components/Menu';
import { Header } from '../components/header';
import { Balance } from '../components/balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionList } from '../components/TransactionList';
import { AddTransaction } from '../components/AddTransaction';

const Dashboard = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { baseURL, userId } = ExpenceStore;

		const tempToken = JSON.parse(localStorage.getItem('id'))
			? JSON.parse(localStorage.getItem('id'))
			: null;

		const [token, setToken] = useState(null);

		useEffect(async () => {
			if (userId) {
				await ExpenceStore.Retrieve(userId);
			}
			if (tempToken && token === null) {
				setToken(tempToken);
			}
		}, [userId]);

		return (
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
		);
	})
);

Dashboard.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Dashboard;
