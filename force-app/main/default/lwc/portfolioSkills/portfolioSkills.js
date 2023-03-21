import { LightningElement,api,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import TECH_SKILLS from '@salesforce/schema/Portfolio__c.Soft_Skills__c'
import SOFT_SKILLS from '@salesforce/schema/Portfolio__c.Technical_Skills__c'
import SOFTWARE_METH_SKILLS from '@salesforce/schema/Portfolio__c.Software_Methodologies__c'
import SOFTWARE_TOOLS from '@salesforce/schema/Portfolio__c.Software_Tools__c'

export default class PortfolioSkills extends LightningElement {
    @api recordId = 'a045g00000D4axfAAB';
    techSkills = [];
    softSkills = [];
    softwareTools = [];
    softwareMethodologies = [];

    @wire(getRecord,{recordId:'$recordId',
        fields:[TECH_SKILLS,SOFT_SKILLS,SOFTWARE_METH_SKILLS,SOFTWARE_TOOLS]})
    skillsHandler({data,error}){
        if(data){
            console.log('data',data);
            this.formatSkills(data);

        }
        if(error){
            console.error('error',error);
        }
    }

    formatSkills(data){
        const {Soft_Skills__c,Technical_Skills__c,Software_Methodologies__c,Software_Tools__c} = data.fields;
        this.techSkills = Technical_Skills__c ? Technical_Skills__c.value.split(','):[];
        this.softSkills = Soft_Skills__c ? Soft_Skills__c.value.split(','):[];
        this.softwareTools = Software_Tools__c ? Software_Tools__c.value.split(','):[];
        this.softwareMethodologies = Software_Methodologies__c ? Software_Methodologies__c.value.split(','):[];

    }
}