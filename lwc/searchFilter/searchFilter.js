import {LightningElement, api, wire} from 'lwc';
import searchContacts from '@salesforce/apex/SearchContactController.searchContacts';
import { NavigationMixin } from 'lightning/navigation'
import { refreshApex } from '@salesforce/apex';

const columns = [
	{label: 'First Name', fieldName: 'FirstName', type: 'text'}, 
	{label: 'Last Name', fieldName: 'LastName', type: 'text'}, 
	{label: 'Email', fieldName: 'Email', type: 'email'},  
	{label: 'Mobile Phone', fieldName: 'MobilePhone', type: 'phone'}, 
	{label: 'Account Name', fieldName: 'AccountLink', type: 'url', typeAttributes: { label: { fieldName: 'AccountName' }, target: '__blank'}}, 
	{label: 'CreatedDate', fieldName: 'CreatedDate', type: 'date', typeAttributes:{year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: 'true'}},
	{label: 'Action', fieldName: 'delete', type: 'button', typeAttributes: {label: 'Delete', name: 'delete', variant: 'destructive-text'}, cellAttributes: { alignment: 'right' }},
	
];
export default class ContactList extends NavigationMixin (LightningElement) {
	searchValue = '';
	searchKey = '';
	data;
	error;
	columns = columns;
	newContactModal = false;
	delContactModal = false;
	recordId;
	firstName;
	lastName;
	refreshTable;
	
	@wire(searchContacts, {searchKey: '$searchKey'}) wired(result) {
		this.refreshTable = result;
		if(result.data) {
			let currentData = [];
			result.data.forEach((row) => {
				let rowData = {};
				rowData.Id = row.Id
				rowData.FirstName = row.FirstName;
				rowData.LastName = row.LastName;
				rowData.Email = row.Email;
				rowData.MobilePhone = row.MobilePhone;
				rowData.CreatedDate = row.CreatedDate;

				if (row.Account) {
					rowData.AccountName = row.Account.Name;
					rowData.AccountLink = '/' + row.Account.Id;
				}
				currentData.push(rowData);
			});
			this.data = currentData;
		}
	}

	handleWordChange(event) {
		const searchValue = event.target.value;
		this.searchValue = searchValue;
	}

	handleSearchKeyword (event) {
		const searchKey = event.target.value;
		this.searchKey = searchKey;
	}

	newContact() {
		this.newContactModal = true;
	}

	delContact(event) {
		this.recordId = event.detail.row.Id;
		this.firstName = event.detail.row.FirstName;
		this.lastName = event.detail.row.LastName;
		this.delContactModal = true;
	}
	
	haldleRefresh() {
		this.newContactModal = false;
		this.delContactModal = false;
		return refreshApex(this.refreshTable);
	}

	haldleClose() {
		this.newContactModal = false;
		this.delContactModal = false;
	}
}
