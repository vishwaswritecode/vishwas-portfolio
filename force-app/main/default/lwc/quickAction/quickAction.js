import { LightningElement,api } from 'lwc';

export default class QuickAction extends LightningElement {
    @api recordId;
    quickActionHandler(){
        console.log("inside handler")
        console.log('recordid',this.recordId);

    }
}