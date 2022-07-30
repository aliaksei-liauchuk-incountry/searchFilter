import {LightningElement, track, wire} from 'lwc';
import searchContacts from '@salesforce/apex/ContactController.searchContacts';
const columns = [
    {label: 'First Name', fieldName: 'FirstName', type: 'text'}, 
    {label: 'Last Name', fieldName: 'LastName', type: 'text'}, 
    {label: 'Email', fieldName: 'Email', type: 'email'},  
    {label: 'Mobile Phone', fieldName: 'MobilePhone', type: 'phone'}, 
    {label: 'Account Name', fieldName: 'AccountName', type: 'text'}, 
    {label: 'CreatedDate', fieldName: 'CreatedDate', type: 'date',
        typeAttributes:{
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: "true"
        }
    }
];
export default class ContactList extends LightningElement {
    ampm = true;
    searchValue = '';
    searchKey = '';
    @track data = [];
    @track columns = columns;

    @wire(searchContacts, {searchKey: '$searchKey'})
    con({error, data}) {
        if(data) {
            let currentData = [];
            data.forEach((row) => {
                let rowData = {};
                rowData.FirstName = row.FirstName;
                rowData.LastName = row.LastName;
                rowData.Email = row.Email;
                rowData.MobilePhone = row.MobilePhone;
                rowData.CreatedDate = row.CreatedDate;

                if (row.Account) {
                    rowData.AccountName = row.Account.Name;
                }
                currentData.push(rowData);
            });
            this.data = currentData;
        }
        else if(error) {
            window.console.log(error);
        }
    }

    handleWordChange(event) {
		const searchValue = event.target.value;
			this.searchValue = searchValue;
	}

    handleSearchKeyword (event) {
            const searchKey = event.target.value;
			this.searchKey = searchKey
    }
}