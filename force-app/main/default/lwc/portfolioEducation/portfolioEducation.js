import { LightningElement,api,wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
const COLUMNS = [
    { label: 'Institution', fieldName: 'institution' },
    { label: 'Title', fieldName: 'title'},
    { label: 'Passing Year', fieldName: 'passingYear'},
    { label: 'Grade', fieldName: 'grade'},
];

export default class PortfolioEducation extends LightningElement {
    @api recordId = 'a045g00000D4axfAAB';
    educationDetailsLst = [];
    columns = COLUMNS;

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Education__r',
        fields: ['Education__c.Institution__c',
                'Education__c.Passing_Year__c',
                'Education__c.Title__c',
                'Education__c.Grade__c']
    })educationRecords({data,error}){
        if(data){
            console.log('data',data);
            // this.educationDetails = data.records;
            this.formatEducationDetails(data);

        }
        if(error){
            console.error('error',error);
        }
    }

    formatEducationDetails(data){
        console.log('inside formatEducationDetails');
        console.log('data',data);
        this.educationDetailsLst = data.records.map((item) => {
            let id = item.id;
            const {Institution__c,Passing_Year__c,Title__c,Grade__c} = item.fields;
            console.log('item.fields',item.fields);
            let institution = Institution__c.value;
            let passingYear = Passing_Year__c.value;
            let title = Title__c.value;
            let grade = Grade__c.value;
            return {id,institution,passingYear,title,grade};
        });
        console.log('educationDetailsLst',JSON.stringify(this.educationDetailsLst));
    }

    

}