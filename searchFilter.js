import { LightningElement, wire } from 'lwc';
import searchContacts from '@salesforce/apex/ContactController.searchContacts';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.MobilePhone';
import DATE_FIELD from '@salesforce/schema/Contact.CreatedDate';
import ACCOUNTNAME_FIELD from '@salesforce/schema/Account.Name';
const COLUMNS = [
    { label: 'First Name', fieldName: FIRSTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'email' },
    { label: 'Account Name', fieldName: ACCOUNTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Mobile Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'phone' },
    { label: 'Created Date', fieldName: DATE_FIELD.fieldApiName, type: 'date', typeAttributes:{
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
    columns = COLUMNS;
    searchValue = '';
    searchKey = '';
   
    @wire(searchContacts, {searchKey: '$searchKey'})
	contacts;
	
	handleWordChange(event) {
		const searchValue = event.target.value;
			this.searchValue = searchValue;
	}
    handleSearchKeyword (event) {
            const searchKey = event.target.value;
			this.searchKey = searchKey
    }
}