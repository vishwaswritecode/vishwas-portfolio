import { LightningElement,wire,api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'

export default class PortfolioWorkExperience extends LightningElement {

    @api recordId = 'a045g00000D4axfAAB'
    workExperienceLst = [];
    sandpLogo =  `${PortfolioAssets}/PortfolioAssets/s&plogo.png`;
    accentureLogo =  `${PortfolioAssets}/PortfolioAssets/accenturelogo.png`;

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'WorkExperience__r',
        fields: ['WorkExperience__c.Description__c',
                'WorkExperience__c.CompanyName__c',
                'WorkExperience__c.EndDate__c',
                'WorkExperience__c.IsCurrent__c',
                'WorkExperience__c.Portfolio__c',
                'WorkExperience__c.Role__c',
                'WorkExperience__c.StartDate__c',
                'WorkExperience__c.Name',
                'WorkExperience__c.WorkLocation__c']
    })workExperienceRecords({data,error}){
        if(data){
            console.log('data',data);
            this.formatWorkExperience(data)

        }
        if(error){
            console.error('error',error);
        }
    }

    formatWorkExperience(data){
        
        this.workExperienceLst = [...data.records].reverse().map((item) => {
            let id = item.id;
            const {CompanyName__c,StartDate__c,EndDate__c,WorkLocation__c,Description__c,IsCurrent__c,Portfolio__c,Role__c} =  item.fields;
            let companyName = this.getFieldValue(CompanyName__c);
            let startDate = this.getFieldValue(StartDate__c);
            let endDate = this.getFieldValue(EndDate__c);
            let workLocation = this.getFieldValue(WorkLocation__c);
            let description = this.getFieldValue(Description__c);
            let isCurrent = this.getFieldValue(IsCurrent__c);
            let portFolio = this.getFieldValue(Portfolio__c);
            let role = this.getFieldValue(Role__c);
            let companyLogo;
            if(companyName!=null){
                companyLogo = companyName.includes('Accenture') ? this.accentureLogo : this.sandpLogo;
            }
            // let sandpLogo = companyName.contains('S&P') ? this.sandpLogo : null;

            return {id,companyName,startDate,endDate,companyLogo,workLocation,description,isCurrent,portFolio,role};

        })

        console.log('workExpLst',this.workExperienceLst);

    }

    getFieldValue(data){
        return data.displayValue || data.value
    }


}