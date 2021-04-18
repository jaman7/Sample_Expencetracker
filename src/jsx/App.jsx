/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { Header } from './components/header';
import { Balance } from './components/balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

@inject('ExpenceStore')
@observer
class App extends Component {
	async componentDidMount() {
		const { ExpenceStore } = this.props;
		await ExpenceStore.Retrieve();
	}

	render() {
		const { ExpenceStore } = this.props;
		const { transactions } = ExpenceStore;

		return (
			<div className="container">
				<div className="row">
					<Header />
					<Balance />
					<IncomeExpenses />
					<TransactionList />
					<AddTransaction />
				</div>
			</div>
		);
	}
}

App.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default App;
