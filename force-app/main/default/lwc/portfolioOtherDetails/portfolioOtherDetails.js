import { LightningElement,api,wire } from 'lwc';
import AWARDS from '@salesforce/schema/Portfolio__c.Awards__c';
import SUPERBADGES from '@salesforce/schema/Portfolio__c.Super_Badges__c';
import LANGUAGES from '@salesforce/schema/Portfolio__c.Languages__c';
import { getRecord } from 'lightning/uiRecordApi';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'

export default class PortfolioOtherDetails extends LightningElement {
    @api recordId = 'a045g00000D4axfAAB';
    superBadgesList = [];
    languages = [];
    awardsList = [];

    trophy = `${PortfolioAssets}/PortfolioAssets/trophy.png`
    language = `${PortfolioAssets}/PortfolioAssets/language.png`
    superBadgesLogo = `${PortfolioAssets}/PortfolioAssets/superbadges.jpeg`


    @wire(getRecord,{recordId:'$recordId',fields:[AWARDS,SUPERBADGES,LANGUAGES]})
    otherDetailsHandler({data,error}){
    if(data){
        console.log('otherDetailsHandler data',data);
        this.getSuperBadges(data);
        this.getAwards(data);
        this.getLanguages(data);

    }
    if(error){
        console.error('otherDetailsHandler error',error);
    }
 
    }

    getSuperBadges(data){
        const {Super_Badges__c} =  data.fields;
        this.superBadgesList = Super_Badges__c.value? Super_Badges__c.value.split(';') :[];
      }
    getAwards(data){
        const {Awards__c} =  data.fields;
        this.awardsList = Awards__c.value? Awards__c.value.split(',') :[];
        console.log('awardsLst',this.awardsList);

    }  
    getLanguages(data){
        const {Languages__c} =  data.fields;
        this.languages = Languages__c.value? Languages__c.value.split(',') :[];
        console.log('languages',this.languages);

      }
}