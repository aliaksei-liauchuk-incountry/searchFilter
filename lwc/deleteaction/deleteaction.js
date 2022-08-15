import { LightningElement, api} from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class DeleteAction extends LightningElement {
	closeModal=false;
	@api recordid;
	@api firstname;
	@api lastname;
	progressValue
	
	handleDelete(event) {
		deleteRecord(this.recordid)
		.then(() => {
			this.dispatchEvent(
				new ShowToastEvent({
					title: 'Success',
					message: 'Contact deleted',
					variant: 'success'
				})
			); 
			this.dispatchEvent(new CustomEvent('refresh'));
			this.getcondelete = event;
		})
		.catch(error => {
			this.dispatchEvent(
				new ShowToastEvent({
					title: 'Error deleting record',
					message: error.body.message,
					variant: 'error'
				})
			);
		});
	}

	handleCancel(event) {
		this.closeModal = event;
		this.dispatchEvent(new CustomEvent('close'));
	}
}