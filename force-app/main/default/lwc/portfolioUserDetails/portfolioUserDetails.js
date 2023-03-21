import { LightningElement,api } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {
    @api objectApiName;
    @api recordId;

    

    downloadResume(){
        console.log('objectApiName',this.objectApiName);
        console.log('recordId',this.recordId);

        console.log("inside download resume handler@")
        window.open("https://raw.githubusercontent.com/vishwaswritecode/vishwas-resume/main/vishwas%2Bresume.pdf","_blank");
    }
}