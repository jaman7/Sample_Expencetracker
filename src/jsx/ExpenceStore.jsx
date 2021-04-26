import React from 'react';
import { runInAction, makeObservable, configure, observable, action, computed } from 'mobx';

import restdbInstance from './resetdbAPI';
import { BASE_URL } from './const/Constants';

configure({
	enforceActions: 'observed'
});

class ExpenceStore {
	baseURL = BASE_URL;

	userId = JSON.parse(localStorage.getItem('id'));

	isLoading = false;

	isPending = false;

	currentTransaction = null;

	addCurrTransaction = false;

	transactions = [];

	todoInputNameTransaction = React.createRef();

	todoInputValueTransaction = React.createRef();

	beforeEditCache = '';

	get transactionsCount() {
		return this.transactions.length;
	}

	constructor() {
		makeObservable(this, {
			baseURL: observable,
			userId: observable,
			isLoading: observable,
			isPending: observable,
			transactions: observable,
			currentTransaction: observable,
			addCurrTransaction: observable,
			todoInputNameTransaction: observable,
			todoInputValueTransaction: observable,
			beforeEditCache: observable,
			transactionsCount: computed
		});
	}

	// find index return
	@action findIndexTransaction = (currentid) =>
		this.transactions.findIndex((item) => item._id === currentid);

	@action async Retrieve(id) {
		try {
			this.isLoading = true;
			const responce = await restdbInstance.get(`usersdb/${id}/expencetable`);
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
	@action addTransaction = async (transaction, id) => {
		try {
			// e.preventDefault();
			this.addCurrTransaction = true;

			const response = await restdbInstance.post(`usersdb/${id}/expencetable`, transaction);

			if (response.status === 201) {
				runInAction(() => {
					this.transactions.push({
						editing: false,
						editing2: false,
						_id: response.data._id,
						text: response.data.text,
						amount: response.data.amount
					});
					this.addCurrTransaction = false;
				});
			}
		} catch (error) {
			runInAction(() => {
				console.log(error);
			});
		}
	};

	// deleteTransaction
	@action deleteTransaction = async (id, e) => {
		try {
			e.preventDefault();
			this.isPending = true;
			this.currentTransaction = id;
			const response = await restdbInstance.delete(`expencetables/${id}`);
			if (response.status === 200) {
				runInAction(() => {
					const index = this.findIndexTransaction(id);
					this.transactions.splice(index, 1);

					this.currentTransaction = null;
					this.isPending = false;
				});
			}
		} catch (error) {
			runInAction(() => {
				console.log(error);
			});
		}
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

		this.transactions.splice(indexTransaction, 1, transaction);
		e.preventDefault();
	};

	// doneEditTransaction
	@action doneEditTransaction = async (transaction, data, id, e) => {
		try {
			this.isPending = true;
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

			const response = await restdbInstance.put(`expencetables/${id}`, profile);
			if (response.status === 200) {
				runInAction(() => {
					const indexTransaction = this.findIndexTransaction(id);
					this.transactions.splice(indexTransaction, 1, transaction);
					this.beforeEditCache = '';
					this.isPending = false;
				});
			}
			e.preventDefault();
		} catch (error) {
			runInAction(() => {
				console.log(error);
			});
		}
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
