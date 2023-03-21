import { LightningElement,api } from 'lwc';

export default class Notification extends LightningElement {
    showToast = false;
    toastVariant;
    message;

    @api showToastMsg(message,variant){
        this.showToast = true;
        this.toastVariant = variant || 'success'
        this.message = message || 'Please send Message!';
        
        setTimeout(() => {
            this.showToast = false;
        }, 2000);
    }
    get notifyClasses(){
        let variantClass = this.toastVariant === 'success' ? 'slds-theme_success' : 
        this.toastVariant = 'error' ? 'slds-theme_error' : 'slds-theme_info'
        return `slds-notify slds-notify_toast slds-theme_success {variantClass}`
    }
}