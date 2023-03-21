import { LightningElement,api } from 'lwc';

export default class PortfolioUserDetailsAndStatusWrapper extends LightningElement {
    @api objectApiName 
    //= 'Portfolio__c';
    @api recordId 
    //= 'a045g00000D4axfAAB';
    @api badges 
    //= '120+';
    @api points 
    //= '97K+';
    @api trails 
    //= '10+';
    @api rank 
    //= 'Ranger';
    @api resumeURL 

    @api certifications;
    @api copadoCertifications;
    @api vlocityCertifications;
    //= 'https://raw.githubusercontent.com/vishwaswritecode/vishwas-resume/main/vishwas%2Bresume.pdf';
}