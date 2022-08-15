import { LightningElement} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class NewContact extends LightningElement {
	closeModal=false;
	
	handleSuccess(event) {
		const toastEvent = new ShowToastEvent({
			title: "Contact created",
			message: "Record ID: " + event.detail.id,
			variant: "success"
		});
		this.dispatchEvent(toastEvent);
		this.dispatchEvent(new CustomEvent('refresh'));
		this.closeModal=event;   
	}

	handleChange(event) {
		console.log('You selected an account: ' + event.detail.value[0]);
	}

	handleCancel(event){
		this.closeModal=event;
		this.dispatchEvent(new CustomEvent('close'));
	}
}