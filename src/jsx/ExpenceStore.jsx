import React from 'react';
import { toJS, runInAction, makeObservable, configure, observable, action, computed } from 'mobx';

import restdbInstance from './resetdbAPI';

configure({
	enforceActions: 'observed'
});

class ExpenceStore {
	isLoading = true;

	transactions = [];

	todoInputNameTransaction = React.createRef();

	todoInputValueTransaction = React.createRef();

	beforeEditCache = '';

	get transactionsCount() {
		return this.transactions.length;
	}

	constructor() {
		makeObservable(this, {
			isLoading: observable,
			transactions: observable,
			todoInputNameTransaction: observable,
			todoInputValueTransaction: observable,
			beforeEditCache: observable,
			transactionsCount: computed
		});
	}

	// find index return
	@action findIndexTransaction = (currentid) => {
		this.transactions.findIndex((item) => item._id === currentid);
	};

	@action async Retrieve() {
		try {
			const responce = await restdbInstance.get('expencetable');
			const responceData = responce.data;

			responceData.forEach((res) => {
				res.editing = false;
				res.editing2 = false;
			});

			runInAction(() => {
				this.transactions = responceData;
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
		}
	}

	// addTransaction
	@action addTransaction = (transaction, e) => {
		e.preventDefault();
		restdbInstance
			.post('expencetable', transaction)
			.then((res) => {
				if (res.statusText === 'Created') {
					runInAction(() => {
						this.transactions.push({
							editing: false,
							editing2: false,
							_id: res.data._id,
							text: res.data.text,
							amount: res.data.amount
						});
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// deleteTransaction
	@action deleteTransaction = (id, e) => {
		e.preventDefault();
		restdbInstance
			.delete(`expencetable/${id}`)
			.then(() => {
				runInAction(() => {
					const index = this.findIndexTransaction(id);
					this.transactions.splice(index, 1);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// editTransaction
	@action editTransaction = (transaction, data, id, e) => {
		if (data === 'text') {
			transaction.editing = true;
			this.beforeEditCache = transaction.text;
		} else {
			transaction.editing2 = true;
			this.beforeEditCache = parseFloat(transaction.amount);
		}

		const indexTransaction = this.findIndexTransaction(id);
		console.log(toJS(indexTransaction));
		this.transactions.splice(indexTransaction, 1, transaction);
		e.preventDefault();
	};

	// doneEditTransaction
	@action doneEditTransaction = (transaction, data, id, e) => {
		let datavalue = '';
		if (data === 'text') {
			transaction.editing = false;
			if (e.target.value.trim().length === 0) {
				transaction.text = this.beforeEditCache;
			} else {
				transaction.text = e.target.value;
			}

			datavalue = transaction.text;
		} else {
			transaction.editing2 = false;
			if (e.target.value.trim().length === 0) {
				transaction.amount = parseFloat(this.beforeEditCache);
			} else {
				transaction.amount = parseFloat(e.target.value);
			}

			datavalue = transaction.amount;
		}

		const profile = {};
		profile[data] = datavalue;

		restdbInstance
			.put(`expencetable/${id}`, profile)
			.then(() => {
				runInAction(() => {
					const indexTransaction = this.findIndexTransaction(id);
					this.transactions.splice(indexTransaction, 1, transaction);
					this.beforeEditCache = '';
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// cancelEditTransaction
	@action cancelEditTransaction = (transaction, data, id, e) => {
		if (data === 'text') {
			transaction.text = this.beforeEditCache;
			transaction.editing = false;
		} else {
			transaction.amount = this.beforeEditCache;
			transaction.editing2 = false;
		}

		const indexList = this.findIndexTransaction(id);
		this.transactions.splice(indexList, 1, transaction);
		this.beforeEditCache = '';
		e.preventDefault();
	};
}

const store = new ExpenceStore();

export default store;
